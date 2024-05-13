<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Stripe\PaymentIntent;
use App\Models\Payment;
use Auth;
class PaymentController extends Controller
{
    public function processPayment(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        try {
            $paymentIntent = PaymentIntent::create([
                'amount' => $request->total,
                'currency' => 'usd',
                'payment_method' => $request->payment_method_id,
                'confirmation_method' => 'manual',
                'confirm' => true,
            ]);

            // Save payment data to your database
            $payment = new Payment();
            // Check if the user is authenticated
            if (Auth::check()) {
                // User is logged in, set the user_id
                $payment->user_id = auth()->user()->id;
            } else {
                // User is not logged in, set user_id to null
                $payment->user_id = null;
            }

            $payment->amount = $request->total / 100;
            $payment->payment_intent_id = $paymentIntent->id;
            // Add more fields or manipulate data as needed
            $payment->save();

            // Handle successful payment - send a success response
            return response()->json(['success' => true, 'message' => 'Payment successful','payment_id' => $payment->id]);
        } catch (\Exception $e) {
            // Handle payment failure - send an error response
            return response()->json(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    public function createCheckoutSession(Request $request)
    {
        try {
            Stripe::setApiKey(config('services.stripe.secret'));

            // Create the Checkout Session
            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [
                    [
                        'price_data' => [
                            'currency' => 'usd',
                            'product_data' => [
                                'name' => 'Donation to Make-a-Wish'
                            ],
                            'unit_amount' => 2000, // Amount in cents ($20.00)
                        ],
                        'quantity' => 1,
                    ]
                ],
                'mode' => 'payment',
                'success_url' => 'https://example.com/success',
                'cancel_url' => 'https://example.com/cancel',
            ]);

            // Return the Checkout Session ID to the frontend
            return response()->json(['id' => $session->id]);
        } catch (\Exception $e) {
            // Handle any errors
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
