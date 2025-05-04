<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    function Save(Request $request){
        $skill = Skill::create([
            'name'=>$request->input('name')
        ]);
        return response()->json($skill, 200);
    }
    function GetAll(){
        $skills = Skill::all();
        return response()->json($skills, 200);
    }
}
