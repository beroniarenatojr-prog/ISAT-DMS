<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IpcrfConfiguration extends Model
{
    protected $fillable = [
        'school_year',
        'kra_count',
        'objectives_per_kra',
        'submission_start_date',
        'submission_end_date',
        'is_active',
        'is_locked',
        'notes',
    ];

    protected $casts = [
        'objectives_per_kra' => 'array',
        'submission_start_date' => 'date',
        'submission_end_date' => 'date',
        'is_active' => 'boolean',
        'is_locked' => 'boolean',
    ];

    /**
     * Get the active configuration for a school year
     */
    public static function getActiveConfig($schoolYear = null)
    {
        if ($schoolYear) {
            return self::where('school_year', $schoolYear)->first();
        }
        
        return self::where('is_active', true)->first();
    }

    /**
     * Check if configuration can be modified
     */
    public function canModify(): bool
    {
        return !$this->is_locked;
    }

    /**
     * Lock configuration to prevent changes
     */
    public function lock(): void
    {
        $this->update(['is_locked' => true]);
    }

    /**
     * Unlock configuration
     */
    public function unlock(): void
    {
        $this->update(['is_locked' => false]);
    }
}
