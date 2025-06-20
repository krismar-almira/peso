<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class EmployeerJoinJobFairSchedule extends Model
{
    protected $fillable = ['job_fair_schedule_id','employeer_id'];

    public function employeer(): HasOne
    {
        return $this->hasOne(Employeer::class, 'id', 'employeer_id');
    }
}
