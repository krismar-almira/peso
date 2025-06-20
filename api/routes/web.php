<?php

use App\Http\Controllers\nsrpcontroller;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/nsrp22', [nsrpcontroller::class,'nsrp22']);
Route::get('/nsrp2', [nsrpcontroller::class,'nsrp2']);



Route::get('/nsrp1', [nsrpcontroller::class,'nsrp1']);
Route::get('/nsrp1/success', [nsrpcontroller::class,'nsrp1successSaved']);
Route::get('/nsrp2/success', [nsrpcontroller::class,'nsrp2successSaved']);


Route::post('/nsrp1/save', [nsrpcontroller::class,'nsrp1Save']);
Route::post('/nsrp2/save', [nsrpcontroller::class,'nsrp2Save']);



