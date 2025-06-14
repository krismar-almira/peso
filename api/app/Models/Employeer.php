<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employeer extends Model
{
    protected $fillable =['establishment',
                        'business_address',
                        'industry_classification',
                        'business_type',
                        'contact_person',
                        'designation',
                        'contact_number',
                        'email_address',
                        'vacant_positions'
                ];
    protected $casts = [
        'vacant_positions' => 'array',
    ];
}
