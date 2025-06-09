<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class VacantPositionSkill extends Model
{
    protected $fillable = ['vacant_position_id','skill_id'];

    public function skill(): HasOne
    {
        return $this->hasOne(Skill::class, 'id', 'skill_id');
    }
}
