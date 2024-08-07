@extends('frontend.layout.homepagelayout')
@section('content')

    <style>
        .Products h3 {
            text-align: left;
            text-align: left;
            font-size: 33px;
            font-weight: 600;
            padding-bottom: 8px;
            text-transform: none;
            line-height: 41px;
        }

        .Products p {
            text-align: left;
            font-size: 20px;
            text-transform: none;
            padding-bottom: 0;
            line-height: 33px;
        }
    </style>

    <!-- ========== Start products ========== -->
    <section class="Products">
        <div class="container">            
            <h3>Advocacy Streetwear Collections - Shop Now and Join the Movement</h3>
            <p>Welcome to the shop at Cause Stand, where activism drives fashion. Explore our diverse range of activist streetwear and advocacy
            apparel, designed to make a statement that demands attention. At Cause Stand, we believe in the power of clothing to amplify your
            voice and advocate for causes that matter.</p>

            <div class="row">
                
                @if($collections)
                    @foreach($collections as $collection)
                        <div class="col-lg-3 col-md-6">
                            <div class="img aos-init aos-animate" data-aos="zoom-in">
                                <img src="{{fileToUrl($collection->feature_image)}}" alt="" style="height: 300px;">
                                <div class="text-two">
                                    <h4>{{$collection->title}} Collection</h4>
                                    <a class="buy_now" href="{{url('/')}}/shop/{{$collection->slug}}-collection"> shop</a>
                                </div>
                            </div>
                        </div>
                    @endforeach
                @endif
            </div>

            <h3>Shop the Oversight Collection - Join the Boycott Movement</h3>
            <p>Join the Boycott Movement with our Oversight Collection, where you can hold institutions accountable for biased influence. Each piece in this collection is designed to spark conversations and shine a spotlight on companies that contradict moral values. The Oversight Collection empowers you to make a meaningful impact through your fashion choices.</p>

            <h3>Shop the Traitor Collection - Join the Integrity-reform Movement</h3>
            <p>The Integrity-reform Movement is all about holding lawmakers accountable for their actions. Explore our Traitor Collection, which allows you to advocate against double-loyalty, raise awareness about the impact of institutional lobbying, and demand integrity from public officials.</p>

            <h3>Shop the Trader Collection - Join the Ethic-reform Movement</h3>
            <p>Our Ethic-reform Movement focuses on holding politicians accountable for insider trading. Browse the Trader Collection to support ethical reform and promote transparency in governance.</p>

            <h3>Shop the Propaganda Collection - Join the Fact-check Movement</h3>
            <p>The Fact-check Movement is dedicated to holding the media accountable for misinformation. Shop the Propaganda Collection to demand factual reporting and combat biased narratives.</p>

            <h3>Advocate with Your Fashion Choices</h3>
            <p>Each collection at Cause Stand is more than just clothing; it's a tool for advocacy and activism. When you shop with us, you're not only expressing your convictions but also contributing to a larger movement for justice and accountability.</p>

            <h3>How Fashion and Advocacy Works at Cause Stand</h3>
            <p>1. Shop Activist Streetwear: Explore our urban collections that include bold designs and powerful messages that resonate with your advocacy.</p>
            <p>2. Join An Advocacy Movement: Choose from our diverse movements like the Boycott Movement, Integrity-reform Movement, Ethic-reform Movement, and Fact-check Movement to support the cause you believe in.</p>
            <p>3. Wear Your Convictions: Wear your convictions on your clothing and make a statement wherever you go. Our clothing is designed to be more than just apparel; it's a symbol of your commitment to social responsibility and activism.</p>

            <h3>Why Choose Cause Stand for Urban Clothing and Accessories?</h3>
            <p>Cause Stand is committed to creating high-quality, ethically-sourced apparel that supports your beliefs. A portion of every purchase goes towards supporting nonprofits and initiatives that align with your values of justice, integrity, and transparency.</p>

            <h3>Join the Movement Now!</h3>
            <p>Shop now and join the movement for change. Every purchase you make at Cause Stand supports our advocacy efforts and helps us continue our mission to empower the public and brighten the world through fashion activism.</p>

            <h3><i>Explore our collections and shop with purpose at Cause Stand now.</i></h3>
        </div>
    </section>
    <!-- ========== End products ========== -->
@endsection