<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name','name_ar','slug','description','description_ar','price',
        'images','category','notes','stock','rating','num_reviews',
        'is_new','is_bestseller','is_featured','size','year','origin',
    ];

    protected $casts = [
        'images' => 'array',
        'notes'  => 'array',
        'is_new' => 'boolean',
        'is_bestseller' => 'boolean',
        'is_featured' => 'boolean',
        'price' => 'float',
        'rating' => 'float',
    ];

    public function reviews() { return $this->hasMany(Review::class); }
}
