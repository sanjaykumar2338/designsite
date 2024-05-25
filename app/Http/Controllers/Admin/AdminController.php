<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\PrintfulOrder;
use App\Models\Payment;
class AdminController extends Controller{
    
    public function __construct()
    {
        //$this->middleware('auth');
    }

    public function index(Request $request){
        return view('admin.pages.dashboard')->with('activeLink','dashboard');
    }

    public function order(){
       
            $email = auth()->user()->email;
            $orders = PrintfulOrder::join('users', 'users.email', '=', 'printful_orders.customer_email')->join('products', 'products.id', '=', 'printful_orders.product_id')->join('payments', 'payments.id', '=', 'printful_orders.payment_id')->select('products.*','printful_order_data','payment_intent_id','payments.amount as amt','products.supporting_country','products.product_for','products.product_type','printful_orders.total_amount','printful_orders.product_price','printful_orders.id')->orderBy('printful_orders.id','desc')->paginate(5);

            return view('admin.pages.order.index')->with('activeLink', 'orders')->with('orders', $orders);
        

     //   $orders = Payment::join('users','users.id','=','payments.user_id')->select('payments.*','users.name')->paginate(5);
       // return view('admin.pages.order.index')->with('orders',$orders)->with('activeLink','order');
    }

    public function customer(){
        $customers = User::paginate(5);
        return view('admin.pages.user.index')->with('customers',$customers)->with('activeLink','customer');
    }
}
