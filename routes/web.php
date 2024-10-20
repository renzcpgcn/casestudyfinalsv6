<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;
// Inertia routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});
Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');

// Dashboard route
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


// Product routes for Inertia
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/products', function () {
        return Inertia::render('ProductList'); // This is for the Inertia page
    });

    Route::get('/add-product', function () {
        return Inertia::render('ProductAddItem'); // Page for adding new products
    });
});
// In routes/api.php
Route::middleware('auth:sanctum')->get('/products', [ProductController::class, 'index']);

// API routes for product management
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('/products', ProductController::class); // This will create routes like /api/products
});

// Authentication routes
require __DIR__.'/auth.php';
