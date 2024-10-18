<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'barcode',
        'product_name', // Add product_name here
        'description',
        'price',
        'available_quantity',
        'category',
        'image',
    ];
}
