<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Applicant;
use App\Models\Employeer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\EmployeerJoinJobFairSchedule;
use PhpParser\Node\Stmt\TryCatch;

class MatchingController extends Controller
{
    // public function match(Request $request){
    //     $event_id = $request->input('event_id');
    //     $employeers = EmployeerJoinJobFairSchedule::with(['employeer'])
    //                 ->where('job_fair_schedule_id', $event_id)
    //                 ->get();
    //     $employeers = $employeers->map(function($da){
    //         $da->employeer->vacant_positions = json_decode($da->employeer->vacant_positions );
    //         return $da->employeer;
    //     });
    //     $applicants = Employee::where('job_fair_schedule_id',$event_id)->get();
    //     $applicants = $applicants->map(function($da){
    //         $da->work_experience = json_decode($da->work_experience);
    //         $da->language_spoken = json_decode($da->language_spoken);
    //         $da->core_skills = $da->core_skills;
    //         return $da;
    //     });
        
    //     return ['applicants'=>$applicants, 'employeers'=>$employeers];
    // }
    public function match(Request $request)
    {
        // Validate the event_id
         // Validate the event_id
        $request->validate([
            'event_id' => 'required|integer|exists:job_fair_schedules,id',
        ]);

        $eventId = $request->input('event_id');

        // Fetch employers and their vacant positions
        $employeers = EmployeerJoinJobFairSchedule::with(['employeer'])
            ->where('job_fair_schedule_id', $eventId)
            ->get()
            ->map(function ($data) {
                $data->employeer->vacant_positions = json_decode($data->employeer->vacant_positions, true);
                return $data->employeer;
            });

        // Fetch applicants and prepare top 10 matches per applicant
        $applicants = Employee::where('job_fair_schedule_id', $eventId)
            ->where('confirmed', true)
            ->get()
            ->map(function ($data) use ($employeers) {
                // Parse JSON fields
                $data->work_experience = json_decode($data->work_experience, true);
                $data->language_spoken = json_decode($data->language_spoken, true);
                $data->core_skills = json_decode($data->core_skills, true); // Parse JSON string

                // Calculate top 10 position matches for this applicant
                $matches = [];

                foreach ($employeers as $employer) {
                    foreach ($employer->vacant_positions as $position) {
                        // Course Score (30%): 100% if education matches
                        $courseScore = in_array($data->education, $position['education']) ? 100 : 0;

                        // Work Experience Score (50%): Based on matching job titles and duration
                        $totalDuration = 0;
                        // $targetJobTitle = strtolower($position['positionTitle']);
                        
                        // foreach ($data->work_experience as $exp) {
                        //     // Assume match for "programmer" and placeholder title for demonstration
                        //     if (strtolower($exp['job_title']) === 'programmer' && strpos($targetJobTitle, 'voluptatibus') !== false) {
                        //         $totalDuration += (int) $exp['duration'];
                        //     }
                        // }
                        $work_experiences = $position['work_experience'];
                        $targetJobTitles =$position['work_experience'];
                        foreach ($data->work_experience as $exp) {
                            foreach ($targetJobTitles as $targetJobTitle) {
                                if(strtolower($exp['job_title'])===strtolower($targetJobTitle)){
                                    $totalDuration += (int) $exp['duration'];
                                }
                            }
                        }
                        $maxDuration = $position['work_experience_duration']; // 10 years
                        $workExperienceScore = min(($totalDuration / $maxDuration) * 100, 100);
                        try {
                            $workExperienceScore = min(($totalDuration / $maxDuration) * 100, 100);

                        } catch (\Throwable $th) {
                            $workExperienceScore = 'error output';

                        }
                        // Skills Score (20%): Percentage of required skills matched
                        $applicantSkills = is_array($data->core_skills) ? $data->core_skills : [];
                        $matchedSkills = array_intersect($applicantSkills, $position['skills_required']);
                        $skillsScore = count($position['skills_required']) > 0
                            ? (count($matchedSkills) / count($position['skills_required'])) * 100
                            : 0;

                        // Overall Score: Weighted sum
                        $overallScore = (0.3 * $courseScore) + (0.5 * $workExperienceScore) + (0.2 * $skillsScore);

                        $matches[] = [
                            'employer_name' => $employer->establishment,
                            'employer_id' => $employer->id,
                            'position_title' => $position['positionTitle'],
                            'course_score' => number_format($courseScore, 2),
                            'work_experience_score' => number_format($workExperienceScore, 2),
                            'skills_score' => number_format($skillsScore, 2),
                            'overall_score' => number_format($overallScore, 2),
                        ];
                    }
                }

                // Sort matches by overall score (descending) and take top 10
                usort($matches, function ($a, $b) {
                    return $b['overall_score'] <=> $a['overall_score'];
                });
                $data->top_matches = array_slice($matches, 0, 10);

                return $data;
            });
        return response()->json([
            'applicants' => $applicants->map(function ($applicant) {
                return [
                    'id' => $applicant->id,
                    'full_name' => $applicant->full_name,
                    'education' => $applicant->education,
                    'work_experience' => $applicant->work_experience,
                    'core_skills' => $applicant->core_skills,
                    'language_spoken' => $applicant->language_spoken,
                    'top_matches' => $applicant->top_matches,
                ];
            }),
            'employeers' => $employeers,
        ], 200);
    }
}
