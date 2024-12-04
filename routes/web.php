<?php
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\CartController;

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
    $user = Auth::user(); // Get the authenticated user

    if ($user->role === 'admin') {
        return Inertia::render('Dashboard'); // Load Dashboard for 'user' role
    } else {
        return Inertia::render('UserDashboard'); // Load UserDashboard for other roles
    }
})->middleware(['auth', 'verified'])->name('dashboard');

// Product routes for Inertia
Route::middleware(['auth', 'verified'])->group(function () {
    // Route to list all products
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');

    // Route to store a new product
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');

    // Route to show the form for adding new products
    Route::get('/add-product', function () {
        return Inertia::render('ProductComponents/ProductAddItem'); // Page for adding new products
    })->name('products.create');

    // Route to show the form for editing an existing product
    Route::get('/edit-product/{product_id}', [ProductController::class, 'edit'])->name('products.edit');

    // Route to update an existing product
    Route::put('/products/{product_id}', [ProductController::class, 'update'])->name('products.update');

    // Route to delete a product
    Route::delete('/products/{product_id}', [ProductController::class, 'destroy'])->name('products.destroy');
});
Route::middleware(['auth', 'verified'])->group(function () {
    // Route to view cart contents
    Route::get('/cart', [CartController::class, 'viewCart'])->name('cart.view');

    // Route to add a product to the cart (if you're using a form or direct request)
    Route::post('/cart', [CartController::class, 'addToCart'])->name('cart.add');

    // Route to remove a product from the cart
    Route::delete('/cart/{id}', [CartController::class, 'removeFromCart'])->name('cart.remove');
});
Route::get('/', [CartController::class, 'index']);  // Get all cart items
Route::post('/cart', [CartController::class, 'addToCart'])->name('cart.add');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/cart', function () {
        return Inertia::render('UserComponents/CartPage');  // Assuming CartPage is registered with Inertia
    })->name('cart.view');
});
Route::delete('/cart/{id}', [CartController::class, 'removeFromCart'])->name('cart.remove');



// Authentication routes
require __DIR__.'/auth.php';
