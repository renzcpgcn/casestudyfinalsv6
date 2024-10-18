<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;



Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Product routes
    Route::apiResource('products', ProductController::class);
});


// Render ProductList page for product listing
Route::get('/products', function () {
    return Inertia::render('ProductList'); // Points to ProductList.jsx
})->middleware(['auth', 'verified']); // Added middleware for authentication

// Render ProductAddItem page for adding new products
Route::get('/add-product', function () {
    return Inertia::render('ProductAddItem');
})->middleware(['auth', 'verified']);
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('products', ProductController::class);
});

require __DIR__.'/auth.php';
