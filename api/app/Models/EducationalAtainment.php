<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class EducationalAtainment extends Model
{
    protected $fillable = ['name', 'education_level_id'];
    protected $table = 'educational_attainments';
    public function eduLevel(): HasOne {
        return $this->hasOne(EducationLevel::class, 'id','education_level_id');
    }
}
