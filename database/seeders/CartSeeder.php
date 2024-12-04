<?php
namespace Database\Seeders;

use App\Models\Cart;
use Illuminate\Database\Seeder;

class CartSeeder extends Seeder
{
    public function run()
    {
        // Assuming you have a user and product data to seed
        // Replace the user_id and product_id with actual IDs from your database

        Cart::create([
            'user_id' => 1, // You can change this to a valid user ID from your users table
            'product_id' => 1, // You can change this to a valid product ID from your products table
            'product_name' => 'Sample Product 1',
            'product_description' => 'This is a description for Sample Product 1.',
            'price' => 199.99,
            'quantity' => 2, // Change the quantity as needed
        ]);

        Cart::create([
            'user_id' => 1, // Change to another user if you need multiple users
            'product_id' => 2, // Change this to another product ID
            'product_name' => 'Sample Product 2',
            'product_description' => 'This is a description for Sample Product 2.',
            'price' => 299.99,
            'quantity' => 1,
        ]);

        // Add more entries as needed
    }
}
