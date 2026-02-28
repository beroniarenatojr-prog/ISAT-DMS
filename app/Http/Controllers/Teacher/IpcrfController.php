<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Kra;
use App\Models\TeacherSubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class IpcrfController extends Controller
{
    public function index()
    {
        $kras = Kra::with(['objectives.competencies'])
            ->where('is_active', true)
            ->orderBy('order')
            ->get();

        $currentYear = '2024-2025';
        
        // Get teacher's submissions - grouped by objective
        $submissions = TeacherSubmission::where('teacher_id', auth()->id())
            ->where('school_year', $currentYear)
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy(function ($item) {
                if ($item->competency_id === null) {
                    return $item->objective_id . '_obj';
                }
                return $item->objective_id . '_' . $item->competency_id;
            });

        return Inertia::render('Teacher/Ipcrf', [
            'kras' => $kras,
            'submissions' => $submissions,
            'schoolYear' => $currentYear,
            'user' => auth()->user(),
        ]);
    }

    public function upload(Request $request)
    {
        $request->validate([
            'objective_id' => 'required|exists:objectives,id',
            'competency_id' => 'nullable|exists:competencies,id',
            'file' => 'required|file|mimes:pdf|max:10240', // 10MB max
            'notes' => 'nullable|string|max:1000',
            'school_year' => 'required|string',
        ]);

        $file = $request->file('file');
        $path = $file->store('ipcrf-submissions/' . auth()->id(), 'public');

        // Create new submission (allow multiple per objective)
        $submission = TeacherSubmission::create([
            'teacher_id' => auth()->id(),
            'objective_id' => $request->objective_id,
            'competency_id' => $request->competency_id,
            'school_year' => $request->school_year,
            'file_path' => $path,
            'notes' => $request->notes,
            'status' => 'submitted',
        ]);

        return back()->with('success', 'File uploaded successfully!');
    }

    public function deleteFile(TeacherSubmission $submission)
    {
        if ($submission->teacher_id !== auth()->id()) {
            abort(403);
        }

        if ($submission->file_path) {
            Storage::disk('public')->delete($submission->file_path);
        }

        $submission->delete();

        return back()->with('success', 'File deleted successfully!');
    }
}
