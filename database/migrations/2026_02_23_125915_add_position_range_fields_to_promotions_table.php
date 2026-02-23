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
        Schema::table('promotions', function (Blueprint $table) {
            $table->string('from_position_range')->nullable()->after('from_position_id');
            $table->string('to_position_range')->nullable()->after('to_position_id');
            $table->string('from_career_stage')->nullable()->after('to_position_range');
            $table->string('to_career_stage')->nullable()->after('from_career_stage');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('promotions', function (Blueprint $table) {
            $table->dropColumn(['from_position_range', 'to_position_range', 'from_career_stage', 'to_career_stage']);
        });
    }
};
