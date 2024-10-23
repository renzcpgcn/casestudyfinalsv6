<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    // Get all products
    public function index()
    {
        $products = Product::all();
        return response()->json($products); // Return products as JSON
    }

    public function store(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'product_name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'available_quantity' => 'required|integer',
            'category' => 'required|string|max:255',
        ]);

        // Create and save the new product
        $product = new Product();
        $product->product_name = $request->input('product_name');
        $product->description = $request->input('description');
        $product->price = $request->input('price');
        $product->available_quantity = $request->input('available_quantity');
        $product->category = $request->input('category');
        $product->barcode = $request->input('barcode'); // Assuming you have this field

        $product->save();

        return response()->json($product, 201);
    }

    // Show the form for editing an existing product
    public function edit($product_id) // Change this to product_id
    {
        // Find the product by product_id
        $product = Product::where('product_id', $product_id)->firstOrFail();

        // Render the ProductEditItem view with the product data
        return Inertia::render('ProductEditItem', ['product' => $product]);
    }

    // Update a product
    public function update(Request $request, $product_id)
    {
        // Fetch the product by product_id
        $product = Product::findOrFail($product_id);
    
        // Update the product with the request data
        $product->update($request->all());
    
        // Return a response or redirect as needed
   
    }

    // Delete a product
    public function destroy($product_id)
    {
        $product = Product::where('product_id', $product_id)->firstOrFail();
        $product->delete();

        return response()->noContent();
    }
}
