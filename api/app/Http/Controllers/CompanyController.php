<?php

namespace App\Http\Controllers;

use App\Models\Company;
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
}
