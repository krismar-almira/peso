<?php

namespace App\Http\Controllers;

use App\Models\EducationalAtainment;
use App\Models\Employeer;
use App\Models\Position;
use App\Models\Skill;
use Illuminate\Http\Request;

class nsrpcontroller extends Controller
{
    function nsrp2(){
        return view('NSRP2');
    }
        
    function nsrp1(){
        $skills = Skill::all();
        $education = EducationalAtainment::all();
        $position = Position::all();
        return view('NSRP1', ['skills' => $skills,'educations'=>$education, 'positions'=>$position]);
    }
    function nsrp1successSaved(){
        return view('NSRP1success');
    }
    public function nsrp1Save(Request $request)
    {
        $data = $request->all();
        // Save employer
        $employer = Employeer::create([
            'establishment' => $data['establishment'],
            'business_address' => $data['business_address'],
            'industry_classification' => $data['industry_classification'],
            'business_type' => $data['business_type'],
            'contact_person' => $data['contact_person'],
            'designation' => $data['designation'],
            'contact_number' => $data['contact_number'],
            'email_address' => $data['email_address'],
            'vacant_positions' => json_encode($data['vacant_positions']), // save entire array as JSON
        ]);

        return response()->json(['message' => 'Saved successfully'], 200);
    }
}
