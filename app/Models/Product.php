<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory; // Make sure this line is included only once

    protected $primaryKey = 'product_id';

    protected $fillable = [
        'product_name',
        'barcode',
        'description',
        'price',
        'available_quantity',
        'category',
        'image',
    ];


  protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            $product->barcode = self::generateUniqueBarcode();
        });
    }
    private static function generateUniqueBarcode()
{
    // Generate a random 11-digit number
    $barcode = str_pad(rand(0, 99999999999), 11, '0', STR_PAD_LEFT);

    // Check for uniqueness in the database
    while (self::where('barcode', $barcode)->exists()) {
        $barcode = str_pad(rand(0, 99999999999), 11, '0', STR_PAD_LEFT);
    }

    return $barcode;
}

}

