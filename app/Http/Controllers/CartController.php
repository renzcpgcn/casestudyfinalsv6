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
        $carts = Cart::where('user_id', Auth::id())->get();  // Use Auth::id() to get the current user
        return response()->json($carts);
    }

    // Get a specific cart item by ID
    public function show($id)
    {
        $cart = Cart::where('user_id', Auth::id())->find($id);  // Ensure the cart item belongs to the authenticated user
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

        $user = Auth::user();  // Get the authenticated user
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
        $user = Auth::user();  // Get the authenticated user

        // Get the products in the user's cart
        $cartItems = Cart::with('product')->where('user_id', $user->id)->get();  // Use Auth::id() to get the current user

        // Return the view with the cart items
        return view('cart.index', [
            'cartItems' => $cartItems,
            'totalPrice' => $cartItems->sum(fn($item) => $item->quantity * $item->product->price),
        ]);
    }

    // Update cart quantity
    public function updateCartQuantity(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = Cart::where('user_id', Auth::id())->find($id);  // Ensure the cart item belongs to the authenticated user

        if ($cartItem) {
            $cartItem->quantity = $request->quantity;
            $cartItem->save();

            return response()->json(['message' => 'Quantity updated successfully!']);
        }

        return response()->json(['message' => 'Cart item not found'], 404);
    }

    // Remove product from cart
    public function destroy($id)
    {
        $cartItem = Cart::where('user_id', Auth::id())->find($id);  // Ensure the cart item belongs to the authenticated user

        if ($cartItem) {
            $cartItem->delete();
            return response()->json(['message' => 'Item deleted successfully']);
        } else {
            return response()->json(['message' => 'Item not found'], 404);
        }
    }

    public function updateSelection(Request $request, $id)
    {
        $request->validate([
            'selected' => 'required|boolean',
        ]);

        $cartItem = Cart::where('user_id', Auth::id())->find($id);  // Ensure the cart item belongs to the authenticated user

        if (!$cartItem) {
            return response()->json(['message' => 'Cart item not found'], 404);
        }

        $cartItem->selected = $request->selected;
        $cartItem->save();

        return response()->json(['message' => 'Selection updated successfully']);
    }

    // Clear selected items from the cart
    public function clearSelectedItems(Request $request)
    {
        $deletedCount = Cart::where('user_id', Auth::id())  // Use Auth::id() to get the current user's ID
            ->where('selected', 1)
            ->delete();

        if ($deletedCount > 0) {
            return response()->json(['message' => 'Selected items cleared from the cart.'], 200);
        }

        return response()->json(['message' => 'No selected items found in the cart.'], 404);
    }

    // Clear all cart items for the authenticated user
    public function clearSelected(Request $request)
    {
        $deleted = Cart::where('user_id', Auth::id())->delete();  // Use Auth::id() to get the current user's ID

        if ($deleted) {
            return response()->json(['message' => 'Selected items cleared successfully.']);
        } else {
            return response()->json(['error' => 'No items to clear.'], 404);
        }
    }

    public function selectAll()
    {
        Cart::where('user_id', Auth::id())  // Use Auth::id() to update the user's cart items
            ->update(['selected' => 1]);

        return response()->json([
            'message' => 'All items selected successfully',
        ]);
    }

    // Get the cart item count for the current user
    public function getCartItemCount(Request $request)
    {
        $cartItemCount = Cart::where('user_id', Auth::id())->sum('quantity');  // Use Auth::id() to get the current user's ID

        return response()->json(['count' => $cartItemCount]);
    }
}
