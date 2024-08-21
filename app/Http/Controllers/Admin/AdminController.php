<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\PrintfulOrder;
use App\Models\Payment;
use Illuminate\Support\Facades\Mail;
use App\Mail\DonationSuccessful;
use GuzzleHttp\Client;
class AdminController extends Controller{
    
    public function __construct()
    {
        //$this->middleware('auth');
    }

    public function index(Request $request){
        return view('admin.pages.dashboard')->with('activeLink','dashboard');
    }

    public function sendPayment($amount, $country, $orderId){
        $nonprofitIds = [
            'Palestine' => 'n_LVefvosmlNukcqYBTotxxar8',
            'Israel' => 'n_XbkfcVU8UluxtZhwsfZFKj0g',
            'Ukraine' => 'n_H9BXpn4xgi7TRexH1ZdOVVPS',
            'Russia' => 'n_KPyaUvrLgEZ7x194gbjwS7ZD'
        ];

        $nonprofitNames = [
            'Palestine' => 'Doctors Without Borders, USA Nonprofit for Palestine',
            'Israel' => 'New Israel Fund Nonprofit for Israel',
            'Ukraine' => 'Revived Soldiers Ukraine Nonprofit for Ukraine',
            'Russia' => 'Free Russia Foundation Nonprofit for Russia',
        ];

        if (!isset($nonprofitIds[$country])) {
            return back()->with('error', 'Invalid country specified.');
        }

        $amountInCents = $amount * 100;
        $data = [
            'amount' => $amountInCents,
            'nonprofit_id' => $nonprofitIds[$country],
            'funds_collected' => true,
        ];

        $public_key = env('GET_CHANGE_PUBLIC_KEY');
        $secret_key = env('GET_CHANGE_SECRET_KEY');

        $options = [
            'http' => [
                'header' => "Authorization: Basic " . base64_encode("$public_key:$secret_key") . "\r\n" .
                            "Content-Type: application/json\r\n",
                'method' => 'POST',
                'content' => json_encode($data),
            ],
        ];

        $context = stream_context_create($options);
        $result = file_get_contents('https://api.getchange.io/api/v1/donations', false, $context);

        $order = PrintfulOrder::find($orderId);

        if ($result === FALSE) {
            // Handle error
            if ($order) {
                $order->donation_status = '';
                $order->save();
            }
            return back()->with('error', 'Failed to make the request.');
        }

        // Update order donation_status to 'paid'
        if ($order) {
            $order->donation_status = 'paid';
            $order->donation_amount = $amount;
            $order->donation_country = $country;
            $order->save();
        }

        // Send the confirmation email
        Mail::to($order->customer_email)->send(new DonationSuccessful($amountInCents, $country, $order->customer_email, $nonprofitNames[$country]));

        return back()->with('message', 'Donation successfully processed and email sent to customer.');
    }

    public function sendPayment2($orderId){      
        $amount = 10;
        $amountInCents = $amount * 100;
        $data = [
            'amount' => $amountInCents,
            'nonprofit_id' => 'n_LVefvosmlNukcqYBTotxxar8',
            'funds_collected' => true,
        ];

        $public_key = env('GET_CHANGE_PUBLIC_KEY');
        $secret_key = env('GET_CHANGE_SECRET_KEY');

        $options = [
            'http' => [
                'header' => "Authorization: Basic " . base64_encode("$public_key:$secret_key") . "\r\n" .
                            "Content-Type: application/json\r\n",
                'method' => 'POST',
                'content' => json_encode($data),
            ],
        ];

        $context = stream_context_create($options);
        $result = file_get_contents('https://api.getchange.io/api/v1/donations', false, $context);

        $order = PrintfulOrder::find($orderId);

        if ($result === FALSE) {
            // Handle error
            if ($order) {
                $order->donation_status = '';
                $order->save();
            }
            return back()->with('error', 'Failed to make the request.');
        }

        // Update order donation_status to 'paid'
        $country = 'Doctors Without Borders, USA';
        if ($order) {
            $order->donation_status = 'paid';
            $order->donation_amount = $amount;
            $order->donation_country = $country;
            $order->save();
        }

        // Send the confirmation email
        Mail::to($order->customer_email)->send(new DonationSuccessful($amountInCents, $country, $order->customer_email, $country));

        return back()->with('message', 'Donation successfully processed and email sent to customer.');
    }

    public function order(){       
        $orders = PrintfulOrder::join('users', 'users.email', '=', 'printful_orders.customer_email')->join('products', 'products.id', '=', 'printful_orders.product_id')->join('payments', 'payments.id', '=', 'printful_orders.payment_id')->select('products.*','printful_order_data','payment_intent_id','payments.amount as amt','products.supporting_country','products.product_for','products.product_type','printful_orders.total_amount','printful_orders.product_price','printful_orders.id','users.first_name as customer_name','users.id as user_id','donation_status','print_order_status')->orderBy('printful_orders.id','desc')->paginate(7);
        
        return view('admin.pages.order.index')->with('activeLink', 'orders')->with('orders', $orders);
    }

    public function customer(){
        $customers = User::paginate(5);
        return view('admin.pages.user.index')->with('customers',$customers)->with('activeLink','customer');
    }

    public function confirm_order(Request $request, $order_id)
    {       
        // Create a new Guzzle client
        $client = new Client();

        // Define the URL and the token
        $url = "https://api.printful.com/orders/{$order_id}/confirm";
        $token = 'te6lqpl4ju9anm3y0TWtWTLaAVDiQz6ddtAspwJc';

        try {
            // Make the POST request to the Printful API
            $response = $client->post($url, [
                'headers' => [
                    'Authorization' => 'Bearer ' . $token,
                    'Content-Type' => 'application/json',
                ],
            ]);

            // Check if the response status is 200
            if ($response->getStatusCode() == 200) {
                // Update the printful_order_status in the database
                $order = PrintfulOrder::where('printful_order_id', $order_id)->first();
                if ($order) {
                    $order->printful_order_status = 'confirmed';
                    $order->save();

                    return redirect()->back()->with('success', 'Order confirmed successfully!');
                } else {
                    return redirect()->back()->with('error', 'Order not found in the database.');
                }
            } else {
                return redirect()->back()->with('error', 'Failed to confirm the order with Printful.');
            }
        } catch (\Exception $e) {
            // Catch and handle any errors
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
