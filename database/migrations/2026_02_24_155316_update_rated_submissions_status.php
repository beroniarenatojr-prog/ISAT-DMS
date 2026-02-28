<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update all submissions that have a rating to 'reviewed' status
        DB::table('teacher_submissions')
            ->whereNotNull('rating')
            ->where('status', '!=', 'reviewed')
            ->update([
                'status' => 'reviewed',
                'reviewed_at' => now(),
            ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Optionally revert back to 'submitted' status
        DB::table('teacher_submissions')
            ->whereNotNull('rating')
            ->where('status', 'reviewed')
            ->update([
                'status' => 'submitted',
            ]);
    }
};
