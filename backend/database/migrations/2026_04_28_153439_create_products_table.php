<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('name_ar');
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('description_ar');
            $table->decimal('price', 10, 2);
            $table->json('images')->nullable();
            $table->string('category')->default('collection');
            $table->json('notes')->nullable();
            $table->integer('stock')->default(0);
            $table->decimal('rating', 3, 1)->default(0);
            $table->integer('num_reviews')->default(0);
            $table->boolean('is_new')->default(false);
            $table->boolean('is_bestseller')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->string('size')->default('50ml');
            $table->string('year')->nullable();
            $table->string('origin')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
