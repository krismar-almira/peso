<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PositionController extends Controller
{
    function Save(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:positions',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 405);
        }
         $position = Position::create([
            'name'=>$request->input('name'), 
            'min_level'=>$request->input('min_level'), 
            'max_level'=>$request->input('max_level')
        ]);
        return response()->json($position, 200);
    }
    function All() {
        $position = Position::all();
        return response()->json($position, 200);
    }
}
