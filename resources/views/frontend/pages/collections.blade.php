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
            <div class="row">
                @php
                    $oversight = '';
                    $oversight_href = '';

                    $traitor = '';
                    $traitor_href = '';

                    $trader = '';
                    $traderhref = '';

                    $propaganda = '';
                    $propaganda_href = '';
                @endphp

                @if($collections)
                    @foreach($collections as $collection)
                        <div class="col-lg-3 col-md-6">
                            <div class="img aos-init aos-animate" data-aos="zoom-in">
                                <img src="{{fileToUrl($collection->feature_image)}}" alt="" style="height: 300px;">
                                <div class="text-two">
                                    <h4>{{$collection->title}} Collection</h4>
                                    <a class="buy_now" href="{{ url('collection/design/' . $collection->slug . '-collection/') }}/tshirts"> shop</a>
                                </div>
                            </div>
                        </div>

                        @if($collection->title=='Oversight')
                            @php 
                                $oversight = fileToUrl($collection->feature_image); 
                                $oversight_href = url('collection/design/' . $collection->slug . '-collection).'/tshirts';
                            @endphp
                        @endif

                        @if($collection->title=='Traitor')
                            @php 
                                $traitor = fileToUrl($collection->feature_image); 
                                $traitor_href = url('collection/design/' . $collection->slug . '-collection).'/tshirts';
                            @endphp
                        @endif

                        @if($collection->title=='Trader')
                            @php 
                                $trader = fileToUrl($collection->feature_image); 
                                $trader_href = url('collection/design/' . $collection->slug . '-collection).'/tshirts';
                            @endphp
                        @endif

                        @if($collection->title=='Propaganda')
                            @php 
                                $propaganda = fileToUrl($collection->feature_image);
                                $propaganda_href = url('collection/design/' . $collection->slug . '-collection).'/tshirts';
                            @endphp
                        @endif

                    @endforeach
                @endif

                <h3>Advocacy Streetwear Collections - Shop Now and Join the Movement</h3>
                <p>Welcome to the shop at Cause Stand, where activism drives fashion. Explore our diverse range of activist streetwear and advocacy
                apparel, designed to make a statement that demands attention. At Cause Stand, we believe in the power of clothing to amplify your
                voice and advocate for causes that matter.</p>
            </div>
        </div>
    </section>
<div class="container mt-5">
    <div class="row">
        <div class="col-md-4">
            <div class="card">
                <img src="{{url('/')}}/collectiontwo/student-movement-boycott-brand.png" class="card-img-top" alt="Oversight Collection">
                <div class="card-body text-center">
                    <button class="btn btn-dark" onclick="window.location.href = '<?= $oversight_href ?>'">SHOP NOW</button>
                </div>
            </div>
        </div>
        <div class="col-md-6 d-flex">
            <div>
                <h3>Shop the Oversight collection</h3>
                <p>Join the Boycott Movement with our Oversight Collection, where you can hold institutions accountable for biased influence. Each piece in this collection is designed to spark conversations and shine a spotlight on companies that contradict moral values.</p>
                <p>The Oversight Collection empowers you to make a meaningful impact through your fashion choices.</p>
                <button class="btn btn-outline-dark" onclick="window.location.href = '<?= $oversight_href ?>'">OVERSIGHT COLLECTION</button>
            </div>
        </div>
    </div>
</div>

<!-- Section 2: Join the Boycott Movement -->
<div class="container mt-4">
    <div class="row">
        <div class="col text-center">
            <h4 class="bg-secondary text-white py-2">JOIN THE BOYCOTT MOVEMENT</h4>
        </div>
    </div>
</div>

<!-- Section 3: Traitor Collection -->
<div class="container mt-4">
    <div class="row">
        <div class="col-md-4">
            <div class="card">
                <img src="{{url('/')}}/collectiontwo/student-advocacy-streetwear-aipac-brand.png" class="card-img-top" alt="Traitor Collection">
                <div class="card-body text-center">
                    <button class="btn btn-dark" onclick="window.location.href = '<?= $traitor_href ?>'">SHOP NOW</button>
                </div>
            </div>
        </div>
        <div class="col-md-6 d-flex">
            <div>
                <h3>Shop the Traitor collection</h3>
                <p>Shop the Traitor Collection - Join the Integrity-reform Movement. The Integrity-reform Movement is all about holding lawmakers accountable for their actions.</p>
                <p>Explore our Traitor Collection, which allows you to advocate against double-loyalty, raise awareness about institutional lobbying, and demand integrity from public officials.</p>
                <button class="btn btn-outline-dark" onclick="window.location.href = '<?= $traitor_href ?>'">TRAITOR COLLECTION</button>
            </div>
        </div>
    </div>
</div>

<!-- Section 4: Join the Integrity-Reform Movement -->
<div class="container mt-4">
    <div class="row">
        <div class="col text-center">
            <h4 class="bg-secondary text-white py-2">JOIN THE INTEGRITY-REFORM MOVEMENT</h4>
        </div>
    </div>
</div>
<!-- ========== End products ========== -->

<!-- Section 1: Trader Collection -->
<div class="container mt-5">
    <div class="row">
        <div class="col-md-4">
            <div class="card">
                <img src="{{url('/')}}/collectiontwo/ethical-reform-brand-insider-trading-in-congress.png" class="card-img-top" alt="Trader Collection">
                <div class="card-body text-center">
                    <button class="btn btn-dark" onclick="window.location.href = '<?= $trader_href ?>'">SHOP NOW</button>
                </div>
            </div>
        </div>
        <div class="col-md-6 d-flex">
            <div>
                <h3>Shop the Trader collection</h3>
                <p>Shop the Trader Collection - Join the Ethic-reform Movement. Our Ethic-reform Movement focuses on holding politicians accountable for insider trading.</p>
                <p>Browse the Trader Collection to support ethical reform and promote transparency in governance.</p>
                <button class="btn btn-outline-dark" onclick="window.location.href = '<?= $trader_href ?>'">TRADER COLLECTION</button>
            </div>
        </div>
    </div>
</div>

<!-- Section 2: Join the Ethic-Reform Movement -->
<div class="container mt-4">
    <div class="row">
        <div class="col text-center">
            <h4 class="bg-secondary text-white py-2">JOIN THE ETHIC-REFORM MOVEMENT</h4>
        </div>
    </div>
</div>

<!-- Section 3: Propaganda Collection -->
<div class="container mt-4">
    <div class="row">
        <div class="col-md-4">
            <div class="card">
                <img src="{{url('/')}}/collectiontwo/propaganda-advocacy-clothing-brand.png" class="card-img-top" alt="Propaganda Collection">
                <div class="card-body text-center">
                    <button class="btn btn-dark" onclick="window.location.href = '<?= $propaganda_href ?>'">SHOP NOW</button>
                </div>
            </div>
        </div>
        <div class="col-md-6 d-flex">
            <div>
                <h3>Shop the Propaganda collection</h3>
                <p>Shop the Trader Collection - Join the Ethic-reform Movement. Our Ethic-reform Movement focuses on holding politicians accountable for insider trading.</p>
                <p>Browse the Trader Collection to support ethical reform and promote transparency in governance.</p>
                <button class="btn btn-outline-dark" onclick="window.location.href = '<?= $propaganda_href ?>'">PROPAGANDA COLLECTION</button>
            </div>
        </div>
    </div>
</div>

<!-- Section 4: Join the Ethic-Reform Movement (again) -->
<div class="container mt-4">
    <div class="row">
        <div class="col text-center">
            <h4 class="bg-secondary text-white py-2">JOIN THE ETHIC-REFORM MOVEMENT</h4>
        </div>
    </div>
</div>

<section class="Products">
    <div class="container">   
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
@endsection