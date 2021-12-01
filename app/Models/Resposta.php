<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resposta extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'enquete_id'
    ];

    public function enquete()
    {
        return $this->hasOne(Enquete::class, 'id', 'enquete_id');
    }
}
