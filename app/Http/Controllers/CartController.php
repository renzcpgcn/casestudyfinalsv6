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

    // View cart contents

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
    $cartItems = Cart::with('product')->where('user_id', 1)->get();

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
    public function destroy($id)
    {
        // Assuming you have a Cart model
        $cartItem = Cart::find($id);

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

        $cartItem = Cart::find($id);

        if (!$cartItem) {
            return response()->json(['message' => 'Cart item not found'], 404);
        }

        $cartItem->selected = $request->selected;
        $cartItem->save();

        return response()->json(['message' => 'Selection updated successfully']);
    }
    public function clearSelectedItems(Request $request)
    {
        $userId = $request->input('user_id');

        // Delete items where 'selected' is 1
        $deletedCount = Cart::where('user_id', $userId)->where('selected', 1)->delete();

        if ($deletedCount > 0) {
            return response()->json(['message' => 'Selected items cleared from the cart.'], 200);
        }

        return response()->json(['message' => 'No selected items found in the cart.'], 404);
    }
    public function clearSelected(Request $request)
    {
        $userId = $request->input('user_id');

        // Assuming you have a Cart model to manage cart items
        $deleted = Cart::where('user_id', $userId)->delete();

        if ($deleted) {
            return response()->json(['message' => 'Selected items cleared successfully.']);
        } else {
            return response()->json(['error' => 'No items to clear.'], 404);
        }
    }

    public function selectAll()
    {
        // Update all records in the carts table to set 'selected' column to 1
        Cart::query()->update(['selected' => 1]);

        return response()->json([
            'message' => 'All items selected successfully',
        ]);
    }

    public function getCartItemCount(Request $request)
    {
        $userId = $request->query('user_id', 2); // Get user_id from query parameter

        if (!$userId) {
            return response()->json(['error' => 'user_id is required'], 400);
        }

        // Calculate the sum of quantities for the given user_id
        $cartItemCount = Cart::where('user_id', $userId)->sum('quantity');

        return response()->json(['count' => $cartItemCount]);
    }


}
