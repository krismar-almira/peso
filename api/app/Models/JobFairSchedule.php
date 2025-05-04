<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobFairSchedule extends Model
{
    protected $fillable = ['theme', 'venue', 'event_date', 'end_event_date', 'imagelocation'];
}
