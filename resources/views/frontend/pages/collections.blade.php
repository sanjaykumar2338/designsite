@extends('frontend.layout.homepagelayout')
@section('content')

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