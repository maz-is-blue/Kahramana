<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index($productId)
    {
        return response()->json(\App\Models\Review::with('user:id,name')->where('product_id',$productId)->latest()->get());
    }

    public function store(Request $request, $productId)
    {
        $request->validate(['rating'=>'required|integer|min:1|max:5','text'=>'required']);
        if (\App\Models\Review::where('user_id',$request->user()->id)->where('product_id',$productId)->exists())
            return response()->json(['message'=>'You already reviewed this product'], 400);

        $review = \App\Models\Review::create(['user_id'=>$request->user()->id,'product_id'=>$productId,'name'=>$request->user()->name,'rating'=>$request->rating,'text'=>$request->text]);

        $avg = \App\Models\Review::where('product_id',$productId)->avg('rating');
        $count = \App\Models\Review::where('product_id',$productId)->count();
        \App\Models\Product::findOrFail($productId)->update(['rating'=>round($avg,1),'num_reviews'=>$count]);

        return response()->json($review, 201);
    }
}
