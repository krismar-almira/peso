<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class,'login']);
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('');

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
    });
    Route::prefix('/position')->group(function () {
        route::post('', [PositionController::class,'Save']);
        route::get('', [PositionController::class,'All']);

    });
});