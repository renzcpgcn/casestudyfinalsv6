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

// Profile routes
Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');

// Dashboard route
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Product routes for Inertia
Route::middleware(['auth', 'verified'])->group(function () {
    // Route to list all products
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');

    // Route to store a new product
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');

    // Route to show the form for adding new products
    Route::get('/add-product', function () {
        return Inertia::render('ProductAddItem'); // Page for adding new products
    })->name('products.create');
    Route::put('/products/{product_id}', [ProductController::class, 'update'])->name('products.update');


    // Route to show the form for editing an existing product
    Route::get('/edit-product/{product_id}', [ProductController::class, 'edit'])->name('products.edit');

    // Route to update an existing product
    Route::put('/products/{product_id}', [ProductController::class, 'update'])->name('products.update');

    // Route to delete a product (optional, if you want to implement it)
    Route::delete('/products/{product_id}', [ProductController::class, 'destroy'])->name('products.destroy');
});

// Authentication routes
require __DIR__.'/auth.php';
