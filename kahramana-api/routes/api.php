<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\UploadController;

// Auth
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login',    [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me',        [AuthController::class, 'me']);
    Route::put('/auth/profile',   [AuthController::class, 'updateProfile']);
});

// Products (public read, admin write)
Route::get('/products',      [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/products',         [ProductController::class, 'store']);
    Route::put('/products/{id}',     [ProductController::class, 'update']);
    Route::delete('/products/{id}',  [ProductController::class, 'destroy']);
    Route::post('/upload',           [UploadController::class,  'store']);
});

// Orders
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/orders',              [OrderController::class, 'store']);
    Route::get('/orders/my',            [OrderController::class, 'myOrders']);
    Route::middleware('admin')->group(function () {
        Route::get('/orders',               [OrderController::class, 'index']);
        Route::put('/orders/{id}/status',   [OrderController::class, 'updateStatus']);
    });
});

// Wishlist
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/wishlist',              [WishlistController::class, 'index']);
    Route::post('/wishlist/{productId}', [WishlistController::class, 'toggle']);
});

// Reviews
Route::get('/reviews/{productId}',  [ReviewController::class, 'index']);
Route::middleware('auth:sanctum')->post('/reviews/{productId}', [ReviewController::class, 'store']);
