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
        $request->validate([
            'product_name' => 'required|string|max:255',
            'barcode' => 'required|string|max:255|unique:products',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'available_quantity' => 'required|integer',
            'category' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Image validation
        ]);

        // Handle the file upload
        $imageName = null;
        if ($request->hasFile('image')) {
            // Get the uploaded file
            $image = $request->file('image');
            
            // Create a unique filename for the image
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            
            // Move the file to the uploads directory
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

        // Redirect or return a response (e.g., success message)
        return redirect()->back()->with('success', 'Product added successfully.');
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
            'product_name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'available_quantity' => 'required|integer',
            'category' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Allow image to be nullable
        ]);

        $product = Product::findOrFail($id);
        
        // Handle the file upload if a new image is provided
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads'), $imageName);
            $validatedData['image'] = $imageName; // Update with the new image
        } else {
            $validatedData['image'] = $product->image; // Keep existing image if not updated
        }

        $product->update($validatedData);

        return redirect()->route('dashboard')->with('success', 'Product updated successfully.');
    }

    // Edit a specific product

public function edit($id)
{
    Log::info("Editing product with ID: $id");
    $product = Product::findOrFail($id);

    // Render the ProductEditItem (your edit form) with the product data
    return Inertia::render('ProductEditItem', [ // Make sure 'ProductEditItem' matches your actual component's name
        'product' => $product,
    ]);
}


    // Delete a product
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->noContent();
    }
}
