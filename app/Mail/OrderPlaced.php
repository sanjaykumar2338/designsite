<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User; // Assuming your User model is located in the App\Models namespace

class OrderPlaced extends Mailable
{
    use Queueable, SerializesModels;

    public $order;
    public $user; // Add the user property

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($order, User $user) // Accept the user as a parameter
    {
        $this->order = $order;
        $this->user = $user; // Assign the user to the property
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.orderPlaced')
                    ->with([
                        'order' => $this->order,
                        'user' => $this->user, // Pass the user to the view
                    ]);
    }
}
