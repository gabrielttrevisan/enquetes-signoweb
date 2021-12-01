<?php

namespace App\Http\Controllers;

use App\Models\Enquete;
use Illuminate\Http\Request;

class EnquetesUIController extends Controller
{
    public function index()
    {
        return view('welcome', [ 'props' => [] ]);
    }
}
