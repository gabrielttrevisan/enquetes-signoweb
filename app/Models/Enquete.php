<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enquete extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'inicio',
        'fim',
    ];

    protected $dates = [ 'created_at', 'updated_at', 'inicio', 'fim' ];

    public function respostas()
    {
        return $this->hasMany(Resposta::class);
    }

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($enquete)
            {
                foreach ($enquete->respostas() as $resposta)
                {
                    $resposta->delete();
                }
            }
        );
    }
}
