<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Container extends Model
{
    /** @use HasFactory<\Database\Factories\ContainerFactory> */
    use HasFactory;

    protected $fillable = [
        'board_id',
        'name',
        'description',
        'position',
        'status',
    ];

    public function board()
    {
        return $this->belongsTo(Board::class);
    }

    public function cards()
    {
        return $this->hasMany(Card::class);
    }
}
