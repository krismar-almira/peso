<?php

namespace App\Http\Controllers;

use App\Models\EducationalAtainment;
use App\Models\EducationLevel;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    function level(){
        $educationLevels = EducationLevel::all();
        return response()->json($educationLevels, 200);
    }
    function addAttainement(Request $request){
        //EducationalAtainment(a)
        $saved = EducationalAtainment::create([
            'name'=>$request->input('name'),
            'education_level_id'=>$request->input('education_level_id'),
        ]);
        return response()->json($saved, 200);
        // $educationLevels = EducationLevel::all();
        // return response()->json($educationLevels, 200);
    }
    function getAllAttainment(){
        $data = EducationalAtainment::with(['eduLevel'])->get();
        return response()->json($data, 200);
    }
}
