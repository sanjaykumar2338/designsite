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

    public $user;
    public $data; // Add the user property

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($order, User $user, $data) // Accept the user as a parameter
    {
        $this->data = $data;
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
        return $this->view('frontend.pages.invoice')
                    ->with([
                        'data' => $this->data,
                        'user' => $this->user,
                        'payment' => $this->order
                    ]);
    }
}
