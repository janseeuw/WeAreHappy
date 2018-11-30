<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class VoteController extends Controller
{
    public function index() {
        try {
            $votes = Storage::disk('local')->exists('votes.json') ? json_decode(Storage::disk('local')->get('votes.json')) : [];
            return json_encode($votes);
        } catch (Exception $e) {
            return response()->json(['errors' => ['Something went wrong.']], 500);
        }
    }

    public function store(Request $request) {
        try {
             $validatedData = $request->validate([
                'vote' => 'required',
            ]);

            $vote['vote'] = $validatedData['vote'];
            $vote['dateAdded'] = date('Y-m-d H:i:s');

            $votes = Storage::disk('local')->exists('votes.json') ? json_decode(Storage::disk('local')->get('votes.json')) : [];
            array_push($votes, $vote);
            Storage::disk('local')->put('votes.json', json_encode($votes));
            return $vote; 
        } catch(Exception $e) {
            return response()->json(['errors' => ['Something went wrong.']], 500);
        }
    }
}
