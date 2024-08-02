<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Stripe\PaymentIntent;
use App\Models\Payment;
use App\Mail\OrderPlaced;
use App\Models\User;
use App\Models\PrintfulOrder;
use Auth;
use Mail;
use Stripe\Coupon;

class PaymentController extends Controller
{
    public function processPayment(Request $request) {
        Stripe::setApiKey(config('services.stripe.secret'));

        try {
            // Step 1: Validate and apply the coupon
            $discount = 0;
            if ($request->has('coupon')) {
                $couponCode = $request->coupon;
                // Assuming you have a Coupon model to check the validity
                $coupon = Coupon::where('code', $couponCode)->first();
                if ($coupon && $coupon->is_valid) {
                    $discount = $coupon->discount_amount; // Apply discount amount
                } else {
                    return response()->json(['success' => false, 'message' => 'Invalid coupon code']);
                }
            }

            // Step 2: Calculate the final amount after applying the discount
            $totalAmount = $request->total - ($discount * 100); // Assuming discount is in dollars, convert to cents

            // Step 3: Create the payment intent with the final amount
            $paymentIntent = PaymentIntent::create([
                'amount' => $totalAmount,
                'currency' => 'usd',
                'payment_method' => $request->payment_method_id,
                'confirmation_method' => 'manual',
                'confirm' => true,
                'return_url' => 'https://causestand.com/return', // Specify your return URL here
            ]);

            // Step 4: Save payment data to your database
            $payment = new Payment();
            if (Auth::check()) {
                $payment->user_id = auth()->user()->id;
                $user = User::find(auth()->user()->id);
            } else {
                $payment->user_id = null;
            }

            $payment->amount = $totalAmount / 100;
            $payment->payment_intent_id = $paymentIntent->id;
            $payment->save();

            // Step 5: Send order placed email if the user is authenticated
            if (Auth::check()) {
                $payment->user_id = auth()->user()->id;
                $user = User::find(auth()->user()->id);
                $latestOrder = PrintfulOrder::where('user_id', auth()->user()->id)->orderBy('created_at', 'desc')->first();
                if ($latestOrder) {
                    $id = $latestOrder->id;
                    $order = PrintfulOrder::where('id', $id)->first();
                    $data = json_decode($order->printful_order_data, true);

                    // Send order placed email
                    Mail::to(auth()->user()->email)->send(new OrderPlaced($payment, $user, $data));
                }
            }

            return response()->json(['success' => true, 'message' => 'Payment successful', 'payment_id' => $payment->id]);
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

    public function check_coupon(Request $request){
        try {
            // Perform coupon validation logic here
            // For example, using Stripe
            Stripe::setApiKey(config('services.stripe.secret'));
            $coupon = Coupon::retrieve($request->coupon);
    
            // Determine the discount amount and type
            if (!empty($coupon->amount_off)) {
                // Coupon provides a fixed amount discount
                $discountAmount = $coupon->amount_off;
                $discountType = 'fixed_amount';
            } elseif (!empty($coupon->percent_off)) {
                // Coupon provides a percentage discount
                $discountAmount = $coupon->percent_off;
                $discountType = 'percentage';
            } else {
                // Coupon does not specify a discount
                throw new \Exception('Invalid coupon: No discount amount specified.');
            }

            // Build the response data
            $responseData = [
                'valid' => true,
                'discount' => $discountAmount,
                'discount_type' => $discountType,
                'message' => 'Coupon is valid. Discount: ' . ($discountType === 'fixed_amount' ? ($discountAmount / 100) . ' USD' : $discountAmount . '%'),
                //'message' => 'Coupon is valid.',
                'coupon' => $coupon
            ];
            
    
            // Return success response with coupon details
            return response()->json($responseData);
        } catch (\Exception $e) {
            // If coupon is not valid, return error response
            return response()->json(['valid' => false, 'message' => $e->getMessage()]);
        }
    }   
}
