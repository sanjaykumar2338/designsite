<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\ProductsController;
use Laravel\Cashier\Http\Controllers\WebhookController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'admin','middleware' => 'check.auth'], function () {
    Route::get('', [AdminController::class, 'index']);
    //Route::get('/',[ProductsController::class, 'product_show']);
    //Route::get('/show/{product}',[ProductsController::class,'product_view']);
    Route::get('products/create_template/{id}', [ProductsController::class, 'create_template']);
    Route::resource('/products', ProductsController::class);
    Route::post('/products', [ProductsController::class, 'store'])->name('admin.products.store');
    Route::post('/products/update/{id}', [ProductsController::class, 'update']);
    Route::get('/products/remove/{id}', [ProductsController::class, 'destroy']);
    Route::get('products/{product}', 'ProductsController@show');
    Route::get('photos/create/{id}', 'PhotoController@create');
});

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/contactus', [App\Http\Controllers\HomeController::class, 'contactus'])->name('contactus');
Route::get('/aboutus', [App\Http\Controllers\HomeController::class, 'aboutus'])->name('aboutus');
Route::get('/conflicts', [App\Http\Controllers\HomeController::class, 'conflicts'])->name('conflicts');
Route::get('/causes', [App\Http\Controllers\HomeController::class, 'causes'])->name('causes');
Route::get('/shop2', [App\Http\Controllers\HomeController::class, 'shop2'])->name('shop2');
Route::get('/media', [App\Http\Controllers\HomeController::class, 'media'])->name('media');
Route::get('/justice', [App\Http\Controllers\HomeController::class, 'justice'])->name('justice');
Route::get('/blog', [App\Http\Controllers\HomeController::class, 'blog'])->name('blog');
Route::get('/blog_detail', [App\Http\Controllers\HomeController::class, 'blog_detail'])->name('blog_detail');
Route::get('/products', [App\Http\Controllers\HomeController::class, 'products'])->name('products');
Route::get('/events', [App\Http\Controllers\HomeController::class, 'events'])->name('events');
Route::get('/track_order', [App\Http\Controllers\HomeController::class, 'track_order'])->name('track_order');
Route::get('/shipping', [App\Http\Controllers\HomeController::class, 'shipping'])->name('shipping');
Route::get('/wishlist', [App\Http\Controllers\HomeController::class, 'wishlist'])->name('wishlist');
Route::get('/my_account', [App\Http\Controllers\HomeController::class, 'my_account'])->name('my_account');
Route::get('/order_history', [App\Http\Controllers\HomeController::class, 'order_history'])->name('order_history');
Route::get('/return_order', [App\Http\Controllers\HomeController::class, 'return_order'])->name('return_order');
Route::get('/donate_now', [App\Http\Controllers\HomeController::class, 'donate_now'])->name('donate_now');
Route::get('/login', [App\Http\Controllers\HomeController::class, 'login'])->name('login');
Route::get('/register', [App\Http\Controllers\HomeController::class, 'register'])->name('register');
Route::get('/product_design', [App\Http\Controllers\HomeController::class, 'product_design'])->name('product_design');
Route::get('/create_product', [App\Http\Controllers\HomeController::class, 'create_product'])->name('create_product');

Route::get('/product_list', [App\Http\Controllers\HomeController::class, 'product_list'])->name('product_list');
Route::get('/{standwithtype}/shop/{productType}/{id}', [App\Http\Controllers\HomeController::class, 'shop'])->name('shop');
Route::post('/register', [App\Http\Controllers\UserController::class, 'register'])->name('register');
Route::get('/logout', [App\Http\Controllers\UserController::class, 'logout'])->name('logout');
Route::post('/login', [App\Http\Controllers\UserController::class, 'login'])->name('login');

Route::post(
    'stripe/webhook',
    [WebhookController::class, 'handleWebhook']
);

Route::post('/charge', [App\Http\Controllers\PaymentController::class, 'processPayment'])->name('charge');
Route::get('/linkstorage', function () {
    Artisan::call('storage:link');
});
