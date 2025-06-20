<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Employee;
use App\Models\Employeer;
use App\Models\EmployeerJoinJobFairSchedule;
use Illuminate\Database\Events\TransactionBeginning;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{
    function Save(Request $request){
        //image saving
        
        $imageData = $request->input('image');
        if (preg_match('/^data:image\/(\w+);base64,/', $imageData, $type)) {
            $imageData = substr($imageData, strpos($imageData, ',') + 1);
            $extension = strtolower($type[1]);
            if (!in_array($extension, ['jpg', 'jpeg', 'png', 'gif'])) {
                return response()->json(['error' => 'Invalid image type.'], 400);
            }
        } else {
            return response()->json(['error' => 'Invalid image data.'], 400);
        }

        $imageData = base64_decode($imageData);

        if ($imageData === false) {
            return response()->json(['error' => 'Base64 decode failed.'], 400);
        }
        $fileName = Str::random(30) . '.' . $extension;
        Storage::disk('local')->put($fileName, $imageData);
        
        $comp = Company::create([
            'name'=>$request->input('name'),
            'description'=>$request->input('description'),
            'address'=>$request->input('address'),
            'imagelocation'=>$fileName

        ]);
        return $comp;
        // $url = Storage::temporaryUrl(
        //     $fileName, now()->addMinutes(5)
        // );
        // return $url;
    }
    function All(){
        $comps = Company::select('id','name', 'description', 'imagelocation','address')->get();
        foreach ($comps as &$comp) {
            $comp->key = $comp->id; 
            $comp->label = $comp->name; 

            $comp->imagelocation = Storage::temporaryUrl(
                                            $comp->imagelocation, now()->addDay(1)
                                    );
        }
        return response()->json($comps, 200);
    }
    function GetCompanyById(Request $request){
        $comp = Company::select('id','name', 'description', 'imagelocation','address')
                ->where('id', $request->input('id'))
                ->first();
        $comp->imagelocation = Storage::temporaryUrl(
                    $comp->imagelocation, now()->addDay(1)
        );
        return response()->json($comp, 200);
    }
    function GetAllEmployeersRequest(){
        $employers = Employeer::orderBy('id', 'desc')->get()->map(function ($employer) {
            $decoded = $employer->vacant_positions;

            // Check if it's still a string
            if (is_string($decoded)) {
                $decoded = json_decode($decoded, true);
            }

            $employer->vacant_positions = $decoded;
            return $employer;
        });
        return response()->json($employers, 200);

    }
    function ApproveEmployeerRequest(Request $request){
        $employer = Employeer::find($request->input('id'));
        $employer->confirmed = true;
        $employer->save();
        return response()->json('success', 200);
    }
    function DeleteEmployeerRequest(Request $request){
        $employer = Employeer::find($request->input('id'));
        $employer->delete();
        return response()->json('success', 200);
    }
    function AddCompanyToJobFairSchedule(Request $request){

        $companies = $request->input('comapany_id');
        $schedule_id = $request->input('schedule_id');

        foreach ($companies as $company_id) {
            $employejoin = EmployeerJoinJobFairSchedule::updateOrCreate(
                ['job_fair_schedule_id'=>$schedule_id,'employeer_id'=>$company_id],
                ['job_fair_schedule_id'=>$schedule_id,'employeer_id'=>$company_id]
            );
        }
        return response()->json('success', 200);
        // $employer = Employeer::find($request->input('id'));
        // $employer->delete();
        // return response()->json('success', 200);
    }
    function GetEmployJoinJobFairSchedule(Request $request){
        $employers = EmployeerJoinJobFairSchedule::with(['employeer'])
            ->where('job_fair_schedule_id', $request->input('job_fair_schedule_id'))
            ->get()
            ->map(function ($employer) {
                $decoded = $employer->employeer->vacant_positions;

                if (is_string($decoded)) {
                    $decoded = json_decode($decoded, true);
                }

                $employer->employeer->vacant_positions = $decoded;
                return $employer;
        });

        return response()->json($employers, 200);
    }
    function DeleteEmployJoinJobFairSchedule(Request $request){
        $join = EmployeerJoinJobFairSchedule::find($request->input('id'));
        $join->delete();
        return response()->json($request, 200);
    }
    function GetAllNsrp2Request(Request $request){
        $nsrp2 = Employee::with(['JS'])->get();
        return response()->json($nsrp2, 200);
    }
    
    function NSRP2ReqApprove(Request $request){
        $employer = Employee::find($request->input('id'));
        $employer->confirmed = true;
        $employer->save();
        return response()->json('success', 200);
    }
    function NSRP2ReqDelete(Request $request){
        $employer = Employee::find($request->input('id'));
        $employer->delete();
        return response()->json('success', 200);
    }

}
