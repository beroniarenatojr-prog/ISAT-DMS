<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'current_position_id',
        'division',
        'teacher_type',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'date_hired' => 'date',
            'is_active' => 'boolean',
        ];
    }

    public function isTeacher(): bool
    {
        return $this->hasRole('teacher');
    }

    public function isAdmin(): bool
    {
        return $this->hasRole('admin');
    }

    public function isSuperAdmin(): bool
    {
        return $this->hasRole('super-admin');
    }

    public function isAnyAdmin(): bool
    {
        return $this->hasAnyRole(['admin', 'super-admin']);
    }

    public function teacherSubmissions()
    {
        return $this->hasMany(TeacherSubmission::class, 'teacher_id');
    }

    /**
     * Get IPCRF ratings for this teacher
     */
    public function ipcrfRatings()
    {
        return $this->hasMany(IpcrfRating::class, 'teacher_id');
    }

    /**
     * Get the current position of the teacher
     */
    public function currentPosition()
    {
        return $this->belongsTo(Position::class, 'current_position_id');
    }

    /**
     * Get all promotions for this user
     */
    public function promotions()
    {
        return $this->hasMany(Promotion::class, 'user_id');
    }

    /**
     * Get promotions this user has approved
     */
    public function approvedPromotions()
    {
        return $this->hasMany(Promotion::class, 'promoted_by');
    }
}
