<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = \App\Models\Product::query();
        if ($request->category && $request->category !== 'all') $query->where('category', $request->category);
        if ($request->search) $query->where(fn($q) => $q->where('name','like',"%{$request->search}%")->orWhere('name_ar','like',"%{$request->search}%"));
        if ($request->featured) $query->where('is_featured', true);
        match($request->sort ?? 'newest') {
            'price-asc'  => $query->orderBy('price'),
            'price-desc' => $query->orderByDesc('price'),
            'rating'     => $query->orderByDesc('rating'),
            default      => $query->latest(),
        };
        $limit = $request->limit ?? 12;
        $paginated = $query->paginate($limit);
        return response()->json(['products'=>$paginated->items(),'total'=>$paginated->total(),'page'=>$paginated->currentPage(),'pages'=>$paginated->lastPage()]);
    }

    public function show($id)
    {
        $product = \App\Models\Product::where('id',$id)->orWhere('slug',$id)->firstOrFail();
        return response()->json($product);
    }

    public function store(Request $request)
    {
        $request->validate(['name'=>'required','name_ar'=>'required','price'=>'required|numeric','stock'=>'required|integer']);
        $data = $request->all();
        $data['slug'] = \Illuminate\Support\Str::slug($request->name);
        $product = \App\Models\Product::create($data);
        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {
        $product = \App\Models\Product::findOrFail($id);
        $product->update($request->all());
        return response()->json($product);
    }

    public function destroy($id)
    {
        \App\Models\Product::findOrFail($id)->delete();
        return response()->json(['message' => 'Product deleted']);
    }
}
