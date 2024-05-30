<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Blogs;
use App\Models\Contacts;
use App\Models\PrintfulOrder;
use App\Models\Payment;
use App\Models\BlogReview;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;

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
            ->whereIn('product_type', ['Shirts', 'Hoodies', 'Sweatshirts','Bottoms'])
            //->whereIn('supporting_country', ['Israel', 'Palestine', 'Russia', 'Ukraine'])
            ->groupBy('product_type')
            ->get();

        $accessories = Products::select('product_type', \DB::raw('MAX(id) as max_id'), \DB::raw('MAX(front_image) as max_front_image'))
            ->whereIn('product_type', ['Hats', 'Footwear', 'Bags', 'Phone Cases'])
            //->whereIn('supporting_country', ['Israel', 'Palestine', 'Russia', 'Ukraine'])
            ->groupBy('product_type')
            ->get();
        //echo "<pre>"; print_r($products); die;

        $blogs = Blogs::latest()->take(2)->get();
        foreach($blogs as $blog){
            $blog->feature_image = fileToUrl($blog->feature_image);
            $blog->blog_image = fileToUrl($blog->blog_image);
        }

        return view('frontend.pages.home')->with('products', $products)->with('accessories', $accessories)->with('blogs', $blogs);
    }

    public function contactus()
    {
        return view('frontend.pages.contactus');
    }

    public function aboutus()
    {
        $metaDescription = 'As a progressive clothing brand excelling in activist streetwear clothing and political fashion, we champion fashion activism and offer social justice apparel.';
        $keywords = 'activist streetwear clothing, political fashion, fashion activism, social justice apparel, progressive clothing brand';
        $pageTitle = 'Fashion with a Cause - Activist Streetwear Clothing Brand';

        return view('frontend.pages.aboutus')->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords);;
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
        $blogs = Blogs::all();
        foreach($blogs as $blog){
            $blog->feature_image = fileToUrl($blog->feature_image);
            $blog->blog_image = fileToUrl($blog->blog_image);
        }

        return view('frontend.pages.blog')->with('blogs',$blogs);
    }

    public function blog_detail(Request $request)
    {
        $slug = $request->slug;
        $blog = Blogs::where('slug',$slug)->first();
        $blog->feature_image = fileToUrl($blog->feature_image);
        $blog->blog_image = fileToUrl($blog->blog_image);

        $reviews = BlogReview::where('blog_id',$blog->id)->where('status',1)->get();
        //echo "<pre>"; print_r($blog); die;
        return view('frontend.layout.blogtemplate')->with('blog',$blog)->with('reviews',$reviews);
    }

    public function justice()
    {
        $metaDescription = 'Join the movement for justice by shopping the Advocacy Fashion Collection to eject corrupt politicians, hold institutions accountable, and combat propaganda.';
        $keywords = 'fashion activism, advocacy clothing, justice apparel, activist fashion';
        $pageTitle = 'Advocate for Justice Through Fashion - Urban Style Advocacy';

        return view('frontend.pages.justice')->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords);
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

    public function privacy_policy(Request $request){
        return view('frontend.pages.privacy_policy');
    }

    public function terms_of_use(Request $request){
        return view('frontend.pages.terms_of_use');
    }

    public function my_account()
    {
        if (auth()->user()->email == 'admin@gmail.com') {
            return redirect('admin');
        } else {
            $email = auth()->user()->email;
            $orders = PrintfulOrder::join('users', 'users.email', '=', 'printful_orders.customer_email')->join('products', 'products.id', '=', 'printful_orders.product_id')->join('payments', 'payments.id', '=', 'printful_orders.payment_id')->select('products.*','printful_order_data','payment_intent_id','payments.amount as amt','products.supporting_country','products.product_for','products.product_type','printful_orders.total_amount','printful_orders.product_price','printful_orders.id','printful_order_status')->where('printful_orders.customer_email',$email)->orderBy('printful_orders.id','desc')->paginate(5);

            return view('frontend.pages.my_account')->with('activeLink', 'orders')->with('orders', $orders);
        }
    }

    public function invoice(Request $request, $id){
        $order = PrintfulOrder::where('id',$id)->first();
        $data = json_decode($order->printful_order_data, true);
        $payment = \DB::table('payments')->where('id',$order->payment_id)->first();

        return view('frontend.pages.invoice', ['data' => $data,'payment' => $payment]);
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

    public function shop(Request $request, $slug, $product_for)
    {   
        $product = Products::where('product_slug', $request->slug)->where('product_for', ucfirst($product_for))->first();
        $product->front_image = fileToUrl($product->front_image);
        $product->back_image = fileToUrl($product->back_image);
        $product->left_image = fileToUrl($product->left_image);
        $product->right_image = fileToUrl($product->right_image);

        //echo "<pre>"; print_r(file_exists($product->front_image)); die;

        if (!auth()->check()) {
            //return redirect()->route('login')->with('message', 'Please login to access this page.');
        }

        return view('frontend.pages.create_product')->with('product', $product);
    }

    public function contact_save(Request $request){
        // Save the contact data to the database
        $contact = Contacts::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'phone' => $request->phone,
            'email' => $request->email,
            'message' => $request->message,
        ]);

        Mail::to($request->email)->send(new ContactMail($contact));

         // Set a flash message
         $request->session()->flash('success', 'Your message has been sent successfully!');

         // Redirect back to the contact form (or any other page)
         return redirect()->back();
    }

    public function update_order_status(){        
        $orders = PrintfulOrder::get();
        //echo "<pre>"; print_r($orders); die;

        if($orders){
            foreach($orders as $order){
                
                $data = json_decode($order->printful_order_data, true);

                if(isset($data['id'])){
                    $curl = curl_init();
                    curl_setopt_array(
                    $curl,
                    array(
                        CURLOPT_URL => 'https://api.printful.com/orders/' . $data['id'],
                        CURLOPT_RETURNTRANSFER => true,
                        CURLOPT_ENCODING => '',
                        CURLOPT_MAXREDIRS => 10,
                        CURLOPT_TIMEOUT => 0,
                        CURLOPT_FOLLOWLOCATION => true,
                        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                        CURLOPT_CUSTOMREQUEST => 'GET',
                        CURLOPT_HTTPHEADER => array(
                                'X-PF-Store-Id: 12631976',
                                'Content-Type: application/json',
                                'Accept: application/json',
                                'Authorization: Bearer te6lqpl4ju9anm3y0TWtWTLaAVDiQz6ddtAspwJc',
                                'Cookie: __cf_bm=b_KF_QLD5hwAjdrI5D..II41J0suVQ6rDItqE3fGpiU-1700675108-0-AWJ8qrjc2rORqrGTIYe7pXKj/XaMG6zJ3iQM8WjXiDaVgUvKW48NY6wf3+kjlL/tafcmaYGux6DA4EnogAZEYC8=; dsr_setting=%7B%22region%22%3A1%2C%22requirement%22%3Anull%7D'
                        ),
                    )
                    );

                    $response = curl_exec($curl);

                    curl_close($curl);
                    $info = json_decode($response, true);
                    $order_status = $info['result']['status'];
                    PrintfulOrder::where('id',$order->id)->update(['print_order_status'=>$order_status]);
                }
            }
        }
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
        $products = Products::select('supporting_country', \DB::raw('MAX(id) as max_id'), \DB::raw('MAX(front_image) as max_front_image'), \DB::raw('MAX(product_type) as product_type'), \DB::raw('MAX(supporting_country) as supporting_country'), \DB::raw('MAX(website_product_name) as website_product_name'), \DB::raw('MAX(product_name) as product_name'), \DB::raw('MAX(product_slug) as product_slug'), \DB::raw('MAX(product_price) as product_price'), \DB::raw('MAX(commission) as commission'))
            ->where('product_type', $producttype)
            ->whereIn('supporting_country', ['Israel', 'Palestine', 'Russia', 'Ukraine'])
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

    public function save_review(Request $request){
        //echo "<pre>"; print_r($request->all());
        try{
            $rec = new BlogReview;
            if (auth()->check()) {
                $rec->user_id = auth()->user()->id;
            }

            $rec->rate = $request->stars;
            $rec->blog_id = $request->blog_id;
            $rec->review = $request->review;
            $rec->name = $request->name;
            $rec->email = $request->email;
            $rec->save();

            return redirect()->back()->with('success', 'Your review submitted successfully');   
        }catch(\Exception $e){
            return redirect()->back()->with('success', $e->getMessage()); 
        }
    }
}
