<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;

// Grouping the routes for products under 'api' middleware
Route::middleware('api')->group(function () {
    // Product routes
    Route::apiResource('products', ProductController::class);

    // API Routes for Cart
    Route::get('/cart', [CartController::class, 'index']); // Get all cart items

    // Route to add a product to the cart
    Route::post('/cart', [CartController::class, 'addToCart']);
    Route::put('/cart/{id}', [CartController::class, 'updateCartQuantity']);

    // Route to remove a product from the cart
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);

    Route::get('/cart/item-count', [CartController::class, 'getCartItemCount']);


    Route::patch('/cart/{id}/selection', [CartController::class, 'updateSelection']);
    Route::put('/cart/select-all', [CartController::class, 'selectAll']);


    Route::get('/cart/item-count', [CartController::class, 'getCartItemCount']);


    // Route to get selected items from the cart
    Route::get('/cart/selected-items', [CartController::class, 'getSelectedItems']);

    // Route to store an order
    Route::post('/orders', [OrderController::class, 'store']);

    // Route to show a specific order by ID
    Route::get('/orders/{id}', [OrderController::class, 'show']);
});
Route::put('/cart/select-all', [CartController::class, 'selectAll']);

