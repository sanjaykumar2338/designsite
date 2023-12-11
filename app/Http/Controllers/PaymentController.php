<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use App\Models\Payment;
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
            $payment->user_id = auth()->user()->id; // Assuming you have a user and want to associate payments with users
            $payment->amount = $request->total / 100;
            $payment->payment_intent_id = $paymentIntent->id;
            // Add more fields or manipulate data as needed
            $payment->save();

            // Handle successful payment - send a success response
            return response()->json(['success' => true, 'message' => 'Payment successful']);
        } catch (\Exception $e) {
            // Handle payment failure - send an error response
            return response()->json(['success' => false, 'error' => $e->getMessage()]);
        }
    }
}
