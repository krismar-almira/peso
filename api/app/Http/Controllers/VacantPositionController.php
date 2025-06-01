<?php

namespace App\Http\Controllers;

use App\Models\VacantPosition;
use App\Models\VacantPositionEducationalAttainment;
use App\Models\VacantPositionSkill;
use Illuminate\Http\Request;

class VacantPositionController extends Controller
{
    function save(Request $request){
        $req = $request->all();
        $vacanPosition = VacantPosition::create([
            'company_id'=>$req['company_id'], 
            'position_id'=>$req['position']['id'],
            'position_level'=>$req['position']['level'],
            'qty'=>$req['qty'], 
            'year_experience'=>$req['year_experience'], 
            'job_fair_schedule_id'=>$req['schedule_id'],
        ]);
        foreach ($req['attainment'] as $attainment) {
            VacantPositionEducationalAttainment::create([
                'educational_attainment_id'=>$attainment,
                'vacant_position_id'=>$vacanPosition->id
            ]);
        }
        foreach ($req['skills'] as $skill) {
            VacantPositionSkill::insert([
                'skill_id'=>$skill,
                'vacant_position_id'=>$vacanPosition->id
            ]);
        }
        return response()->json($vacanPosition, 200);
    }
    function getAll(Request $request){
        $vacants = VacantPosition::with(['position'])
                                    ->where('company_id',$request->input('company_id'))
                                    ->where('job_fair_schedule_id',$request->input('schedule_id'))
                                    ->get();
        return response()->json($vacants, 200);
    }
}
