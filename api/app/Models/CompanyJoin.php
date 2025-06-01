<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyJoin extends Model
{
    protected $fillable = ['company_id','job_fair_schedule_id','accept'];
}
