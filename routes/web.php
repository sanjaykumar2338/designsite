<?php

use Illuminate\Support\Facades\File;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use Carbon\Carbon;
use App\Models\Blogs;

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\StudentController;

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Admin\ProductsController;
use App\Http\Controllers\Admin\PreProductsController;
use App\Http\Controllers\Admin\BlogsController;
use App\Http\Controllers\Admin\CollectionController;
use App\Http\Controllers\Admin\BoycottController;;
use Laravel\Cashier\Http\Controllers\WebhookController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Models\Products;
use App\Models\PreProducts;
use App\Models\Collections;
use App\Models\Boycotts;
use Illuminate\Support\Facades\Mail;

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

Route::get('/generate-sitemap', function() {

    try {
        Mail::raw('Test email body', function ($message) {
            $message->to('sk963070@gmail.com')->subject('SMTP Test Email');
        });
        echo 'Email sent successfully';
    } catch (\Exception $e) {
        echo 'Error: ' . $e->getMessage();
    }

    die;
    
    $sitemap = Sitemap::create();

    // Get all blade files in the directory
    $files = File::allFiles(resource_path('views/frontend/pages'));

    foreach ($files as $file) {
        $filename = pathinfo($file)['filename'];

        /*
        $sitemap->add(Url::create("/$filename")
            ->setLastModificationDate(Carbon::now()) 
            ->setPriority(0.8)
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)); 
        */
    }

    // Add blog posts from your database
    $blogs = Blogs::all();
    foreach ($blogs as $blog) {
        $url = route('blog_detail', ['slug' => $blog->slug]);

        $sitemap->add(Url::create($url)
            ->setLastModificationDate($blog->updated_at) // Adjust this based on your field
            ->setPriority(0.8)
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY));
    }

    // Add product URLs from your database
    $products = Products::all();
    foreach ($products as $product) {
        $url = route('shop', [
            'standwithtype' => 'stand-with-' . strtolower($product->supporting_country), // Assuming supporting_country is stored as "Israel", transform it to "stand-with-israel"
            'productfor' => strtolower($product->product_for), // Assuming product_for is "Men", transform it to lowercase
            'productType' => strtolower($product->product_type), // Assuming product_type is "Shirts", transform it to lowercase
            'slug' => $product->product_slug
        ]);

        $sitemap->add(Url::create($url)
            ->setLastModificationDate($product->updated_at) // Adjust this based on your field
            ->setPriority(0.8)
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY));
    }

    $sitemap->add(Url::create('/shop'));
    $sitemap->add(Url::create('/shop/oversight-collection'));
    $sitemap->add(Url::create('/shop/traitor-collection'));
    $sitemap->add(Url::create('/shop/trader-collection'));
    $sitemap->add(Url::create('/shop/propaganda-collection'));

    // Define the collection types
    $collectionTypes = ['Oversight', 'Trader', 'Traitor', 'Propaganda'];

    foreach ($collectionTypes as $collectionType) {
        // Fetch pre-products for each collection type
        $preProducts = PreProducts::where('collections_type', $collectionType)->get();

        foreach ($preProducts as $preProduct) {
            $url = route('collection', [
                'collection' => strtolower($preProduct->collections_type) . '-collection', // Append '-collection' to the collection_type
                'slug' => $preProduct->product_slug
            ]);

            $sitemap->add(Url::create($url)
                ->setLastModificationDate($preProduct->updated_at) // Adjust this based on your field
                ->setPriority(0.8)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY));
        }
    }

    // Save the sitemap to a file
    $sitemap->writeToFile(public_path('sitemap.xml'));
    return 'Sitemap generated and saved to sitemap.xml';
});

Route::get('/check-email', [LoginController::class, 'checkEmail']);
Route::get('forget', [LoginController::class, 'forget'])->name('forget');
Route::get('password/reset', [ForgotPasswordController::class, 'showLinkRequestForm'])->name('password.request');
Route::post('password/email', [ForgotPasswordController::class,'sendResetLinkEmail'])->name('password.email');
Route::get('password/reset/{token}', [ResetPasswordController::class, 'showResetForm'])->name('password.reset');
Route::post('password/reset', [ResetPasswordController::class, 'reset'])->name('password.update');

Route::group(['prefix' => 'admin','middleware' => 'check.auth'], function () {
    Route::get('', [AdminController::class, 'index']);
    
    //For Preset Products
    Route::get('products/create_template/{id}', [ProductsController::class, 'create_template']);
    Route::resource('/products', ProductsController::class);
    Route::post('/products', [ProductsController::class, 'store'])->name('admin.products.store');
    Route::post('/products/update/{id}', [ProductsController::class, 'update']);
    Route::get('/products/remove/{id}', [ProductsController::class, 'destroy']);
    Route::get('products/{product}', 'ProductsController@show');

    //For Pre Design Products
    Route::get('preproducts/create_template/{id}', [PreProductsController::class, 'create_template']);
    Route::resource('/preproducts', PreProductsController::class);
    Route::post('/preproducts', [PreProductsController::class, 'store'])->name('admin.products.store');
    Route::post('/preproducts/update/{id}', [PreProductsController::class, 'update']);
    Route::get('/preproducts/remove/{id}', [PreProductsController::class, 'destroy']);
    Route::get('preproducts/{product}', 'PreProductsController@show');

    Route::get('photos/create/{id}', 'PhotoController@create');
    Route::get('/order', [AdminController::class, 'order']);
    Route::get('/customer', [AdminController::class, 'customer']);
    Route::get('/sendpayment/{amount}/{country}/{orderId}', [AdminController::class, 'sendpayment']);
    Route::get('/sendpayment2/{orderId}', [AdminController::class, 'sendpayment2']);
    Route::get('/confirm_order/{orderId}', [AdminController::class, 'confirm_order']);

    //blogs
    Route::get('blogs', [BlogsController::class, 'index']);
    Route::post('/blogs', [BlogsController::class, 'store'])->name('admin.blogs.store');
    Route::post('/blogs/update/{id}', [BlogsController::class, 'update']);
    Route::get('/blogs/remove/{id}', [BlogsController::class, 'destroy']);
    Route::get('/blogs/edit/{id}', [BlogsController::class, 'edit']);
    Route::get('blogs/{product}', [BlogsController::class, 'show']);
    Route::get('blogs/add/new', [BlogsController::class, 'create']);
    Route::get('blogs/moderate/{id}', [BlogsController::class, 'moderate']);
    Route::get('blogs/moderate/changestatus/{id}/{status}', [BlogsController::class, 'changestatus']);

    //collections
    Route::get('collection', [CollectionController::class, 'index']);
    Route::post('/collection', [CollectionController::class, 'store'])->name('admin.collection.store');
    Route::post('/collection/update/{id}', [CollectionController::class, 'update']);
    Route::get('/collection/remove/{id}', [CollectionController::class, 'destroy']);
    Route::get('/collection/edit/{id}', [CollectionController::class, 'edit']);
    Route::get('collection/{product}', [CollectionController::class, 'show']);
    Route::get('collection/add/new', [CollectionController::class, 'create']);

    //boycott
    Route::get('boycott/{collection}', [BoycottController::class, 'index']);
    Route::post('/boycott/{collection}', [BoycottController::class, 'store'])->name('admin.boycott.store');
    Route::post('/boycott/update/{id}/{collection}', [BoycottController::class, 'update']);
    Route::get('/boycott/remove/{id}/{collection}', [BoycottController::class, 'destroy']);
    Route::get('/boycott/edit/{id}/{collection}', [BoycottController::class, 'edit']);
    Route::get('boycott/{product}', [BoycottController::class, 'show']);
    Route::get('boycott/add/new/{collection}', [BoycottController::class, 'create']);
});

Route::group(['middleware' => 'check.auth'], function () {
    Route::get('/my_account', [App\Http\Controllers\HomeController::class, 'my_account'])->name('my_account');
    Route::get('/invoice/{id}', [App\Http\Controllers\HomeController::class, 'invoice'])->name('invoice');
});

Route::group(['prefix' => 'dashboard','middleware' => 'check.auth'], function () {
    //new user dashboard
    Route::get('/', [App\Http\Controllers\UserDashboardController::class, 'index'])->name('index');
    Route::get('/myaccount', [App\Http\Controllers\UserDashboardController::class, 'myaccount'])->name('myaccount');
    Route::get('/history', [App\Http\Controllers\UserDashboardController::class, 'myaccount'])->name('history');
    Route::get('/collection_orders', [App\Http\Controllers\UserDashboardController::class, 'collection_orders'])->name('collection_orders');
    Route::get('/designed_used', [App\Http\Controllers\UserDashboardController::class, 'myaccount'])->name('designed_used');
    Route::post('/updateprofile', [App\Http\Controllers\UserDashboardController::class, 'updateprofile'])->name('updateprofile');
    Route::get('/donation', [App\Http\Controllers\UserDashboardController::class, 'donation'])->name('donation');
    Route::get('/community', [App\Http\Controllers\UserDashboardController::class, 'community'])->name('community');
    Route::get('/coupon', [App\Http\Controllers\UserDashboardController::class, 'getActiveCoupons'])->name('coupon');
});

Route::group(['prefix' => 'students'], function () {
    Route::get('/all', [StudentController::class, 'index'])->name('students.all');
    Route::get('/{country}', [StudentController::class, 'show'])->name('students.show');
});

Route::post('/check_coupon', [App\Http\Controllers\PaymentController::class, 'check_coupon'])->name('check_coupon');
Route::get('/update_order_status', [App\Http\Controllers\HomeController::class, 'update_order_status'])->name('update_order_status');
Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::post('/save_review', [App\Http\Controllers\HomeController::class, 'save_review'])->name('save_review');
Route::get('/get_images', [App\Http\Controllers\HomeController::class, 'get_images'])->name('get_images');
Route::get('/updateImageNames', [App\Http\Controllers\HomeController::class, 'updateImageNames'])->name('updateImageNames');
Route::get('/updateEmptyImageColumns', [App\Http\Controllers\HomeController::class, 'updateEmptyImageColumns'])->name('updateEmptyImageColumns');

//For Collection
Route::get('/shop', [App\Http\Controllers\CollectionController::class,'collections'])->name('collections');
Route::get('/shop/{collection}', [App\Http\Controllers\CollectionController::class,'collections_list'])->name('collections_list');
Route::get('/shop-by-design', [App\Http\Controllers\CollectionController::class,'collections_list_all_design'])->name('collections_list_all_design');

Route::get('/collection/design/{collection}/{design_type}', [App\Http\Controllers\CollectionController::class,'collections_design'])->name('collections_design');

Route::get('/collection/design/type/{collection}/{design_type}/{type}', [App\Http\Controllers\CollectionController::class,'collections_design_type'])->name('collections_design_type');

Route::get('/collection/design/{collection}/{design_type}/{product_slug}', [App\Http\Controllers\CollectionController::class,'collections_design_product_detail'])->name('collections_design_product_detail');

Route::get('/collections/{collection}/{product_type}/{boycott_slug}', [App\Http\Controllers\CollectionController::class,'collections_design_boycott_slug'])->name('collections_design_boycott_slug');

//Shop By Product Type
Route::get('/shop/shop-by-product-type/{type}', [App\Http\Controllers\CollectionController::class,'shop_by_product_type_tshirts'])->name('shop_by_product_type_tshirts');
Route::get('/shop/{collection}/{slug}', [App\Http\Controllers\CollectionController::class, 'collection'])->name('collection');
Route::get('/contactus', [App\Http\Controllers\HomeController::class, 'contactus'])->name('contactus');
Route::get('/aboutus', [App\Http\Controllers\HomeController::class, 'aboutus'])->name('aboutus');
Route::get('/conflicts', [App\Http\Controllers\HomeController::class, 'conflicts'])->name('conflicts');
Route::get('/causes', [App\Http\Controllers\HomeController::class, 'causes'])->name('causes');

Route::get('/media', [App\Http\Controllers\HomeController::class, 'media'])->name('media');
Route::get('/media/explore/{collection}', [App\Http\Controllers\HomeController::class, 'media_explore'])->name('media.explore');
Route::get('/media/explore/all/{id}/{type}', [App\Http\Controllers\HomeController::class, 'media_explore_all']);

Route::get('/justice', [App\Http\Controllers\HomeController::class, 'justice'])->name('justice');
Route::get('/blogs', [App\Http\Controllers\HomeController::class, 'blog'])->name('blogs');
Route::get('/blog/{slug}', [App\Http\Controllers\HomeController::class, 'blog_detail'])->name('blog_detail');
Route::get('/products', [App\Http\Controllers\HomeController::class, 'products'])->name('products');
//Route::get('/events', [App\Http\Controllers\HomeController::class, 'events'])->name('events');
Route::get('/track_order', [App\Http\Controllers\HomeController::class, 'track_order'])->name('track_order');
Route::get('/shipping', [App\Http\Controllers\HomeController::class, 'shipping'])->name('shipping');
Route::get('/wishlist', [App\Http\Controllers\HomeController::class, 'wishlist'])->name('wishlist');
Route::get('/order_history', [App\Http\Controllers\HomeController::class, 'order_history'])->name('order_history');
Route::get('/return_order', [App\Http\Controllers\HomeController::class, 'return_order'])->name('return_order');
Route::get('/donate_now', [App\Http\Controllers\HomeController::class, 'donate_now'])->name('donate_now');
Route::get('/login', [App\Http\Controllers\HomeController::class, 'login'])->name('login');
Route::post('/contact_save', [App\Http\Controllers\HomeController::class, 'contact_save'])->name('contact_save');

Route::get('/register', [App\Http\Controllers\HomeController::class, 'register'])->name('register');
Route::get('/product_design', [App\Http\Controllers\HomeController::class, 'product_design'])->name('product_design');
Route::get('/create_product', [App\Http\Controllers\HomeController::class, 'create_product'])->name('create_product');

Route::get('/product/list/{standwith}/{productfor}/{producttype}', [App\Http\Controllers\HomeController::class, 'product_list']);
Route::get('/{standwithtype}/shop/{productfor}/{productType}/{slug}', [App\Http\Controllers\HomeController::class, 'shop'])->name('shop');

Route::get('/product/category/{category}', [App\Http\Controllers\HomeController::class, 'product_category']);
//Route::get('/country/product/{category}', [App\Http\Controllers\HomeController::class, 'country_product'])->name('country_product');

Route::post('/register', [App\Http\Controllers\UserController::class, 'register'])->name('register');
Route::get('/logout', [App\Http\Controllers\UserController::class, 'logout'])->name('logout');
Route::post('/login', [App\Http\Controllers\UserController::class, 'login'])->name('login');
Route::get('/product_slug', [App\Http\Controllers\UserController::class, 'product_slug'])->name('product_slug');
Route::post('/storeOrder', [App\Http\Controllers\UserController::class, 'storeOrder']);

Route::get('/privacy-policy', [App\Http\Controllers\HomeController::class, 'privacy_policy'])->name('privacy_policy');
Route::get('/terms-of-use', [App\Http\Controllers\HomeController::class, 'terms_of_use'])->name('terms_of_use');

Route::post(
    'stripe/webhook',
    [WebhookController::class, 'handleWebhook']
);

Route::post('/charge', [App\Http\Controllers\PaymentController::class, 'processPayment'])->name('charge');
Route::get('/create-checkout-session', [App\Http\Controllers\PaymentController::class, 'createCheckoutSession']);

Route::get('/linkstorage', function () {
    Artisan::call('storage:link');
});
