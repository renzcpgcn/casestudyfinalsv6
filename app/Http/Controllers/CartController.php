<?php


namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
         // Get all cart items
    public function index()
    {
        $carts = Cart::all();
        return response()->json($carts);
    }

    // Get a specific cart item by ID
    public function show($id)
    {
        $cart = Cart::find($id);
        if ($cart) {
            return response()->json($cart);
        }
        return response()->json(['message' => 'Cart item not found'], 404);
    }
    // Add product to cart
    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,product_id',
            'quantity' => 'required|integer|min:1',
        ]);

        $user = Auth::user();
        $product = Product::findOrFail($request->product_id);

        // Check if the item is already in the cart
        $cartItem = Cart::where('user_id', $user->id)
                        ->where('product_id', $product->product_id)
                        ->first();

        if ($cartItem) {
            // Update quantity if it exists
            $cartItem->increment('quantity', $request->quantity);
        } else {
            // Create a new cart item
            Cart::create([
                'user_id' => $user->id,
                'product_id' => $product->product_id,
                'product_name' => $product->product_name,
                'product_description' => $product->description,
                'price' => $product->price,
                'quantity' => $request->quantity,
            ]);
        }

        return response()->json(['message' => 'Product added to cart successfully!'], 201);
    }

    // View cart contents
   public function viewCart()
{
    $user = Auth::user();

    // Get the products in the user's cart
    $cartItems = Cart::with('product')->where('user_id', $user->id)->get();

    // Return the view with the cart items
    return view('cart.index', [
        'cartItems' => $cartItems,
        'totalPrice' => $cartItems->sum(fn($item) => $item->quantity * $item->product->price),
    ]);
}
// In CartController.php
public function updateCartQuantity(Request $request, $id)
{
    $request->validate([
        'quantity' => 'required|integer|min:1',
    ]);

    $cartItem = Cart::find($id);

    if ($cartItem) {
        $cartItem->quantity = $request->quantity;
        $cartItem->save();

        return response()->json(['message' => 'Quantity updated successfully!']);
    }

    return response()->json(['message' => 'Cart item not found'], 404);
}


    // Remove product from cart
    public function removeFromCart($id)
    {
        $cartItem = Cart::findOrFail($id);
        $cartItem->delete();

        return response()->json(['message' => 'Product removed from cart successfully!']);
    }
}
