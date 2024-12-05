<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    // Store a new order
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'municipality' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
            'phone' => 'required|string|max:15',
            'total_price' => 'required|numeric',
            'payment_method' => 'required|string|max:50',
        ]);

        // If validation fails, return a response with error messages
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
            ], 422);
        }

        // Create the order in the database
        $order = Order::create([
            'user_id' => $request->user_id,
            'name' => $request->name,
            'address' => $request->address,
            'city' => $request->city,
            'municipality' => $request->municipality,
            'postal_code' => $request->postal_code,
            'phone' => $request->phone,
            'total_price' => $request->total_price,
            'payment_method' => $request->payment_method,
        ]);

        // Return a success response with the created order data
        return response()->json([
            'message' => 'Order successfully created',
            'order' => $order,
        ], 201);
    }

    // Optional: Method for fetching an order by its ID
    public function show($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json(['order' => $order]);
    }
}
