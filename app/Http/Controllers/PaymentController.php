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
    public function processPayment(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        try {
            // Step 1: Validate and apply the coupon
            $discount = 0;
            $totalAmount = $request->total; // Assuming the total amount is in cents
            $validCoupon = false;
            $dicount_type = '';

            if ($request->has('coupon')) {
                $couponCode = $request->coupon;
                try {
                    // Retrieve the coupon from Stripe
                    $coupon = Coupon::retrieve($couponCode);

                    if ($coupon && $coupon->valid) {
                        $validCoupon = true;
                        if (!empty($coupon->amount_off)) {
                            // Fixed amount discount (amount_off is in cents)
                            $discount = $coupon->amount_off;
                            $dicount_type = 'fixed';
                        } elseif (!empty($coupon->percent_off)) {
                            // Percentage discount
                            $discount = ($coupon->percent_off / 100) * $totalAmount;
                            $dicount_type = 'percent';
                        }
                    }
                } catch (\Exception $e) {
                    // Handle invalid coupon case, but proceed with the payment
                    $validCoupon = false;
                }
            }

            // Step 2: Calculate the final amount after applying the discount
            if($dicount_type=='fixed'){
                $finalAmount = $totalAmount; 
            }else{
                $finalAmount = max(0, $totalAmount - $discount); 
            }

            // Step 3: Create the payment intent with the final amount
            $paymentIntentData = [
                'amount' => $finalAmount,
                'currency' => 'usd',
                'payment_method' => $request->payment_method_id,
                'confirmation_method' => 'manual',
                'confirm' => true,
                'return_url' => 'https://causestand.com/return', // Specify your return URL here
            ];

            // Apply the coupon to the payment intent if it is valid
            if ($validCoupon) {
                //$paymentIntentData['coupon'] = $couponCode;
            }

            $paymentIntent = PaymentIntent::create($paymentIntentData);

            // Step 4: Save payment data to your database
            $payment = new Payment();
            if (Auth::check()) {
                $payment->user_id = auth()->user()->id;
                $user = User::find(auth()->user()->id);
            } else {
                $payment->user_id = null;
            }

            $payment->amount = $finalAmount / 100; // Convert to dollars
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
                $discountAmount = $coupon->amount_off / 100;
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
                'message' => 'Coupon is valid. Discount: ' . ($discountType === 'fixed_amount' ? ($discountAmount) . ' USD' : $discountAmount . '%'),
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
