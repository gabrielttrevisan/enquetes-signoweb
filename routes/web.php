<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\EnqueteApiController;
use App\Http\Controllers\EnquetesUIController;
use App\Http\Controllers\RespostaApiController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [ EnquetesUIController::class, 'index' ])->name('ui.enquetes.index');

Route::get('/enquetes', [ EnqueteApiController::class, 'index'])->name('enquetes.index');
Route::post('/enquetes/store', [ EnqueteApiController::class, 'store'])->name('enquetes.store');
Route::patch('/enquetes/update/{enquete}', [ EnqueteApiController::class, 'update'])->name('enquetes.update');
Route::delete('/enquetes/delete/{enquete}', [ EnqueteApiController::class, 'destroy'])->name('enquetes.delete');
Route::post('/enquetes/add', [ EnqueteApiController::class, 'addResposta' ])->name('enquetes.add');

Route::get('/respostas/get/{enquete}', [ RespostaApiController::class, 'get' ])->name('respostas.get');
Route::patch('/respostas/vote', [ RespostaApiController::class, 'vote' ])->name('respostas.vote');
Route::delete('/respostas/delete/{resposta}', [ RespostaApiController::class, 'delete' ])->name('respostas.delete');
