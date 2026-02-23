<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'from_position_id',
        'to_position_id',
        'from_position_range',
        'to_position_range',
        'from_career_stage',
        'to_career_stage',
        'promoted_by',
        'promoted_at',
        'notes',
    ];

    protected $casts = [
        'promoted_at' => 'datetime',
    ];

    /**
     * Get the user (teacher) who was promoted
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the position promoted from
     */
    public function fromPosition()
    {
        return $this->belongsTo(Position::class, 'from_position_id');
    }

    /**
     * Get the position promoted to
     */
    public function toPosition()
    {
        return $this->belongsTo(Position::class, 'to_position_id');
    }

    /**
     * Get the admin who approved the promotion
     */
    public function promotedBy()
    {
        return $this->belongsTo(User::class, 'promoted_by');
    }
}
