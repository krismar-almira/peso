<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\JobFairScheduleController;
use App\Http\Controllers\MatchingController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VacantPositionController;
use App\Models\JobFairSchedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class,'login']);
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('');

Route::get('/education/attainment', [EducationController::class,'getAllAttainment']);
Route::get('/position', [PositionController::class,'All']);
Route::get('/skill', [SkillController::class,'GetAll']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::prefix('/user')->group(function () {
        route::get('', [UserController::class,'getAllUser']);
        route::get('/logout', [UserController::class,'logOut']);
        route::post('', [UserController::class,'save']);
        route::get('/current', [UserController::class,'getCurrentUser']);
        route::get('/type', [UserController::class,'getTypeOfUsers']);
    });
    Route::prefix('/company')->group(function () {
        route::post('', [CompanyController::class,'Save']);
        route::get('', [CompanyController::class,'All']);
        route::post('/getbyid', [CompanyController::class,'GetCompanyById']);
        route::put('/employersreq/approve', [CompanyController::class,'ApproveEmployeerRequest']);
        route::put('/employersreq/delete', [CompanyController::class,'DeleteEmployeerRequest']);
        route::post('/addcompanyschedule', [CompanyController::class,'AddCompanyToJobFairSchedule']);
        route::get('/employersreq', [CompanyController::class,'GetAllEmployeersRequest']);
        route::get('/geemployerjoinjobfairschedule', [CompanyController::class,'GetEmployJoinJobFairSchedule']);

        route::delete('/employerjoinjobfairschedule', [CompanyController::class,'DeleteEmployJoinJobFairSchedule']);


        route::get('/nsrp2req', [CompanyController::class,'GetAllNsrp2Request']);
        route::put('/nsrp2req/approve', [CompanyController::class,'NSRP2ReqApprove']);
        route::put('/nsrp2req/delete', [CompanyController::class,'NSRP2ReqDelete']);


        
    });
    Route::prefix('/match')->group(function () {
        route::get('',[MatchingController::class,'match']);
    });
    Route::prefix('/position')->group(function () {
        route::post('', [PositionController::class,'Save']);
        //route::get('', [PositionController::class,'All']);
    });
    Route::prefix('/skill')->group(function () {
        route::post('', [SkillController::class,'Save']);
        //route::get('', [SkillController::class,'GetAll']);
    });
    Route::prefix('/jobfair')->group(function () {
        route::post('', [JobFairScheduleController::class,'Save']);
        route::get('', [JobFairScheduleController::class,'GetAll']);
        route::post('join', [JobFairScheduleController::class,'Join']);
        route::post('accept', [JobFairScheduleController::class,'Accept']);
        route::get('/participants', [JobFairScheduleController::class,'getAllParticpants']);
    });
    Route::prefix('/education')->group(function () {
        route::get('level', [EducationController::class,'level']);
        route::post('attainment', [EducationController::class,'addAttainement']);
        //route::get('attainment', [EducationController::class,'getAllAttainment']);
    });
    Route::prefix('/vacantposition')->group(function () {
        route::post('', [VacantPositionController::class,'save']);
        route::get('', [VacantPositionController::class,'getAll']);
        route::delete('', [VacantPositionController::class,'delete']);
    });
    
});