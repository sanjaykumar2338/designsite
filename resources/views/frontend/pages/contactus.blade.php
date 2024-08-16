@extends('frontend.layout.homepagelayout')

@section('content')

<!-- ========== Start banner ========== -->
<section class="contact-banner">
    <div class="container">
        <div class="text">
            <h4>Contact Us</h4>
        </div>
    </div>
</section>
<!-- ========== End banner ========== -->

<section class="form-section">
    <div class="container">
        <div class="row">
            <!-- Left Content Section -->
            <div class="col-lg-6 col-md-12 mb-5">
                <div class="content-box p-4 shadow-sm rounded bg-light">
                    <h3 class="mb-4">Get in Touch with Cause Stand for Support</h3>
                    <p class="mb-3">We’re Here to Help. At Cause Stand, we value your voice as much as the causes we support. Whether you have a question about your order, need assistance with your account, or want to learn more about how to advocate with our apparel, we’re just a message away.</p>

                    <h4 class="mb-3">How Can We Assist You?</h4>
                    <ul class="list-unstyled" style="text-align: justify;">
                        <li><strong>Order Support:</strong> Questions about your purchase, tracking, or delivery? We’re here to help you every step of the way.</li>
                        <li><strong>Account Assistance:</strong> Need help with your account settings or accessing your dashboard? Our team is ready to guide you.</li>
                        <li><strong>Advocacy and Products:</strong> Interested in learning more about our causes or how to customize your apparel? Let us provide you with all the details.</li>
                        <li><strong>General Inquiries:</strong> Have feedback or suggestions? We’re always open to hearing from you and improving your experience.</li>
                    </ul>

                    <h4 class="mt-4 mb-3">Get in Touch</h4>
                    <ul class="list-unstyled" style="text-align: justify;">
                        <li><strong>Email:</strong> <a href="mailto:support@causestand.com">support@causestand.com</a></li>
                        <li><strong>Phone:</strong> <a href="tel:+19734373877">1-973-437-3877</a></li>
                        <li><strong>Social Media:</strong> Connect with us on  <a href="https://www.facebook.com/causestand" target="_blank">Facebook</a>, 
        <a href="https://twitter.com/causestand" target="_blank">Twitter</a>, 
        <a href="https://www.instagram.com/causestand" target="_blank">Instagram</a></li>
                    </ul>

                    <h4 class="mt-4 mb-3">Your Voice Matters</h4>
                    <p>At Cause Stand, your opinions and concerns are important to us. We aim to respond to all inquiries promptly and ensure that your experience with us is positive and impactful.</p>
                </div>
            </div>

            <!-- Right Content Section - Contact Form -->
            <div class="col-lg-6 col-md-12">
                @if (session('success'))
                    <div class="alert alert-success">
                        {{ session('success') }}
                    </div>
                @endif

                <div class="form-box p-4 shadow-sm rounded bg-white">
                    <h3 class="mb-4">Contact Form</h3>
                    <form method="post" action="{{ url('contact_save') }}" name="contact_frm">
                        @csrf
                        <div class="form-group mb-3">
                            <input type="text" class="form-control" placeholder="First Name" name="first_name" required>
                        </div>
                        <div class="form-group mb-3">
                            <input type="text" class="form-control" placeholder="Last Name" name="last_name">
                        </div>
                        <div class="form-group mb-3">
                            <input type="tel" class="form-control" placeholder="Mobile Number" name="phone" required>
                        </div>
                        <div class="form-group mb-3">
                            <input type="email" class="form-control" placeholder="Email Address" name="email">
                        </div>
                        <div class="form-group mb-4">
                            <textarea class="form-control" placeholder="Message" name="message" rows="4" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ========== Start map ========== -->
<section class="map-section mt-5">
    <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52872517.59607392!2d-161.69116940686905!3d36.018281840171966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sin!4v1699385880283!5m2!1sen!2sin"
        width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"></iframe>
</section>
<!-- ========== End map ========== -->

@endsection
