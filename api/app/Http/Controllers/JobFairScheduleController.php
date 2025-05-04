<?php

namespace App\Http\Controllers;

use App\Models\JobFairSchedule;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class JobFairScheduleController extends Controller
{
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
        foreach ($jobfairs as &$jobfair) {
            if($jobfair->imagelocation){
                $jobfair->imagelocation = Storage::temporaryUrl(
                    $jobfair->imagelocation, now()->addDay(1)
            );
            }
            
        }
        return response()->json($jobfairs, 200);
    }
}
