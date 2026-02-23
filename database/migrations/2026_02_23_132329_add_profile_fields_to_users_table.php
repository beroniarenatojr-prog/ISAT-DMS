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
        Schema::table('users', function (Blueprint $table) {
            $table->string('profile_picture')->nullable()->after('email');
            $table->string('contact_number')->nullable()->after('profile_picture');
            $table->text('address')->nullable()->after('contact_number');
            $table->date('date_hired')->nullable()->after('address');
            $table->text('bio')->nullable()->after('date_hired');
            $table->boolean('is_active')->default(true)->after('bio');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'profile_picture',
                'contact_number',
                'address',
                'date_hired',
                'bio',
                'is_active'
            ]);
        });
    }
};
