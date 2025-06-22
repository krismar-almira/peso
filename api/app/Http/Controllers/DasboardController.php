<?php

namespace App\Http\Controllers;

use App\Models\Applicant;
use App\Models\Employee;
use App\Models\Employeer;
use Illuminate\Http\Request;

class DasboardController extends Controller
{
    function dashboard () {
        $total_nsrps1 = Employeer::count();
        $total_nsrps1_con = Employeer::where('confirmed', true)->count();
        $total_nsrps2 = Employee::count();
        $total_nsrps2_con = Employee::where('confirmed', true)->count();

        return response()->json([
            'success' => true,
            'data' => [
                'total_employers' => $total_nsrps1,
                'confirmed_employers' => $total_nsrps1_con,
                'total_employees' => $total_nsrps2,
                'confirmed_employees' => $total_nsrps2_con,
            ],
        ], 200);
    }
}
