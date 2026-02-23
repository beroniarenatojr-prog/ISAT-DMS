<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('ipcrf_configurations', function (Blueprint $table) {
            $table->date('submission_start_date')->nullable()->after('objectives_per_kra');
            $table->date('submission_end_date')->nullable()->after('submission_start_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ipcrf_configurations', function (Blueprint $table) {
            $table->dropColumn(['submission_start_date', 'submission_end_date']);
        });
    }
};
