<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DonationSuccessful extends Mailable
{
    use Queueable, SerializesModels;

    public $amount;
    public $country;
    public $customerEmail;

    public $nonprofit;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($amount, $country, $customerEmail, $nonprofit)
    {
        $this->amount = $amount;
        $this->country = $country;
        $this->customerEmail = $customerEmail;
        $this->nonprofit = $nonprofit;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Donation Successful')
            ->view('emails.donation_successful')
            ->with([
                'amount' => $this->amount,
                'country' => $this->country,
                'nonprofit' => $this->nonprofit,
                'customerEmail' => $this->nonprofit
            ]);
    }
}
