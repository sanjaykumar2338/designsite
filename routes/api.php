<?php

use App\Http\Controllers\Admin\ProductsController;
use App\Http\Controllers\Admin\PreProductsController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;
use App\Http\Controllers\PreFileController;
use App\Http\Controllers\UserController;

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


// For Preset
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('file', FileController::class);
Route::post('/createProduct', [FileController::class, 'createProduct']);
Route::post('/getProduct', [FileController::class, 'getProduct']);
Route::post('/createOrder', [FileController::class, 'createOrder']);
Route::post('/updateOrder/{id}', [FileController::class, 'updateOrder']);
Route::post('/calculateShippingRate', [FileController::class, 'calculateShippingRate']);

Route::post('/store_template', [ProductsController::class, 'store_template']);
Route::get('/get_template', [ProductsController::class, 'get_template']);
Route::post('/update_template/{id}', [ProductsController::class, 'updateApi']);

Route::post('/storeViaApi', [ProductsController::class, 'storeViaApi']);

// For PreDesign
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('prefile', PreFileController::class);
Route::post('/preproduct/createProduct', [PreFileController::class, 'createProduct']);
Route::post('/preproduct/getProduct', [PreFileController::class, 'getProduct']);
Route::post('/preproduct/createOrder', [PreFileController::class, 'createOrder']);
Route::post('/preproduct/updateOrder/{id}', [PreFileController::class, 'updateOrder']);
Route::post('/preproduct/calculateShippingRate', [PreFileController::class, 'calculateShippingRate']);

Route::post('/preproduct/store_template', [PreProductsController::class, 'store_template']);
Route::get('/preproduct/get_template', [PreProductsController::class, 'get_template']);
Route::post('/preproduct/update_template/{id}', [PreProductsController::class, 'updateApi']);
Route::post('/preproduct/storeViaApi', [PreProductsController::class, 'storeViaApi']);