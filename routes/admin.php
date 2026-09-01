<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PendingActionController;
use App\Http\Controllers\Admin\TeacherManagementController;
use App\Http\Controllers\Admin\AuditLogController;
use App\Http\Controllers\Admin\IpcrfConfigurationController;
use App\Http\Controllers\Admin\UserManagementController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // IPCRF Configuration
    Route::get('/ipcrf/configuration', [IpcrfConfigurationController::class, 'index'])->name('ipcrf.configuration');
    Route::post('/ipcrf/configuration', [IpcrfConfigurationController::class, 'store'])->name('ipcrf.configuration.store');
    Route::put('/ipcrf/configuration/{configuration}', [IpcrfConfigurationController::class, 'update'])->name('ipcrf.configuration.update');
    Route::delete('/ipcrf/configuration/{configuration}', [IpcrfConfigurationController::class, 'destroy'])->name('ipcrf.configuration.destroy');
    Route::post('/ipcrf/configuration/{configuration}/toggle-active', [IpcrfConfigurationController::class, 'toggleActive'])->name('ipcrf.configuration.toggle-active');
    Route::post('/ipcrf/configuration/{configuration}/toggle-lock', [IpcrfConfigurationController::class, 'toggleLock'])->name('ipcrf.configuration.toggle-lock');
    
    // IPCRF Management
    Route::get('/ipcrf', [\App\Http\Controllers\Admin\IpcrfManagementController::class, 'index'])->name('ipcrf');
    Route::get('/ipcrf/submissions', [\App\Http\Controllers\Admin\IpcrfManagementController::class, 'submissions'])->name('ipcrf.submissions');
    Route::get('/ipcrf/rate/{teacher}', [\App\Http\Controllers\Admin\IpcrfManagementController::class, 'rateTeacher'])->name('ipcrf.rate');
    // Stream a teacher's MOV evidence PDF for the Document Preview / MOV links.
    Route::get('/ipcrf/submissions/{submission}/document', [\App\Http\Controllers\DocumentController::class, 'submission'])->name('ipcrf.submissions.document');
    Route::post('/ipcrf/submissions/rate', [\App\Http\Controllers\Admin\IpcrfManagementController::class, 'storeSubmissionRatings'])->name('ipcrf.submissions.rate');
    Route::post('/ipcrf/review/{submission}', [\App\Http\Controllers\Admin\IpcrfManagementController::class, 'review'])->name('ipcrf.review');
    Route::post('/ipcrf/rating', [\App\Http\Controllers\Admin\IpcrfManagementController::class, 'storeRating'])->name('ipcrf.rating.store');
    Route::put('/ipcrf/rating/{rating}', [\App\Http\Controllers\Admin\IpcrfManagementController::class, 'updateRating'])->name('ipcrf.rating.update');
    Route::post('/ipcrf/kra', [\App\Http\Controllers\Admin\IpcrfManagementController::class, 'storeKra'])->name('ipcrf.kra.store');
    Route::put('/ipcrf/kra/{kra}', [\App\Http\Controllers\Admin\IpcrfManagementController::class, 'updateKra'])->name('ipcrf.kra.update');
    Route::delete('/ipcrf/kra/{kra}', [\App\Http\Controllers\Admin\IpcrfManagementController::class, 'deleteKra'])->name('ipcrf.kra.delete');
    // Legacy single-objective endpoints (kept for backward compat).
    // Names are suffixed with ".legacy" so they no longer clash with the
    // management endpoints below.
    Route::post('/ipcrf/objective', [\App\Http\Controllers\Admin\IpcrfManagementController::class, 'storeObjective'])->name('ipcrf.objective.store.legacy');
    Route::put('/ipcrf/objective/{objective}', [\App\Http\Controllers\Admin\IpcrfManagementController::class, 'updateObjective'])->name('ipcrf.objective.update.legacy');
    Route::delete('/ipcrf/objective/{objective}', [\App\Http\Controllers\Admin\IpcrfManagementController::class, 'deleteObjective'])->name('ipcrf.objective.delete.legacy');
    Route::post('/ipcrf/objectives/add-all', [\App\Http\Controllers\Admin\IpcrfManagementController::class, 'addAllObjectives'])->name('ipcrf.objectives.add-all');
    
    // Objectives Management (canonical endpoints used by the UI)
    Route::get('/ipcrf/objectives', [\App\Http\Controllers\Admin\IpcrfManagementController::class, 'objectivesIndex'])->name('ipcrf.objective.index');
    Route::post('/ipcrf/objectives', [\App\Http\Controllers\Admin\IpcrfManagementController::class, 'storeObjectiveManagement'])->name('ipcrf.objective.store');
    Route::put('/ipcrf/objectives/{objective}', [\App\Http\Controllers\Admin\IpcrfManagementController::class, 'updateObjectiveManagement'])->name('ipcrf.objective.update');
    Route::delete('/ipcrf/objectives/{objective}', [\App\Http\Controllers\Admin\IpcrfManagementController::class, 'deleteObjectiveManagement'])->name('ipcrf.objective.delete');
    
    // Signed IPCRF Management
    Route::get('/signed-ipcrf', [\App\Http\Controllers\Admin\SignedIpcrfController::class, 'index'])->name('signed-ipcrf');
    Route::post('/signed-ipcrf/{signedIpcrf}/review', [\App\Http\Controllers\Admin\SignedIpcrfController::class, 'review'])->name('signed-ipcrf.review');
    Route::get('/signed-ipcrf/{signedIpcrf}/download', [\App\Http\Controllers\Admin\SignedIpcrfController::class, 'download'])->name('signed-ipcrf.download');
    
    // IPCRF History
    Route::get('/ipcrf-history', [\App\Http\Controllers\Admin\IpcrfHistoryController::class, 'index'])->name('ipcrf-history');
    
    // Survey Results
    Route::get('/survey-results', [\App\Http\Controllers\Admin\SurveyController::class, 'index'])->name('survey-results');
    
    // Questionnaire Results (rolled up per teacher + school year)
    Route::get('/questionnaire-results', [\App\Http\Controllers\Admin\QuestionnaireController::class, 'index'])->name('questionnaire-results');
    Route::get('/questionnaire/self-rating/{selfRating}/document', [\App\Http\Controllers\DocumentController::class, 'selfRating'])->name('questionnaire.self-rating.document');
    Route::get('/questionnaire/{teacher}/{year?}', [\App\Http\Controllers\Admin\QuestionnaireController::class, 'show'])->name('questionnaire.show');
    Route::post('/questionnaire/status/{questionnaire}', [\App\Http\Controllers\Admin\QuestionnaireController::class, 'updateStatus'])->name('questionnaire.update-status');
    
    // Teacher Management
    Route::get('/teachers', [TeacherManagementController::class, 'index'])->name('teachers.index');
    Route::get('/teachers/export', [TeacherManagementController::class, 'export'])->name('teachers.export');
    Route::post('/teachers', [TeacherManagementController::class, 'store'])->name('teachers.store');
    Route::put('/teachers/{teacher}', [TeacherManagementController::class, 'update'])->name('teachers.update');
    Route::delete('/teachers/{teacher}', [TeacherManagementController::class, 'destroy'])->name('teachers.destroy');
    Route::post('/teachers/{teacher}/promote', [TeacherManagementController::class, 'promote'])->name('teachers.promote');
    Route::get('/teachers/{teacher}/promotions', [TeacherManagementController::class, 'promotionHistory'])->name('teachers.promotions');
    Route::get('/teachers/{teacher}/promotions/data', [TeacherManagementController::class, 'promotionHistoryData'])->name('teachers.promotions.data');
    Route::get('/teachers/{teacher}/profile', [TeacherManagementController::class, 'profile'])->name('teachers.profile');
    Route::post('/teachers/{teacher}/upload-photo', [TeacherManagementController::class, 'uploadPhoto'])->name('teachers.upload-photo');
    
    // Audit Logs
    Route::get('/audit-logs', [AuditLogController::class, 'index'])->name('audit-logs.index');
    Route::get('/audit-logs/export', [AuditLogController::class, 'export'])->name('audit-logs.export');
    
    // My pending actions (for regular admins)
    Route::get('/my-actions', [PendingActionController::class, 'myActions'])->name('my-actions');
    
    // Administrator only - assessment tools CRUD (questionnaires, self-assessment,
    // self-rating settings).
    Route::middleware('administrator')->group(function () {
        Route::get('/assessment-tools', [\App\Http\Controllers\Admin\AssessmentToolController::class, 'index'])->name('assessment-tools');
        Route::put('/assessment-tools/templates/{template}', [\App\Http\Controllers\Admin\AssessmentToolController::class, 'updateTemplate'])->name('assessment-tools.templates.update');
        Route::put('/assessment-tools/self-rating', [\App\Http\Controllers\Admin\AssessmentToolController::class, 'updateSelfRating'])->name('assessment-tools.self-rating.update');
    });

    // Super admin only routes
    Route::middleware('super-admin')->group(function () {
        Route::get('/pending-actions', [PendingActionController::class, 'index'])->name('pending-actions');
        Route::post('/pending-actions/{pendingAction}/approve', [PendingActionController::class, 'approve'])->name('pending-actions.approve');
        Route::post('/pending-actions/{pendingAction}/reject', [PendingActionController::class, 'reject'])->name('pending-actions.reject');

        // User Management - Principal / Master Teacher accounts
        Route::get('/users', [UserManagementController::class, 'index'])->name('users.index');
        Route::post('/users', [UserManagementController::class, 'store'])->name('users.store');
        Route::put('/users/{user}', [UserManagementController::class, 'update'])->name('users.update');
        Route::post('/users/{user}/reset-password', [UserManagementController::class, 'resetPassword'])->name('users.reset-password');
        Route::delete('/users/{user}', [UserManagementController::class, 'destroy'])->name('users.destroy');
    });
});
