<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use Illuminate\Support\Facades\Route;

// Grouping the routes for products under 'api' middleware
Route::middleware('api')->group(function () {
    // Product routes
    Route::apiResource('products', ProductController::class);

    // Route to fetch cart items without authenticationoute::get('/cart', [CartController::class, 'getCartItems']);
    // API Routes for Cart
    Route::get('/cart', [CartController::class, 'index']);

    // Route to get a specific cart item by ID
    Route::get('/cart/{id}', [CartController::class, 'show']);

    // Route to add a product to the cart
    Route::post('/cart', [CartController::class, 'addToCart']);
    Route::put('/cart/{id}', [CartController::class, 'updateCartQuantity']);
    // Route to remove a product from the cart
    Route::delete('/cart/{id}', [CartController::class, 'removeFromCart']);
});
