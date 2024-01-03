<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Payment;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $products = Products::select('product_type', \DB::raw('MAX(id) as max_id'), \DB::raw('MAX(front_image) as max_front_image'))
            ->whereIn('product_type', ['Shirts', 'Hoodies', 'Sweatshirts', 'Hoodies'])
            ->groupBy('product_type')
            ->get();

        $accessories = Products::select('product_type', \DB::raw('MAX(id) as max_id'), \DB::raw('MAX(front_image) as max_front_image'))
            ->whereIn('product_type', ['Hat', 'Headwear', 'Footwear', 'Bags', 'Phone Cases'])
            ->groupBy('product_type')
            ->get();
        //echo "<pre>"; print_r($products); die;

        return view('frontend.pages.home')->with('products', $products)->with('accessories', $accessories);
    }

    public function contactus()
    {
        return view('frontend.pages.contactus');
    }

    public function aboutus()
    {
        return view('frontend.pages.aboutus');
    }

    public function conflicts()
    {
        return view('frontend.pages.conflicts');
    }

    public function causes()
    {
        return view('frontend.pages.causes');
    }

    public function shop2()
    {
        return view('frontend.pages.shop');
    }

    public function media()
    {
        return view('frontend.pages.media');
    }

    public function blog()
    {
        return view('frontend.pages.blog');
    }

    public function blog_detail()
    {
        return view('frontend.pages.blog_detail');
    }

    public function justice()
    {
        return view('frontend.pages.justice');
    }

    public function products()
    {
        return view('frontend.pages.products');
    }

    public function events()
    {
        return view('frontend.pages.events');
    }

    public function track_order()
    {
        return view('frontend.pages.track_order');
    }

    public function shipping()
    {
        return view('frontend.pages.shipping');
    }

    public function wishlist()
    {
        return view('frontend.pages.wishlist');
    }

    public function my_account()
    {
        if (auth()->user()->email == 'admin@gmail.com') {
            return redirect('admin');
        } else {
            $orders = Payment::join('users', 'users.id', '=', 'payments.user_id')->select('payments.*', 'users.name')->paginate(5);
            return view('frontend.pages.my_account')->with('activeLink', 'orders')->with('orders', $orders);
        }
    }

    public function order_history()
    {
        return view('frontend.pages.order_history');
    }

    public function return_order()
    {
        return view('frontend.pages.return_order');
    }

    public function donate_now()
    {
        return view('frontend.pages.donate_now');
    }

    public function login()
    {
        return view('frontend.pages.login');
    }

    public function register()
    {
        return view('frontend.pages.register');
    }

    public function product_design()
    {
        return view('frontend.pages.product_design');
    }

    public function create_product()
    {
        return view('frontend.pages.create_product');
    }

    public function shop(Request $request, $slug)
    {
        $product = Products::where('product_slug', $request->slug)->first();
        $product->front_image = fileToUrl($product->front_image);
        $product->back_image = fileToUrl($product->back_image);
        $product->left_image = fileToUrl($product->left_image);
        $product->right_image = fileToUrl($product->right_image);

        //echo "<pre>"; print_r(file_exists($product->front_image)); die;

        if (!auth()->check()) {
            return redirect()->route('login')->with('message', 'Please login to access this page.');
        }

        return view('frontend.pages.create_product')->with('product', $product);
    }

    public function product_list(Request $request, $standwith, $productfor, $producttype)
    {
        //echo "<pre>"; print_r(explode('-',$standwith)[2]); die;
        $standwith = @ucfirst(explode('-', $standwith)[2]);
        $productfor = @ucfirst($productfor);
        $producttype = @ucfirst($producttype);

        //echo $producttype; die;
        $products = Products::where(['supporting_country' => $standwith, 'product_for' => $producttype, 'product_type' => $productfor])->get();
        return view('frontend.pages.product_list')->with('products', $products);
    }

    public function product_category(Request $request, $category)
    {
        $producttype = @ucfirst($category);
        $products = Products::where('product_type', 'LIKE', '%' . $producttype . '%')->get();
        //echo "<pre>"; print_r($products); die;
        return view('frontend.pages.product_list')->with('products', $products);
    }

    public function country_product (Request $request, $category){
        $producttype = @ucfirst($category);
        $products = Products::select('supporting_country', \DB::raw('MAX(id) as max_id'), \DB::raw('MAX(front_image) as max_front_image'), \DB::raw('MAX(product_type) as product_type'), \DB::raw('MAX(supporting_country) as supporting_country'))
            ->where('product_type', $producttype)
            ->groupBy('supporting_country')
            ->get();
        //echo "<pre>"; print_r($products); die;
        return view('frontend.pages.supporting_list')->with('products', $products);
    }

    public function updateEmptyImageColumns()
    {
        // Find all products where any image column contains 'public/images/images'
        $products = Products::where('product_description', 'test desc')->get();

        foreach ($products as $product) {
            $product->product_description = '';
            $product->save();
        }
    }

    public function updateImageNames()
    {
        $products = Products::all();

        foreach ($products as $product) {
            $imageColumns = ['front_image', 'back_image', 'right_image', 'left_image'];

            foreach ($imageColumns as $column) {
                $imageUrl = $product->{$column};

                // Extract filename without query string
                $filenameWithQuery = basename(parse_url($imageUrl, PHP_URL_PATH));
                $filenameWithoutQuery = strtok($filenameWithQuery, '?');

                // Check if the image file exists in the storage directory
                $currentImagePath = $imageUrl;
                if (Storage::exists($currentImagePath)) {
                    // Generate the new path without the query string
                    $newImagePath = 'public/images/' . $filenameWithoutQuery;

                    // Check if the new filename already exists
                    if (!Storage::exists($newImagePath)) {
                        // Rename the file in storage
                        Storage::move($currentImagePath, $newImagePath);

                        // Update the database entry with the new filename
                        $product->{$column} = $newImagePath;
                        $product->save();
                    }
                }
            }
        }
    }

    public function get_images(Request $request)
    {
        // Fetch products from the database
        $products = Products::get();

        foreach ($products as $product) {
            $imageColumns = ['front_image', 'back_image', 'right_image', 'left_image'];

            foreach ($imageColumns as $column) {
                $imageUrl = $product->{$column};

                // Check if URL starts with a specific prefix
                if (strpos($imageUrl, 'https://files.cdn.printful.com/') === 0) {
                    $image = Http::get($imageUrl);
                    if ($image->successful()) {
                        $img = explode('?', $imageUrl)[0];
                        $imagePath = 'public/images/' . basename($img);
                        Storage::put($imagePath, $img);

                        // Update the column in the database with the new image path
                        $product->{$column} = $imagePath;
                        $product->save();
                    }
                }
            }
        }
    }
}
