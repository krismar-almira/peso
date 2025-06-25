<?php

namespace App\Http\Controllers;

use App\Models\EducationalAtainment;
use App\Models\Employee;
use App\Models\Employeer;
use App\Models\JobFairSchedule;
use App\Models\Position;
use App\Models\Skill;
use Illuminate\Http\Request;

class nsrpcontroller extends Controller
{
    function nsrp2(){
        $skills = Skill::all();
        $education = EducationalAtainment::all();
        $position = Position::all();
        return view('NSRP2', ['skills' => $skills,'educations'=>$education, 'positions'=>$position]);
    }
    // function nsrp22(){
    //     $skills = Skill::all();
    //     $education = EducationalAtainment::all();
    //     $position = Position::all();
    //     return view('NSRP22', ['skills' => $skills,'educations'=>$education, 'positions'=>$position]);
    // }
    function nsrp1(){
        $skills = Skill::all();
        $education = EducationalAtainment::all();
        $position = Position::all();
        return view('NSRP1', ['skills' => $skills,'educations'=>$education, 'positions'=>$position]);
    }
    function nsrp1successSaved(){
        return view('NSRP1success');
    }
    function nsrp2successSaved(){
        return view('NSRP2success');
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
    public function nsrp2Save(Request $request){
        $data = $request->all();
        $jobfairschedule = JobFairSchedule::where('random', $data['access_code'])->first();
        $applicant = Employee::create([
            'job_fair_schedule_id'=>$jobfairschedule->id,
            'full_name' => $data['full_name'],
            'sex' => $data['sex'],
            'birth_day' => $data['birthday'], // mapping 'birthday' to 'birth_day'
            'marital_status' => $data['marital_status'],
            'disability' => $data['disability'],
            'mobile_number' => $data['mobile_number'],
            'email' => $data['email'],
            'present_address' => $data['present_address'],
            'permanent_address' => $data['permanent_address'],
            'employment_status' => $data['employment_status']['employment_status'],
            'willing_to_work' => $data['employment_status']['willing_to_work'],
            'education' => $data['education'],
            'school_graduated' => $data['school_graduated'],
            'year_graduated' => $data['year_graduated'],
            'work_experience' => json_encode($data['work_experience']),
            'core_skills' => json_encode($data['core_skills']),
            'preferred_occupation' => $data['preferred_occupation'],
            'preferred_work_location' => $data['preferred_work_location'],
            'willing_to_work_abroad' => $data['willing_to_work_abroad'] === 'Yes',
            'government_id' => $data['government_id'],
            'language_spoken' => json_encode($data['language_spoken']),
            'internet_access' => $data['internet_access'] === 'Yes',
        ]);

        return response()->json([
            'message' => 'Applicant saved successfully.',
            'data' => $applicant
        ], 201);
    }
}
