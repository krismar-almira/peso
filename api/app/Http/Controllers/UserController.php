<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Company;
use App\Models\TypeOfUser;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    function logOut(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json('success', 200);
    }
    function getAllUser(){
        $users = User::with('company')->get();
        foreach ($users as &$user) {
            //return $user->imagelocation;
            $user->key = $user->id; 
            $user->label = $user->name; 
            $user->imagelocation = Storage::temporaryUrl(
                                            $user->imagelocation?$user->imagelocation:'.jpeg', now()->addDay(1)
                                    );
            
        }
        return $users;
    }
    function getCurrentUser(Request $request){
        $user = $request->user();
        $user?->load(['company']);
        $user->imagelocation = Storage::temporaryUrl(
            $user->imagelocation?$user->imagelocation:'.jpeg', now()->addDay(1)
         );
        return $user;
    }
    function getTypeOfUsers(){
        return TypeOfUser::all();
    }
    function save(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|unique:users|max:255',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 405);
        }

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
        
        $user = User::create([
            'email'=>$request->input('email'),
            'password'=>$request->input('password'),
            'first_name'=>$request->input('first_name'),
            'last_name'=>$request->input('last_name'),
            'middle_name'=>$request->input('middle_name'),
            'type_of_user_id'=>$request->input('type_of_user_id'),
            'company_id'=>$request->input('company'),
            'imagelocation'=>$fileName

        ]);
        return $user;
    }
}
