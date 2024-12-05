<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    // Define the table name if it's different from the default plural form
    protected $table = 'orders';

    // Define the fillable attributes (to allow mass assignment)
    protected $fillable = [
        'user_id',
        'name',
        'address',
        'city',
        'municipality',
        'postal_code',
        'phone',
        'total_price',
        'payment_method',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
   }


}
