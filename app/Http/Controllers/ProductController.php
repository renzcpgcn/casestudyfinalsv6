<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Get all products
    public function index()
    {
        $products = Product::all();
        Log::info('Fetched Products:', $products->toArray()); // Log the products
        return $products;
    }

    // Store a new product
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'barcode' => 'required|string|unique:products',
            'product_name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'available_quantity' => 'required|integer',
            'category' => 'required|string',
            'image' => 'nullable|string',
        ]);

        return Product::create($validatedData);
    }

    // Show a specific product
    public function show($id)
    {
        return Product::findOrFail($id);
    }

    // Update a product
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'barcode' => 'required|string|unique:products,barcode,' . $id,
            'product_name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'available_quantity' => 'required|integer',
            'category' => 'required|string',
            'image' => 'nullable|string',
        ]);

        $product = Product::findOrFail($id);
        $product->update($validatedData);

        return $product;
    }

    // Delete a product
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->noContent();
    }
}
