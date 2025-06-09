<?php

namespace App\Models;

use App\Models\VacantPositionSkill;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class VacantPosition extends Model
{
    use SoftDeletes;
    protected $fillable = ['company_id','position_level', 'position_id','qty', 'active','year_experience', 'job_fair_schedule_id'];
    
    function position():HasOne{
        return $this->hasOne(Position::class, 'id', 'position_id');
    }
    public function skills(): HasMany
    {
        return $this->hasMany(VacantPositionSkill::class, 'vacant_position_id', 'id');
    }
}
