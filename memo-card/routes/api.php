<?php

use App\Http\Controllers\MemoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
 */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//Route::get('/memo/{id}', [MemoController::class, 'show']);

Route::get('/memo', [MemoController::class, 'index']);
Route::post('/memo', [MemoController::class, 'store']);
Route::post('/memo/{id}', [MemoController::class, 'update']);
Route::delete('/memo/{id}', [MemoController::class, 'destroy']);
