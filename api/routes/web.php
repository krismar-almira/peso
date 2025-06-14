<?php

use App\Http\Controllers\nsrpcontroller;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/nsrp2', [nsrpcontroller::class,'nsrp2']);
Route::get('/nsrp1', [nsrpcontroller::class,'nsrp1']);
Route::get('/nsrp1/success', [nsrpcontroller::class,'nsrp1successSaved']);

Route::post('/nsrp1/save', [nsrpcontroller::class,'nsrp1Save']);


