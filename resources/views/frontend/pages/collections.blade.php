@extends('frontend.layout.homepagelayout')
@section('content')

    <section class="slider-Product">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 p-0 affter">
                    <div id="carouselExampleCaptions" class="carousel slide">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0"
                                class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                                aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3"
                                aria-label="Slide 4"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="asset/frontend/images/banner/stand-with-Israel.jpg" class="d-block w-100"
                                    alt="...">
                                <div class="carousel-caption ">
                                    <h5>DEFIANT TO <br>AGGRESSION!</h5>
                                    <p>Stand to Defend against Aggression,<br> Demolish Terrorism,<br> and Claim Ownership
                                        to Peace.</p>
                                    <button style="display:none;" onclick='location.href ="{{route('donate_now')}}";' class=" donate"> shop and
                                        donate</button>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src="asset/frontend/images/banner/stand-with-Palestine.jpg" class="d-block w-100"
                                    alt="...">
                                <div class="carousel-caption ">
                                    <h5>MOVED BY<br> IMAGES!</h5>
                                    <p>Stand in the Face of Oppression,<br> Challenge False Narratives,<br> and Demand
                                        Accountability.</p>
                                    <button style="display:none;" onclick='location.href ="{{route('donate_now')}}";' class=" donate"> shop and
                                        donate</button>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src="asset/frontend/images/banner/3.jpg" class="d-block w-100" alt="...">
                                <div class="carousel-caption ">
                                    <h5>FUELED BY<br> RIGHTEOUSNESS!</h5>
                                    <p>Stand for Unification,<br> Resist Unwanted Narratives,<br> and Demand Loyalty.</p>
                                    <button style="display:none;" onclick='location.href ="{{route('donate_now')}}";' class=" donate"> shop and
                                        donate</button>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src="asset/frontend/images/banner/stand-with-Ukraine.jpg" class="d-block w-100"
                                    alt="...">
                                <div class="carousel-caption ">
                                    <h5>DRIVEN TO<br> BE FREE!</h5>
                                    <p>Stand for Sovereignty,<br> Reject Foreign Influence,<br> and Seek Independence.</p>
                                    <button style="display:none;" onclick='location.href ="{{route('donate_now')}}";' class=" donate"> shop and
                                        donate</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ========== Start products ========== -->
    <section class="Products">
        <div class="container">            
            <h3>Shop buy Collections</h3>

            <div class="row">
                <div class="col-lg-3 col-md-6">
                    <div class="img aos-init aos-animate" data-aos="zoom-in">
                        <img src="asset/frontend/images/p-1.jpg" alt="">
                        <div class="text-one" style="display:none;">
                            <!-- <span></span> -->
                        </div>
                        <div class="text-two">
                            <h4>Oversight Collection</h4>
                            <a class="buy_now" href="{{url('/')}}/shop/oversight-collection"> shop</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="img aos-init" data-aos="zoom-in">
                        <img src="asset/frontend/images/p-2.jpg" alt="">
                        <div class="text-one" style="display:none;">
                            <!-- <span></span> -->
                        </div>
                        <div class="text-two">
                            <h4>Traitor Collection</h4>
                            <a class="buy_now" href="{{url('/')}}/shop/traitor-collection"> shop</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="img aos-init" data-aos="zoom-in">
                        <img src="asset/frontend/images/p-3.jpg" alt="">
                        <div class="text-one" style="display:none;">
                            <!-- <span></span> -->
                        </div>
                        <div class="text-two">
                            <h4>Trader Collection</h4>
                             <a class="buy_now" href="{{url('/')}}/shop/trader-collection"> shop</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="img aos-init" data-aos="zoom-in">
                        <img src="asset/frontend/images/p-3.jpg" alt="">
                        <div class="text-one" style="display:none;">
                            <!-- <span></span> -->
                        </div>
                        <div class="text-two">
                            <h4>Propaganda Collection</h4>
                             <a class="buy_now" href="{{url('/')}}/shop/propaganda-collection"> shop</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
    <!-- ========== End products ========== -->
@endsection