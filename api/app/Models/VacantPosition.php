<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class VacantPosition extends Model
{
    protected $fillable = ['company_id','position_level', 'position_id','qty', 'active','year_experience', 'job_fair_schedule_id'];
    
    function position():HasOne{
        return $this->hasOne(Position::class, 'id', 'position_id');
    }
}
