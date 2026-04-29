<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $order = \App\Models\Order::create([
            'user_id' => $request->user()->id,
            'shipping_address' => $request->shipping_address,
            'subtotal' => $request->subtotal,
            'shipping' => $request->shipping ?? 15,
            'total' => $request->total,
            'status' => 'processing',
        ]);
        foreach ($request->items as $item) {
            $order->items()->create($item);
        }
        return response()->json($order->load('items'), 201);
    }

    public function myOrders(Request $request)
    {
        return response()->json(\App\Models\Order::with('items')->where('user_id', $request->user()->id)->latest()->get());
    }

    public function index()
    {
        $orders = \App\Models\Order::with(['items','user:id,name,email'])->latest()->get();
        return response()->json(['orders' => $orders, 'total' => $orders->count()]);
    }

    public function updateStatus(Request $request, $id)
    {
        $order = \App\Models\Order::findOrFail($id);
        $order->update(['status' => $request->status, 'tracking_number' => $request->tracking_number]);
        return response()->json($order);
    }
}
