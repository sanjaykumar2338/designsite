<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Stripe\PaymentIntent;
use App\Models\Payment;
use App\Mail\OrderPlaced;
use Auth;
use Mail;

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
            if (Auth::check()) {
                $payment->user_id = auth()->user()->id;
            } else {
                $payment->user_id = null;
            }

            $payment->amount = $request->total / 100;
            $payment->payment_intent_id = $paymentIntent->id;
            $payment->save();

            // Send order placed email
            Mail::to(auth()->user()->email)->send(new OrderPlaced($payment));

            return response()->json(['success' => true, 'message' => 'Payment successful','payment_id' => $payment->id]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    public function createCheckoutSession(Request $request)
    {
        try {
            Stripe::setApiKey(config('services.stripe.secret'));

            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [
                    [
                        'price_data' => [
                            'currency' => 'usd',
                            'product_data' => [
                                'name' => 'Donation to Make-a-Wish'
                            ],
                            'unit_amount' => 2000,
                        ],
                        'quantity' => 1,
                    ]
                ],
                'mode' => 'payment',
                'success_url' => 'https://example.com/success',
                'cancel_url' => 'https://example.com/cancel',
            ]);

            return response()->json(['id' => $session->id]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
