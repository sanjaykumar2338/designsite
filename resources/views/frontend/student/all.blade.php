@extends('frontend.layout.homepagelayout')

@section('content')

<section class="slider-Product">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12 p-0 affter">
                <div id="carouselExampleCaptions" class="carousel slide">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="{{$background_image}}" class="d-block w-100"
                                alt="...">
                            <div class="carousel-caption ">
                                <h5>Commitment Coupon 30% OFF!</h5>
                                <p>Enabling student to, stand in solidarity,<br> with a cause.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="align-h">
    <div class="container">
        <div class="row add-flex">
            <div class="col-md-12 col-lg-3 z-3 ">
                <div class="main-vioce z-3 ">
                    <div class="vioce box-1" id="box-1">
                        <h4>Choose a Conflict</h4>
                        <ul>
                            <li class="israel-1 option-conflict">Israel & Palestine</li>
                            <li style="display:none" class="israel-1 option-conflict">Azerbaijan & Armenia</li>
                            <li class="option-conflict">Russia & Ukraine</li>
                            <li style="display:none" class="option-conflict">Turkey & Kurdistan </li>
                            <li style="display:none" class="option-conflict">India & Pakistan</li>
                        </ul>
                    </div>

                    <div class="vioce add-bg" id="box-2">
                        <h4>Stand for a Cause </h4>
                        <ul>
                            <li class="Israel-2 option-conflict-li1 standwith">Israel</li>
                            <li class="option-conflict-li2 standwith">Palestine</li>
                        </ul>
                    </div>

                    <div class="vioce add-bg" id="box-3">
                        <h4>Shop Subcategory</h4>
                        <ul>
                            <li class="men">Men's Apparel</li>
                            <li class="woman">Weman's Apparel</li>
                            <li class="accessories" style="display:none">Accessories</li>
                        </ul>
                    </div>

                    <div class="vioce add-bg" id="box-4">
                        <h4>Shop a Category </h4>
                        <ul>
                            <li class="typeofproduct4">Shirts</li>
                            <li class="typeofproduct4">Hoodies</a></li>
                            <li class="typeofproduct4">Sweatshirts</a></li>
                            <li class="typeofproduct4">Bottoms</a></li>
                        </ul>
                    </div>

                    <div class="vioce add-bg" id="box-5">
                        <h4>Shop a Category </h4>
                        <ul>
                            <li class="typeofproduct4">Bags</li>
                            <li class="typeofproduct4">Footwear</a></li>
                            <li class="typeofproduct4">Hats</a></li>
                            <li class="typeofproduct4">Phone Cases</a></li>
                        </ul>
                    </div>

                    <!--
                        <div class="vioce add-bg" id="box-5">
                            <h4>Shop a Subcategory</h4>
                            <ul>
                                <li class="typeofproduct4">Oversized</a></li>
                                <li class="typeofproduct4">Fitted</a></li>
                                <li class="typeofproduct4">V-Neck</a></li>
                                <li class="typeofproduct4">Long Sleeve</a></li>
                                <li class="typeofproduct4">Polo</a></li>
                            </ul>
                        </div>
                        -->
                </div>
            </div>
        </div>
    </div>
</section>

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
        {!! $page_content !!}
    </div>
</section>
@endsection