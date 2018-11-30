<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AuthenticationController extends Controller
{
    public function login(Request $request) {
        try {
             $validatedData = $request->validate([
                'password' => 'required',
            ]);

            if ($validatedData['password'] === env('PASSWORD')) {
                return response()->json([], 200);
            } else {
                return response()->json(['errors' => ['password' => ['Wrong credentials.']]], 401);
            }
        } catch(Exception $e) {
            return response()->json(['errors' => ['password' => ['Something went wrong.']]], 500);
        }
    }
}
