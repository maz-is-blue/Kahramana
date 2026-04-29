<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $products = $request->user()->wishlist()->get();
        return response()->json($products);
    }

    public function toggle(Request $request, $productId)
    {
        $user = $request->user();
        if ($user->wishlist()->where('product_id', $productId)->exists()) {
            $user->wishlist()->detach($productId);
            return response()->json(['added' => false]);
        }
        $user->wishlist()->attach($productId);
        return response()->json(['added' => true]);
    }
}
