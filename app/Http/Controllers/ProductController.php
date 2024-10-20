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
        return response()->json($products);
    }
    

    // Store a new product
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'barcode' => 'required|string|unique:products,barcode,' , // Allow same barcode for the current product
            'product_name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'available_quantity' => 'required|integer',
            'category' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        
    
        try {
            // Handle the file upload
            $imageName = null;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('uploads'), $imageName);
            }
    
            // Save the product data into the database
            $product = new Product();
            $product->product_name = $request->input('product_name');
            $product->barcode = $request->input('barcode');
            $product->description = $request->input('description');
            $product->price = $request->input('price');
            $product->available_quantity = $request->input('available_quantity');
            $product->category = $request->input('category');
            $product->image = $imageName; // Save the image filename in the database
            $product->save();
    
            // Redirect with a success message
            return redirect()->route('dashboard')->with('success', 'Product added successfully.');
    
        } catch (\Exception $e) {
            // Log the error for debugging purposes
            Log::error('Error storing product: ' . $e->getMessage());
            
            // Redirect back with an error message
            return redirect()->back()->withErrors('Error adding product. Please try again.');
        }
    }
    

    // Show a specific product
    public function show($id)
    {
        return Product::findOrFail($id);
    }

    // Update a product

    // Edit a specific product

    public function update(Request $request, $id)
    {
        // Use the $id variable here
        $validatedData = $request->validate([
            'barcode' => 'required|string|unique:products,barcode,' . $id, // Make sure to include $id here
            'product_name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'available_quantity' => 'required|integer',
            'category' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        $product = Product::findOrFail($id);  // Use the $id to find the product
    
        // Handle image upload and update the product
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads'), $imageName);
    
            // Delete old image if exists
            if ($product->image && file_exists(public_path('uploads/' . $product->image))) {
                unlink(public_path('uploads/' . $product->image));
            }
    
            $validatedData['image'] = $imageName;  // Update with new image
        }
    
        $product->update($validatedData);
    
        return redirect()->route('dashboard')->with('success', 'Product updated successfully.');
    }
    
    
    // Delete a product
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->noContent();
    }
}
