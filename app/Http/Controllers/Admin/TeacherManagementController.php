<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Position;
use App\Models\Promotion;
use App\Services\AuditLogService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeacherManagementController extends Controller
{
    /**
     * Display all teachers
     */
    public function index(Request $request): Response
    {
        $query = User::role('teacher')
            ->with('currentPosition')
            ->orderBy('name');

        // Search by name
        if ($request->has('search') && $request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Filter by position
        if ($request->has('position') && $request->position) {
            $query->where('current_position_id', $request->position);
        }

        $teachers = $query->paginate(10)->through(function ($teacher) {
            // Decode division JSON to get position_range, career_stage, and department
            $divisionData = json_decode($teacher->division, true);
            if (is_array($divisionData)) {
                $teacher->position_range = $divisionData['position_range'] ?? null;
                $teacher->career_stage = $divisionData['career_stage'] ?? null;
                $teacher->department = $divisionData['department'] ?? null;
            } else {
                // Fallback for old data
                $teacher->position_range = null;
                $teacher->career_stage = null;
                $teacher->department = $teacher->division;
            }
            return $teacher;
        });
        
        $positions = Position::orderBy('order')->get();

        return Inertia::render('Admin/TeacherManagement', [
            'teachers' => $teachers,
            'positions' => $positions,
            'filters' => $request->only(['search', 'position']),
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    /**
     * Store a new teacher
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'current_position_id' => 'required|string|in:T1 - T3,T4 - T7,MT1 - MT2,MT3 - MT5',
            'department' => 'nullable|string|max:255',
            'teacher_status' => 'nullable|string|max:255',
            'career_stage' => 'nullable|string|max:255',
        ], [
            'name.required' => 'Teacher name is required.',
            'name.max' => 'Teacher name cannot exceed 255 characters.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'email.unique' => 'This email address is already registered in the system.',
            'password.required' => 'Password is required.',
            'password.min' => 'Password must be at least 8 characters long.',
            'current_position_id.required' => 'Please select a position for the teacher.',
            'current_position_id.in' => 'The selected position is invalid.',
            'department.max' => 'Department name cannot exceed 255 characters.',
            'teacher_status.max' => 'Teacher status cannot exceed 255 characters.',
        ]);

        // Capitalize first letter of name
        $validated['name'] = ucwords(strtolower($validated['name']));

        // Store position range and career stage in JSON format in division field
        // and department in teacher_type field temporarily
        $teacherData = [
            'position_range' => $validated['current_position_id'],
            'career_stage' => $validated['career_stage'] ?? null,
            'department' => $validated['department'] ?? null,
        ];

        $teacher = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'current_position_id' => null,
            'division' => json_encode($teacherData), // Store as JSON
            'teacher_type' => $validated['teacher_status'] ?? null,
        ]);

        $teacher->assignRole('teacher');

        // Log the action
        AuditLogService::logTeacherCreated($teacher->id, $teacher->name);

        return redirect()->back()->with('success', 'Teacher created successfully!');
    }

    /**
     * Update teacher information
     */
    public function update(Request $request, User $teacher)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $teacher->id,
            'department' => 'nullable|string|max:255',
            'teacher_status' => 'nullable|string|max:255',
        ], [
            'name.required' => 'Teacher name is required.',
            'name.max' => 'Teacher name cannot exceed 255 characters.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'email.unique' => 'This email address is already registered to another user.',
            'department.max' => 'Department name cannot exceed 255 characters.',
            'teacher_status.max' => 'Teacher status cannot exceed 255 characters.',
        ]);

        // Capitalize first letter of name
        $validated['name'] = ucwords(strtolower($validated['name']));

        $oldValues = $teacher->only(['name', 'email', 'division', 'teacher_type']);
        
        // Get existing division data
        $divisionData = json_decode($teacher->division, true) ?? [];
        
        // Update only department, keep position_range and career_stage
        $divisionData['department'] = $validated['department'] ?? null;
        
        $teacher->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'division' => json_encode($divisionData),
            'teacher_type' => $validated['teacher_status'] ?? null,
        ]);

        // Log the action
        AuditLogService::logTeacherUpdated($teacher->id, $teacher->name, $oldValues, $validated);

        return redirect()->back()->with('success', 'Teacher updated successfully!');
    }

    /**
     * Delete a teacher
     */
    public function destroy(User $teacher)
    {
        if (!$teacher->hasRole('teacher')) {
            return redirect()->back()->with('error', 'User is not a teacher!');
        }

        $teacherName = $teacher->name;
        $teacher->delete();

        // Log the action
        AuditLogService::logTeacherDeleted($teacher->id, $teacherName);

        return redirect()->back()->with('success', 'Teacher deleted successfully!');
    }

    /**
     * Promote a teacher to a selected position
     */
    public function promote(Request $request, User $teacher)
    {
        $validated = $request->validate([
            'to_position_id' => 'required|string|in:T1 - T3,T4 - T7,MT1 - MT2,MT3 - MT5',
            'career_stage' => 'required|string',
            'notes' => 'nullable|string',
        ], [
            'to_position_id.required' => 'Please select a position to promote the teacher to.',
            'to_position_id.in' => 'The selected position is invalid.',
            'career_stage.required' => 'Career stage is required.',
        ]);

        // Get current division data
        $currentDivisionData = json_decode($teacher->division, true) ?? [];
        $currentPositionRange = $currentDivisionData['position_range'] ?? 'No Position';
        $currentCareerStage = $currentDivisionData['career_stage'] ?? 'Unknown';

        // Create promotion record with position ranges as strings
        Promotion::create([
            'user_id' => $teacher->id,
            'from_position_id' => null, // Not using position IDs anymore
            'to_position_id' => null, // Not using position IDs anymore
            'from_position_range' => $currentPositionRange,
            'to_position_range' => $validated['to_position_id'],
            'from_career_stage' => $currentCareerStage,
            'to_career_stage' => $validated['career_stage'],
            'promoted_by' => auth()->id(),
            'promoted_at' => now(),
            'notes' => $validated['notes'] ?? null,
        ]);

        // Update division data with new position and career stage
        $newDivisionData = [
            'position_range' => $validated['to_position_id'],
            'career_stage' => $validated['career_stage'],
            'department' => $currentDivisionData['department'] ?? null,
        ];

        // Update teacher's position
        $teacher->update([
            'division' => json_encode($newDivisionData),
        ]);

        // Log the action
        AuditLogService::logTeacherPromoted(
            $teacher->id,
            $teacher->name,
            $currentPositionRange,
            $validated['to_position_id']
        );

        return redirect()->back()->with('success', "Teacher promoted from {$currentPositionRange} to {$validated['to_position_id']}!");
    }

    /**
     * View promotion history for a teacher
     */
    public function promotionHistory(User $teacher): Response
    {
        $promotions = Promotion::where('user_id', $teacher->id)
            ->with(['fromPosition', 'toPosition', 'promotedBy'])
            ->orderBy('promoted_at', 'desc')
            ->get();

        return Inertia::render('Admin/PromotionHistory', [
            'teacher' => $teacher->load('currentPosition'),
            'promotions' => $promotions,
        ]);
    }

    /**
     * Get promotion history data as JSON
     */
    public function promotionHistoryData(User $teacher)
    {
        $promotions = Promotion::where('user_id', $teacher->id)
            ->with(['fromPosition', 'toPosition', 'promotedBy'])
            ->orderBy('promoted_at', 'desc')
            ->get();

        return response()->json($promotions);
    }
}
