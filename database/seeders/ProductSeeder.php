<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // You can create multiple products using a loop or create several instances manually
        Product::create([
            'barcode' => '1234567890123',
            'product_name' => 'Product One',
            'description' => 'This is the description for Product One.',
            'price' => 10.99,
            'available_quantity' => 100,
            'category' => 'Category A',
            'image' => 'path/to/image1.jpg', // Example image path
        ]);

        Product::create([
            'barcode' => '9876543210987',
            'product_name' => 'Product Two',
            'description' => 'This is the description for Product Two.',
            'price' => 20.49,
            'available_quantity' => 50,
            'category' => 'Category B',
            'image' => 'path/to/image2.jpg',
        ]);

        // Add more products as needed
        // For example, using a loop to create random products
        for ($i = 3; $i <= 10; $i++) {
            Product::create([
                'barcode' => '12345678900' . $i,
                'product_name' => 'Product ' . $i,
                'description' => 'This is the description for Product ' . $i,
                'price' => rand(5, 50), // Random price between 5 and 50
                'available_quantity' => rand(1, 200), // Random quantity
                'category' => 'Category ' . chr(65 + $i % 3), // Cycle through categories A, B, C
                'image' => 'path/to/image' . $i . '.jpg',
            ]);
        }
    }
}
