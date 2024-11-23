<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewOrderPlaced extends Mailable
{
    use Queueable, SerializesModels;

    public $order;

    /**
     * Create a new message instance.
     *
     * @param $order
     * @return void
     */
    public function __construct($order)
    {
        $this->order = $order; // Pass order details to the email view
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('New Order Placed')
                    ->view('emails.new_order')
                    ->with([
                        'order' => $this->order,
                    ]);
    }
}
