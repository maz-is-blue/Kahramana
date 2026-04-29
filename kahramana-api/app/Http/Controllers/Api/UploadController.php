<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate(['images' => 'required', 'images.*' => 'image|max:5120']);
        $urls = [];
        foreach ($request->file('images') as $file) {
            $path = $file->store('products', 'public');
            $urls[] = asset('storage/' . $path);
        }
        return response()->json(['urls' => $urls]);
    }
}
