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
        $teachers = $this->filteredTeachersQuery($request)->paginate(10)->through(function ($teacher) {
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

        // Get unique career stages for filter options
        $careerStages = [
            'Beginning Towards Proficient',
            'Highly Proficient', 
            'Distinguished'
        ];

        return Inertia::render('Admin/TeacherManagement', [
            'teachers' => $teachers,
            'positions' => $positions,
            'careerStages' => $careerStages,
            'filters' => $request->only(['search', 'position']),
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    /**
     * Base teacher query with the index page's search / career stage filters applied.
     * Shared by the list view and the CSV export so both stay in sync.
     */
    private function filteredTeachersQuery(Request $request)
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
            $query->where('division', 'like', '%"career_stage":"' . $request->position . '"%');
        }

        return $query;
    }

    /**
     * Export the teacher list to CSV.
     * Exports every teacher matching the current filters, not just the visible page.
     */
    public function export(Request $request)
    {
        $teachers = $this->filteredTeachersQuery($request)->get();

        $filename = 'teachers_' . date('Y-m-d_His') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function () use ($teachers) {
            $file = fopen('php://output', 'w');

            // UTF-8 BOM so Excel renders accented characters correctly
            fwrite($file, chr(0xEF) . chr(0xBB) . chr(0xBF));

            fputcsv($file, [
                'Name',
                'Email',
                'Employee ID',
                'Position',
                'Career Stage',
                'Department',
                'Type',
                'School Campus',
                'Level',
                'Date Hired',
                'Years of Service',
                'Contact Number',
                'Status',
            ]);

            foreach ($teachers as $teacher) {
                $divisionData = json_decode($teacher->division, true);
                $divisionData = is_array($divisionData) ? $divisionData : [];

                fputcsv($file, [
                    $teacher->name,
                    $teacher->email,
                    $teacher->employee_id ?: 'N/A',
                    $divisionData['position_range'] ?? $teacher->currentPosition->name ?? 'No Position',
                    $divisionData['career_stage'] ?? $teacher->career_stage ?? 'N/A',
                    $divisionData['department'] ?? $teacher->department ?? 'N/A',
                    $teacher->teacher_status ?? $teacher->teacher_type ?? 'N/A',
                    $teacher->school_campus ?: 'N/A',
                    $divisionData['level'] ?? $teacher->level ?? 'N/A',
                    $teacher->date_hired ? $teacher->date_hired->format('Y-m-d') : 'N/A',
                    $teacher->years_of_service ?? 'N/A',
                    $teacher->contact_number ?: 'N/A',
                    $teacher->is_active ? 'Active' : 'Inactive',
                ]);
            }

            fclose($file);
        };

        // Log the action
        AuditLogService::log(
            'teachers_exported',
            'Exported ' . $teachers->count() . ' teacher record(s) to CSV',
            'User',
            null,
            null,
            $request->only(['search', 'position'])
        );

        return response()->stream($callback, 200, $headers);
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
            // Professional details - all optional, only persisted when sent
            'career_stage' => 'nullable|string|max:255',
            'school_campus' => 'nullable|string|max:255',
            'level' => 'nullable|in:JHS,SHS',
            'date_hired' => 'nullable|date',
            'years_of_service' => 'nullable|integer|min:0|max:80',
            'current_position_id' => 'nullable|integer|exists:positions,id',
        ], [
            'name.required' => 'Teacher name is required.',
            'name.max' => 'Teacher name cannot exceed 255 characters.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'email.unique' => 'This email address is already registered to another user.',
            'department.max' => 'Department name cannot exceed 255 characters.',
            'teacher_status.max' => 'Teacher status cannot exceed 255 characters.',
            'current_position_id.exists' => 'The selected position is invalid.',
        ]);

        // Capitalize first letter of name
        $validated['name'] = ucwords(strtolower($validated['name']));

        $oldValues = $teacher->only([
            'name', 'email', 'division', 'teacher_type', 'teacher_status',
            'department', 'career_stage', 'school_campus', 'level', 'date_hired',
            'years_of_service', 'current_position_id',
        ]);

        $divisionData = json_decode($teacher->division, true) ?: [];

        $updates = [
            'name' => $validated['name'],
            'email' => $validated['email'],
        ];

        // Each professional-detail field is written only when its key is present
        // in the request, so editing from one form never wipes another's fields.
        if ($request->has('teacher_status')) {
            $status = $validated['teacher_status'] ?: null;
            $updates['teacher_status'] = $status; // column the profile page reads
            $updates['teacher_type'] = $status;   // legacy column kept in sync
        }

        if ($request->has('department')) {
            $department = $validated['department'] ?: null;
            $updates['department'] = $department;
            $divisionData['department'] = $department;
        }

        if ($request->has('career_stage')) {
            $careerStage = $validated['career_stage'] ?: null;
            $updates['career_stage'] = $careerStage;
            $divisionData['career_stage'] = $careerStage;
        }

        if ($request->has('school_campus')) {
            $updates['school_campus'] = $validated['school_campus'] ?: null;
        }

        if ($request->has('level')) {
            $level = $validated['level'] ?: null;
            $updates['level'] = $level;
            $divisionData['level'] = $level;
        }

        if ($request->has('date_hired')) {
            $updates['date_hired'] = $validated['date_hired'] ?: null;
        }

        if ($request->has('years_of_service')) {
            $updates['years_of_service'] = $validated['years_of_service'] ?? null;
        }

        if ($request->has('current_position_id')) {
            $updates['current_position_id'] = $validated['current_position_id'] ?: null;
        }

        $updates['division'] = json_encode($divisionData);

        $teacher->update($updates);

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

    /**
     * Display teacher profile
     */
    public function profile(User $teacher): Response
    {
        if (!$teacher->hasRole('teacher')) {
            return redirect()->back()->with('error', 'User is not a teacher!');
        }

        // Load relationships
        $teacher->load('currentPosition', 'promotions.fromPosition', 'promotions.toPosition');

        // Get IPCRF stats
        $ipcrfRatings = $teacher->ipcrfRatings()
            ->orderBy('created_at', 'desc')
            ->get();

        $ipcrfStats = [
            'latest_rating' => $ipcrfRatings->first()?->final_rating ?? null,
            'latest_rating_date' => $ipcrfRatings->first()?->created_at?->format('M d, Y') ?? null,
            'average_rating' => $ipcrfRatings->avg('final_rating'),
            'total_submissions' => $ipcrfRatings->count(),
            'rating_history' => $ipcrfRatings->map(function ($rating) {
                return [
                    'final_rating' => $rating->final_rating,
                    'created_at' => $rating->created_at,
                    'school_year' => $rating->school_year ?? null,
                ];
            }),
        ];

        // Get questionnaires
        $questionnaires = \App\Models\TeacherQuestionnaire::where('teacher_id', $teacher->id)
            ->orderBy('created_at', 'desc')
            ->get();

        // Get signed IPCRFs
        $signedIpcrfs = \App\Models\SignedIpcrf::where('teacher_id', $teacher->id)
            ->orderBy('created_at', 'desc')
            ->get();

        // Get recent activity
        $recentActivity = \App\Models\AuditLog::where('user_id', $teacher->id)
            ->orWhere('description', 'like', '%' . $teacher->name . '%')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

        // Get objectives and KRAs for objectives management based on active configuration
        $activeConfig = \App\Models\IpcrfConfiguration::where('is_active', true)->first();
        
        if ($activeConfig) {
            // Get the first N KRAs based on the configuration's kra_count
            $kras = \App\Models\Kra::where('is_active', true)
                ->orderBy('order')
                ->limit($activeConfig->kra_count)
                ->get();

            // Get objectives that are selected in the active configuration
            $selectedObjectiveIds = $activeConfig->selected_objective_ids ?? [];
            $objectives = \App\Models\Objective::with('kra')
                ->whereIn('id', $selectedObjectiveIds)
                ->orWhere(function ($query) use ($activeConfig) {
                    $query->where('ipcrf_configuration_id', $activeConfig->id)
                          ->where('is_active', true);
                })
                ->orderBy('order')
                ->get();
        } else {
            // Fallback to all active KRAs and objectives if no active configuration
            $kras = \App\Models\Kra::where('is_active', true)
                ->orderBy('order')
                ->get();

            $objectives = \App\Models\Objective::with('kra')
                ->where('is_active', true)
                ->orderBy('order')
                ->get();
        }

        // Decode division data if exists
        $divisionData = json_decode($teacher->division, true);
        if (is_array($divisionData)) {
            $teacher->position_range = $divisionData['position_range'] ?? null;
            $teacher->career_stage = $divisionData['career_stage'] ?? $teacher->career_stage;
            $teacher->department = $divisionData['department'] ?? $teacher->department;
        }

        return Inertia::render('Admin/TeacherProfile', [
            'teacher' => $teacher,
            'ipcrfStats' => $ipcrfStats,
            'promotions' => $teacher->promotions,
            'questionnaires' => $questionnaires,
            'signedIpcrfs' => $signedIpcrfs,
            'recentActivity' => $recentActivity,
            'objectives' => $objectives,
            'kras' => $kras,
            'positions' => Position::orderBy('order')->get(['id', 'name']),
        ]);
    }

    /**
     * Upload teacher profile photo
     */
    public function uploadPhoto(Request $request, User $teacher)
    {
        if (!$teacher->hasRole('teacher')) {
            return redirect()->back()->with('error', 'User is not a teacher!');
        }

        $validated = $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg|max:2048', // Max 2MB
        ], [
            'photo.required' => 'Please select a photo to upload.',
            'photo.image' => 'The file must be an image.',
            'photo.mimes' => 'The photo must be a JPEG, PNG, or JPG file.',
            'photo.max' => 'The photo size must not exceed 2MB.',
        ]);

        // Delete old photo if exists
        if ($teacher->profile_picture && \Storage::disk('public')->exists($teacher->profile_picture)) {
            \Storage::disk('public')->delete($teacher->profile_picture);
        }

        // Store new photo
        $path = $request->file('photo')->store('profile_pictures', 'public');

        // Update teacher record
        $teacher->update([
            'profile_picture' => $path,
        ]);

        // Log the action
        AuditLogService::log(
            'teacher_photo_updated',
            "Updated profile photo for {$teacher->name}",
            'User',
            $teacher->id,
            null,
            ['photo_path' => $path]
        );

        return redirect()->back()->with('success', 'Profile photo updated successfully!');
    }
}
