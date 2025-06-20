<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Employee extends Model
{
    protected $fillable = [
        'full_name',
        'sex',
        'birth_day',
        'marital_status',
        'disability',
        'mobile_number',
        'email',
        'present_address',
        'permanent_address',
        'employment_status',
        'willing_to_work',
        'education',
        'school_graduated',
        'year_graduated',
        'work_experience',
        'core_skills',
        'preferred_occupation',
        'preferred_work_location',
        'willing_to_work_abroad',
        'government_id',
        'language_spoken',
        'internet_access',
        'job_fair_schedule_id'
    ];

   
    public function JS(): HasOne
    {
        return $this->hasOne(JobFairSchedule::class, 'id', 'job_fair_schedule_id');
    }
}
