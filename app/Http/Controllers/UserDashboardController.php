<?php
namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Auth;
use App\Models\PrintfulOrder;


class UserDashboardController extends Controller
{
	public function index(Request $request)
    {
        return view('frontend.userdashboard.index');
    }

    public function community(Request $request){
        $users = PrintfulOrder::join('users','users.id','=','printful_orders.user_id')->select('users.*')->where('printful_orders..predesign_order','yes')->paginate(5);

        //echo "<pre>"; print_r($users); die;
        return view('frontend.userdashboard.community')->with('users', $users);
    }

    public function myaccount(Request $request)
    {
        $id = auth()->user()->id;
        $email = auth()->user()->email;

        $orders = PrintfulOrder::join('users', 'users.email', '=', 'printful_orders.customer_email')->join('products', 'products.id', '=', 'printful_orders.product_id')->join('payments', 'payments.id', '=', 'printful_orders.payment_id')->select('products.*','printful_order_data','payment_intent_id','payments.amount as amt','products.supporting_country','products.product_for','products.product_type','printful_orders.total_amount','printful_orders.product_price','printful_orders.id','print_order_status')->where('printful_orders.user_id',$id)->orwhere('printful_orders.customer_email', $email)->orderBy('printful_orders.created_at','desc')->paginate(7);

        if($orders->count()==0){
            //$email = auth()->user()->email;
            //$orders = PrintfulOrder::join('users', 'users.email', '=', 'printful_orders.customer_email')->join('products', 'products.id', '=', 'printful_orders.product_id')->join('payments', 'payments.id', '=', 'printful_orders.payment_id')->select('products.*','printful_order_data','payment_intent_id','payments.amount as amt','products.supporting_country','products.product_for','products.product_type','printful_orders.total_amount','printful_orders.product_price','printful_orders.id','print_order_status')->where('printful_orders.customer_email',$email)->orderBy('printful_orders.created_at','desc')->paginate(7);
        }

        return view('frontend.userdashboard.myaccount')->with('orders',$orders);
    }

    public function donation(Request $request)
    {
        $id = auth()->user()->id;
        $email = auth()->user()->email;

        $orders = PrintfulOrder::join('users', 'users.email', '=', 'printful_orders.customer_email')->join('products', 'products.id', '=', 'printful_orders.product_id')->join('payments', 'payments.id', '=', 'printful_orders.payment_id')->select('products.*','printful_order_data','payment_intent_id','payments.amount as amt','products.supporting_country','products.product_for','products.product_type','printful_orders.total_amount','printful_orders.product_price','printful_orders.id','print_order_status')->where('printful_orders.user_id',$id)->orwhere('printful_orders.customer_email', $email)->orderBy('printful_orders.created_at','desc')->paginate(7);

        if($orders->count()==0){
            
            //$orders = PrintfulOrder::join('users', 'users.email', '=', 'printful_orders.customer_email')->join('products', 'products.id', '=', 'printful_orders.product_id')->join('payments', 'payments.id', '=', 'printful_orders.payment_id')->select('products.*','printful_order_data','payment_intent_id','payments.amount as amt','products.supporting_country','products.product_for','products.product_type','printful_orders.total_amount','printful_orders.product_price','printful_orders.id','print_order_status')->where('printful_orders.customer_email',$email)->orderBy('printful_orders.created_at','desc')->paginate(7);
        }

        return view('frontend.userdashboard.donation')->with('orders',$orders);
    }

    public function updateprofile(Request $request){
        $user = Auth::user();
        //echo "<pre>"; print_r($request->all()); die;

        // Validate the request
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8',
            'facebook' => 'nullable|url',
            'instagram' => 'nullable|url',
            'tiktok' => 'nullable|url',
            'youtube' => 'nullable|url',
            'profile_image' => 'nullable'
        ]);

        // Update the user
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->facebook = $request->facebook;
        $user->instagram = $request->instagram;
        $user->tiktok = $request->tiktok;
        $user->youtube = $request->youtube;

        // Handle the profile image upload
        if ($request->hasFile('profile_image')) {
            $image = $request->file('profile_image');
            $imageName = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('images/profile'), $imageName);
            $user->profile_image = $imageName;
        }

        $user->save();
        return redirect()->route('index')->with('success', 'Profile updated successfully.');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        // Redirect to home or login page after logout
        return redirect()->route('login');
    }

    public function product_slug(){
        // Retrieve all products
        $products = Products::all();

        // Array to keep track of existing slugs
        $existingSlugs = [];

        // Iterate through products
        foreach ($products as $product) {
            $originalSlug = $product->product_slug;
            $newSlug = $originalSlug;

            // Ensure uniqueness by appending a number if needed
            $counter = 1;
            while (in_array($newSlug, $existingSlugs)) {
                $newSlug = $originalSlug . '-' . $counter;
                $counter++;
            }

            // Update the product's slug and save changes
            $product->product_slug = $newSlug;
            $product->save();

            // Add the new slug to the existing slugs array
            $existingSlugs[] = $newSlug;
            
            // You might want to avoid duplicate slugs in the same batch:
            // $existingSlugs[] = $product->product_slug;
            
            // Or consider validating uniqueness of $existingSlugs before adding
            // $existingSlugs[] = $newSlug;
        }

        // Display the updated products
        foreach ($products as $product) {
            echo "Product Name: {$product->name} - Updated Slug: {$product->product_slug}\n";
        }
    }
    public function storeOrder(Request $request)
    {
        try {
            $predesign_order = 'no';
            $collection = '';
            $donation = 0;

            if(isset($request->predesign_order) && $request->predesign_order!=""){
                $predesign_order = $request->predesign_order;
                $collection = $request->collection;
                $donation = 10;
            }

            $_request = json_decode($request->getContent());
            $order = new PrintfulOrder();
            $order->printful_order_data = $_request->printful_order_data;
            $order->product_id = $_request->product_id;
            $order->payment_id = $_request->payment_id;
            $order->predesign_order = $predesign_order;
            $order->collection = $collection;
            $order->donation_amount = $donation;
            $order->total_amount = $request->total;
            $order->product_price = $request->product_price;
            $order->printful_order_id = json_decode($_request->printful_order_data,true)['id'];
            $order->customer_email = json_decode($_request->printful_order_data,true)['recipient']['email'];

            if (auth()->check()) {
                $order->user_id = auth()->user()->id;
            }

            $order->save();
            return response($order)
                ->header('Content-Type', 'text/json');
        } catch (\Exception $e) {
            // Handling the exception
            return response()->json([
                'error' => [
                    'message' => $e->getMessage(), // Retrieve the error message
                    'code' => $e->getCode(), // Retrieve the error code
                ]
            ], 500); // Internal Server Error status code
        }
    }
}
