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
            // Drop the foreign key constraint first
            $table->dropForeign(['to_position_id']);
            
            // Modify the column to be nullable
            $table->foreignId('to_position_id')->nullable()->change();
            
            // Re-add the foreign key constraint with nullable
            $table->foreign('to_position_id')
                  ->references('id')
                  ->on('positions')
                  ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('promotions', function (Blueprint $table) {
            // Drop the foreign key constraint
            $table->dropForeign(['to_position_id']);
            
            // Modify the column back to not nullable
            $table->foreignId('to_position_id')->nullable(false)->change();
            
            // Re-add the foreign key constraint
            $table->foreign('to_position_id')
                  ->references('id')
                  ->on('positions')
                  ->onDelete('cascade');
        });
    }
};
