<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\CompanyJoin;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\JobFairSchedule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Laravel\Pail\ValueObjects\Origin\Console;

class JobFairScheduleController extends Controller
{
    function getAllParticpants(Request $request){
        $companies = DB::table('company_joins')
                    ->select('company_joins.id as id','company_joins.accept as accept','companies.name as company', 'company_joins.approve', 'companies.imagelocation')
                    ->leftJoin('companies', 'companies.id','company_joins.company_id')
                    ->where('company_joins.job_fair_schedule_id', $request->id)
                    ->get();
        foreach ($companies as &$company) {
            if($company->imagelocation){
                $company->imagelocation = Storage::temporaryUrl(
                    $company->imagelocation, now()->addDay(1)
            );
            }
        }
        return response()->json($companies, 200);
    }
    function Save(Request $request){
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
        $jobFairSchedule = JobFairSchedule::create([
            'theme'=>$request->input('theme'),
            'venue'=>$request->input('venue'),
            'event_date'=>Carbon::parse($request->input('event_date')),
            'end_event_date'=>Carbon::parse($request->input('end_event_date')),
            'imagelocation'=>$fileName

        ]);
        return response()->json($jobFairSchedule, 200);
    }
    function GetAll(){
        $jobfairs = JobFairSchedule::all();
        $company_id = Auth::user()->company_id;
        foreach ($jobfairs as &$jobfair) {
            $jobfair->joined = CompanyJoin::where('company_id',$company_id)
                                            ->where('job_fair_schedule_id',$jobfair->id)
                                            ->exists();
            $jobfair->accept = CompanyJoin::where('company_id',$company_id)
                                            ->where('job_fair_schedule_id',$jobfair->id)
                                            ->where('accept',true)
                                            ->exists();
            if($jobfair->imagelocation){
                $jobfair->imagelocation = Storage::temporaryUrl(
                    $jobfair->imagelocation, now()->addDay(1)
            );
            }
        }
        return response()->json($jobfairs, 200);
    }
    function Join(Request $request){
        $company_id = Auth::user()->company_id;
        $job_fair_schedule_id = $request->input('job_fair_schedule_id');
        $existing = CompanyJoin::where('company_id',$company_id)
                    ->where('job_fair_schedule_id',$job_fair_schedule_id)
                    ->get();
        if($existing->isNotEmpty()){
            return response()->json('Already Joined', 403);
        }
        $newJoin = CompanyJoin::create([
            'job_fair_schedule_id'=>$job_fair_schedule_id,
            'company_id'=>$company_id
        ]);
        return $newJoin;
    }
    function Accept(Request $request){
        $id = $request->input('id');
        $cj = CompanyJoin::find($id);
        $cj->accept =  true;
        $cj->save();
        return $cj;
    }
}
