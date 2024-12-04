<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    // Get all products
    public function index(Request $request)
    {
        return response()
            ->json(Product::all(), 200)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }

    // Create a new product
    public function store(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'product_name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'available_quantity' => 'required|integer',
            'category' => 'required|string|max:255',
            'barcode' => 'nullable|string', // Optional field
        ]);

        // Create the new product
        $product = Product::create($validatedData);

        return response()
            ->json($product, 201) // HTTP 201: Created
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }

    // Show details of a specific product
    public function show(Product $product)
    {
        return response()
            ->json($product, 200)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }

    // Show the edit form for a specific product
    public function edit($product_id)
    {
        $product = Product::find($product_id);

        // Check if the product exists
        if (!$product) {
            return redirect()->route('products.index')->with('error', 'Product not found!');
        }

        return Inertia::render('ProductComponents/ProductEditItem', [
            'product' => $product,
        ]);
    }

    // Update an existing product
    public function update(Request $request, $product_id)
    {
        // Find the product by its ID
        $product = Product::findOrFail($product_id);

        // Validate the incoming data
        $validatedData = $request->validate([
            'product_name' => 'required|string|max:255',
            'barcode' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'available_quantity' => 'required|integer',
            'category' => 'required|string|max:255',
        ]);

        // Update the product with validated data
        $product->update($validatedData);

        // Return an Inertia response to reload the page or navigate after the update

    }

    // Delete a product
    public function destroy(Product $product)
    {
        $product->delete(); // Delete the product
        return response()
            ->json(['message' => 'Product deleted successfully'], 200)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
}
