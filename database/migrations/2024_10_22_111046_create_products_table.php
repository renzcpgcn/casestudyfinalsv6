<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {

            $table->increments('product_id')->unique(); // Creates an auto-incrementing primary key called product_id
            $table->string('product_name');
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->integer('available_quantity');
            $table->string('category');
            $table->string('barcode')->unique(); // Ensure this is set correctly if used
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
};
