<?php

namespace App\Http\Controllers;

use App\Models\Memo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MemoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $memo = Memo::all();
        return response()->json($memo);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $memo = new Memo();
        $memo->title = $request->input('title');
        $memo->description = $request->input('description');

        if ($request->hasFile('image')) {
            $imagePath = Storage::putFile('public/images', $request->file('image'));
            $imageName = explode('/', $imagePath)[2];
            $memo->image = 'images/' . $imageName;
        }
        $memo->save();

        return response()->json($memo, 201);
    }

    /**
     * Display the specified resource.
     */
    //public function show(string $id)
    //{
    //    $memo = Memo::findOrFail($id);

    //    return response()->json($memo);
    //}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $memo = Memo::findOrFail($id);
        $memo->title = $request->input('title');
        $memo->description = $request->input('description');

        if ($request->hasFile('image')) {
            Storage::delete('public/' . $memo->image);
            $imagePath = Storage::putFile('public/images', $request->file('image'));
            $imageName = explode('/', $imagePath)[2];
            $memo->image = 'images/' . $imageName;
        }

        $memo->save();
        return response()->json($memo, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $Memo = Memo::findOrFail($id);
        $Memo->delete();

        return response()->json(null, 204);
    }
}