<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Blogs;
use App\Models\Collections;
use App\Models\Contacts;
use App\Models\PrintfulOrder;
use App\Models\Payment;
use App\Models\BlogReview;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;
use Illuminate\Support\Facades\Redirect;

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
            ->whereIn('product_type', ['no need to display'])
            //->whereIn('product_type', ['Shirts', 'Hoodies', 'Sweatshirts','Bottoms'])
            //->whereIn('supporting_country', ['Israel', 'Palestine', 'Russia', 'Ukraine'])
            ->groupBy('product_type')
            ->get();

        $accessories = Products::select('product_type', \DB::raw('MAX(id) as max_id'), \DB::raw('MAX(front_image) as max_front_image'))
            ->whereIn('product_type', ['no need to display'])
            //->whereIn('product_type', ['Hats', 'Footwear', 'Bags', 'Phone Cases'])
            //->whereIn('supporting_country', ['Israel', 'Palestine', 'Russia', 'Ukraine'])
            ->groupBy('product_type')
            ->get();
        //echo "<pre>"; print_r($products); die;

        $blogs = Blogs::latest()->take(2)->get();
        foreach($blogs as $blog){
            $blog->feature_image = fileToUrl($blog->feature_image);
            $blog->blog_image = fileToUrl($blog->blog_image);
        }

        $metaDescription = 'The definitive streetwear brand for activists to advocate, protest, and stand for a cause; join Cause Stand to make a statement with fashion activism.';
        $keywords = 'streetwear brand, stand for a cause, fashion activism, cause stand';
        $pageTitle = 'Welcome to Cause Stand - Where Fashion Meets Activism';
        $metaTitle = 'Cause Stand - Streetwear Brand for Activists - Fashion Activism';
        $collections = Collections::all();

        return view('frontend.pages.home')->with('products', $products)->with('accessories', $accessories)->with('blogs', $blogs)->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords)->with('metaTitle' , $metaTitle)->with('collections' , $collections);
    }

    public function contactus()
    {
        $metaDescription = 'Get in touch with Cause Stand for support, inquiries, or feedback. We are here to assist you with your orders, advocacy, and account management.';
        $keywords = 'cause stand';
        $pageTitle = 'Get in touch with Cause Stand for support';
        $metaTitle = 'Contact Us - Reach Out to Cause Stand for Support and Inquiries';
        
        return view('frontend.pages.contactus')->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords)->with('metaTitle' , $metaTitle);
    }

    public function aboutus()
    {
        $metaDescription = 'As a progressive clothing brand excelling in activist streetwear clothing and political fashion, we champion fashion activism and offer social justice apparel.';
        $keywords = 'activist streetwear clothing, political fashion, fashion activism, social justice apparel, progressive clothing brand';
        $pageTitle = 'Fashion with a Cause - Activist Streetwear Clothing Brand';

        return view('frontend.pages.aboutus')->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords);
    }

    public function conflicts()
    {
        $metaDescription = 'Notice Cause Stand`s insights on global conflicts, see how fashion activism highlights issues, promotes justice, and enlightens others about current atrocities.';
        $keywords = 'fashion activism, advocacy clothing, global conflicts, political crises, social justice clothing, awareness fashion, activism apparel';
        $pageTitle = 'Fashion Activism and Global Conflicts - Advocate with Cause Stand';
        $metaTitle = 'Cause Stand: Fashion Activism and Global Conflicts';

        return view('frontend.pages.conflicts')->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords)->with('metaTitle' , $metaTitle);
    }

    public function causes()
    {
        $metaDescription = 'Stand up for crucial causes with Cause Stand`s advocacy platform; wear the transformative power of fashion activism to promote change and bring justice.';
        $keywords = 'advocacy causes, global causes, support movements, Cause Stand, political activism';
        $pageTitle = 'Causes that Need You - Advocate with Apparel & Accessories';
        $metaTitle = 'Advocacy Causes - Stand Up for Something, Don`t Stand By';

        return view('frontend.pages.causes')->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords)->with('metaTitle' , $metaTitle);
    }

    public function media()
    {
        $metaDescription = 'Join the Cause Stand community of activists to challenge U.S. policies, expose corruption, advocate for justice, and print your voice on clothing.';
        $keywords = 'activist community, U.S. policy change, advocacy apparel, expose corruption, social justice, open source media sharing platform';
        $pageTitle = 'Activist Community Feeds - Empowered Political Justice Merch';
        $metaTitle = 'Clothing Media Sharing Platform for Political Justice - Cause Stand';
        $collections = Collections::all();

        return view('frontend.pages.media')->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords)->with('metaTitle' , $metaTitle)->with('collections' , $collections);
    }

    public function userdashboard()
    {
        $metaDescription = 'Join the Cause Stand community of activists to challenge U.S. policies, expose corruption, advocate for justice, and print your voice on clothing.';
        $keywords = 'activist community, U.S. policy change, advocacy apparel, expose corruption, social justice, open source media sharing platform';
        $pageTitle = 'Activist Community Feeds - Empowered Political Justice Merch';
        $metaTitle = 'Clothing Media Sharing Platform for Political Justice - Cause Stand';

        
        return view('frontend.pages.userdashboard')->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords)->with('metaTitle' , $metaTitle);
    }

    public function media_explore(Request $request)
    {
        $metaDescription = 'Join the Cause Stand community of activists to challenge U.S. policies, expose corruption, advocate for justice, and print your voice on clothing.';
        $keywords = 'activist community, U.S. policy change, advocacy apparel, expose corruption, social justice, open source media sharing platform';
        $pageTitle = 'Activist Community Feeds - Empowered Political Justice Merch';
        $metaTitle = 'Clothing Media Sharing Platform for Political Justice - Cause Stand';

        $collection = Collections::where('slug', $request->collection)->first();
        $donation = PrintfulOrder::where('predesign_order','yes')->where('printful_orders.collection',$collection->id)->sum('donation_amount');
        $total_member = PrintfulOrder::where('predesign_order','yes')->where('printful_orders.collection',$collection->id)->count();

        $users = PrintfulOrder::join('users','users.id','=','printful_orders.user_id')->select('users.*')->where('printful_orders.predesign_order','yes')->where('printful_orders.collection',$collection->id)->limit(5)->get();

        $orders = PrintfulOrder::join('users', 'users.email', '=', 'printful_orders.customer_email')->join('products', 'products.id', '=', 'printful_orders.product_id')->join('payments', 'payments.id', '=', 'printful_orders.payment_id')->select('products.*','printful_order_data','payment_intent_id','payments.amount as amt','products.supporting_country','products.product_for','products.product_type','printful_orders.total_amount','printful_orders.product_price','printful_orders.id','print_order_status')->where('printful_orders.collection',$collection->id)->orderBy('printful_orders.created_at','desc')->limit(5)->get();

        //print_r($users); die;
        return view('frontend.pages.media_explore')->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords)->with('metaTitle' , $metaTitle)->with('collection' , $collection)->with('donation' , $donation)->with('total_member' , $total_member)->with('users' , $users)->with('orders' , $orders);
    } 
    
    public function media_explore_all(Request $request,$id, $type)
    {
        $metaDescription = 'Join the Cause Stand community of activists to challenge U.S. policies, expose corruption, advocate for justice, and print your voice on clothing.';
        $keywords = 'activist community, U.S. policy change, advocacy apparel, expose corruption, social justice, open source media sharing platform';
        $pageTitle = 'Activist Community Feeds - Empowered Political Justice Merch';
        $metaTitle = 'Clothing Media Sharing Platform for Political Justice - Cause Stand';

        $collection = Collections::where('id', $id)->first();
        $donation = PrintfulOrder::where('predesign_order','yes')->where('printful_orders.collection',$collection->id)->sum('donation_amount');
        $total_member = PrintfulOrder::where('predesign_order','yes')->where('printful_orders.collection',$collection->id)->count();

        $users = PrintfulOrder::join('users','users.id','=','printful_orders.user_id')->select('users.*')->where('printful_orders.predesign_order','yes')->where('printful_orders.collection',$collection->id)->get();

        $orders = PrintfulOrder::join('users', 'users.email', '=', 'printful_orders.customer_email')->join('products', 'products.id', '=', 'printful_orders.product_id')->join('payments', 'payments.id', '=', 'printful_orders.payment_id')->select('products.*','printful_order_data','payment_intent_id','payments.amount as amt','products.supporting_country','products.product_for','products.product_type','printful_orders.total_amount','printful_orders.product_price','printful_orders.id','print_order_status')->where('printful_orders.collection',$collection->id)->orderBy('printful_orders.created_at','desc')->get();

        //print_r($users); die;
        return view('frontend.pages.media_explore_all')->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords)->with('metaTitle' , $metaTitle)->with('collection' , $collection)->with('donation' , $donation)->with('total_member' , $total_member)->with('users' , $users)->with('orders' , $orders)->with('type' , $type);
    } 

    public function blog()
    {
        $blogs = Blogs::all();
        foreach($blogs as $blog){
            $blog->feature_image = fileToUrl($blog->feature_image);
            $blog->blog_image = fileToUrl($blog->blog_image);
        }

        $metaDescription = 'Analyze compelling perspectives on global conflicts and political strategies; learn, seek change, and stand up to advocate with Cause Stand`s insightful reads.';
        $keywords = 'global issues, political ideologies, advocacy movements, Cause Stand blog, political bigotry, historical animosities';
        $pageTitle = 'Political Insights and Causes for Advocacy - Cause Stand Blog';
        $metaTitle = 'Insights and Advocacy - Explore Global Issues with Cause Stand';

        return view('frontend.pages.blog')->with('blogs',$blogs)->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords)->with('metaTitle' , $metaTitle);
    }

    public function blog_detail(Request $request)
    {
        $slug = $request->slug;
        $blog = Blogs::where('slug',$slug)->first();
        $blog->feature_image = fileToUrl($blog->feature_image);
        $blog->blog_image = fileToUrl($blog->blog_image);

        $reviews = BlogReview::where('blog_id',$blog->id)->where('status',1)->get();
        //echo "<pre>"; print_r($blog->page_title); die;
        return view('frontend.layout.blogtemplate')->with('blog',$blog)->with('reviews',$reviews)->with('pageTitle' , $blog->page_title);
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
        $metaDescription = 'Easily track your Cause Stand order with our real-time tracking tool. Enter your order number and email to check the status and expected delivery date.';
        $keywords = 'track order, order status, Cause Stand tracking, order tracking tool, check order status, order tracking info';
        $pageTitle = 'Track Your Order - Cause Stand';
        $metaTitle = 'Track Your Cause Stand Order - Real-Time Order Tracking';

        return view('frontend.pages.track_order')->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords);
    }

    public function shipping()
    {
        $metaDescription = "Discover Cause Stand&rsquo;s shipping options, delivery times, and costs. We offer fast and reliable shipping to all 50 states with clear and transparent policies.";
        $keywords = 'shipping information, Cause Stand shipping, delivery options, shipping costs, fast delivery, reliable shipping';
        $pageTitle = 'Shipping Information - Cause Stand';
        $metaTitle = 'Cause Stand Shipping - Fast and Reliable Delivery Options';

        return view('frontend.pages.shipping')->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords);
    }

    public function wishlist()
    {
        return view('frontend.pages.wishlist');
    }

    public function privacy_policy(Request $request){
        return view('frontend.pages.privacy_policy');
    }

    public function terms_of_use(Request $request){
        $metaDescription = "Usage of Cause Stand’s website requires adherence to terms and policies that hold user privacy and safety at the helm of every transaction, so proceed by accepting the terms.   ";
        $keywords = 'Website policies, cause stand website terms';
        $pageTitle = 'Terms and conditions of Cause Stand’s Website usage';
        $metaTitle = 'Cause Stand Website Terms of Use';

        return view('frontend.pages.terms_of_use')->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords);
    }

    public function my_account()
    {
        if (auth()->user()->email == 'admin@gmail.com') {
            return redirect('admin');
        } else {
            

            $id = auth()->user()->id;
            $orders = PrintfulOrder::join('users', 'users.email', '=', 'printful_orders.customer_email')->join('products', 'products.id', '=', 'printful_orders.product_id')->join('payments', 'payments.id', '=', 'printful_orders.payment_id')->select('products.*','printful_order_data','payment_intent_id','payments.amount as amt','products.supporting_country','products.product_for','products.product_type','printful_orders.total_amount','printful_orders.product_price','printful_orders.id','print_order_status')->where('printful_orders.user_id',$id)->orderBy('printful_orders.created_at','desc')->paginate(7);

            if($orders->count()==0){
                $email = auth()->user()->email;
                $orders = PrintfulOrder::join('users', 'users.email', '=', 'printful_orders.customer_email')->join('products', 'products.id', '=', 'printful_orders.product_id')->join('payments', 'payments.id', '=', 'printful_orders.payment_id')->select('products.*','printful_order_data','payment_intent_id','payments.amount as amt','products.supporting_country','products.product_for','products.product_type','printful_orders.total_amount','printful_orders.product_price','printful_orders.id','print_order_status')->where('printful_orders.customer_email',$email)->orderBy('printful_orders.created_at','desc')->paginate(7);
            }

            return view('frontend.pages.my_account')->with('activeLink', 'orders')->with('orders', $orders);
        }
    }

    public function invoice(Request $request, $id){
        $order = PrintfulOrder::where('id',$id)->first();
        $data = json_decode($order->printful_order_data, true);
        //echo "<pre>"; print_r($data); die;

        $payment = \DB::table('payments')->where('id',$order->payment_id)->first();
        //echo "<pre>"; print_r($payment); die;
        return view('frontend.pages.invoice', ['data' => $data,'payment' => $payment,'order' => $order]);
    }

    public function order_history()
    {
        return view('frontend.pages.order_history');
    }

    public function return_order()
    {
        $metaDescription = 'Easily return items within 30 days with our streamlined process. Log in to start your return and get support from our team.';
        $keywords = 'Cause Stand returns, return items online, easy returns';
        $pageTitle = 'Easy Order Returns for Cause Stand Advocates';
        $metaTitle = 'Hassle-Free Order Returns - Cause Stand';

        return view('frontend.pages.return_order')->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords);
    }

    public function donate_now()
    {
        return view('frontend.pages.donate_now');
    }

    public function login()
    {
        $pageTitle = 'Login to Advocate to - Shop to Subscribe to Cause Stand';
        $keywords = 'Cause Stand registration, join Cause Stand, join a cause';
        $metaTitle = 'Login to Your Cause Stand Account - Advocate and Access Your Dashboard';
        $metaDescription = 'Log in to your Cause Stand account to advocate for global causes, access your dashboard, and manage your orders. Log in to your advocacy hub now.';

        return view('frontend.pages.login')
                ->with('pageTitle', $pageTitle)
                ->with('metaTitle', $metaTitle)
                ->with('keywords', $keywords)
                ->with('metaDescription', $metaDescription);
    }

    public function register()
    {
        $pageTitle = 'Shop to Join, Advocate, and Donate to a Cause';
        $metaTitle = 'Join Cause Stand - Advocate for a Cause with Every Purchase';
        $keywords = 'Cause Stand registration, join Cause Stand, join a cause';
        $metaDescription = 'Become a member with a cause, by making your first purchase, and gain access to your personalized user dashboard to manage orders and track donations.';

        return view('frontend.pages.register')
                ->with('pageTitle', $pageTitle)
                ->with('metaDescription', $metaDescription)
                ->with('keywords', $keywords)
                ->with('metaTitle', $metaTitle);
    }

    public function product_design()
    {
        return view('frontend.pages.product_design');
    }

    public function create_product()
    {
        return view('frontend.pages.create_product');
    }

    public function shop(Request $request, $standwithtype, $productfor, $productType, $slug)
    {           
        $country = explode('-',$standwithtype)[2];
        $product = Products::where('product_slug', $slug)->where('product_for', ucfirst($productfor))->where('product_type', ucfirst($productType))->where('supporting_country', ucfirst($country))->first();

        $product->front_image = fileToUrl($product->front_image);
        $product->back_image = fileToUrl($product->back_image);
        $product->left_image = fileToUrl($product->left_image);
        $product->right_image = fileToUrl($product->right_image);

        //echo "<pre>"; print_r(file_exists($product->front_image)); die;

        if (!auth()->check()) {
            //return redirect()->route('login')->with('message', 'Please login to access this page.');
        }

        //echo "<pre>"; print_r($product);

        $commissionAmount = $product->product_price * ($product->commission / 100);
        $product->product_price = $product->product_price + $commissionAmount;

        $coupon = Storage::get('coupon_code') ? Storage::get('coupon_code') : '';
        Storage::delete('coupon_code','');
        return view('frontend.pages.create_product')->with('product', $product)->with('coupon', $coupon);
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
        $product = Products::where(['supporting_country' => $standwith, 'product_for' => $producttype, 'product_type' => $productfor])->limit(1)->first();

        //echo "<pre>"; print_r($product); die;

        $url = url('/').'/stand-with-'.strtolower($product->supporting_country).'/shop/'.strtolower($product->product_for).'/'.strtolower($product->product_type).'/'.$product->product_slug;
        return Redirect::to($url);
        //return view('frontend.pages.product_list')->with('products', $products);
    }


    public function product_list2(Request $request, $standwith, $productfor, $producttype)
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