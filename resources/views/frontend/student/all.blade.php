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
                                <p>on all orders after your first.</p>
                                <p>{!! $tag_line !!}</p>
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
                            <li class="option-conflict">Russia & Ukraine</li>
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

        @if($click_index=="")
            <div class="container">
                <div class="accordion" id="causeStandAccordion">

                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                How to Receive Your Commitment Coupon as a Student
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#causeStandAccordion">
                            <div class="accordion-body">
                                After making your first purchase with Cause Stand, you'll be prompted to create an account if you haven't already. During the account setup, navigate to your user dashboard settings and select the "I am a student" option. Once you confirm your student status, a 30% Commitment Coupon will be automatically placed in your dashboard.
                                <br><br>
                                You will also receive an email notification confirming that the coupon has been activated. This coupon can be applied to all future purchases, allowing you to continue supporting your chosen cause at a discounted rate. Your activism is important, and this coupon is our way of recognizing and supporting your commitment to making a difference. Your activism doesn’t stop at the checkout—your voice continues to be heard as you get rewarded for standing up for what you believe in.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                When Students Advocate, The Impact is Real
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#causeStandAccordion">
                            <div class="accordion-body">
                                Supporting a cause is more than just wearing your beliefs; it’s about making a tangible impact. For every addition you customize on your garment, $10 is directly donated to a non-profit dedicated to the cause. By personalizing your apparel, you’re not just advocating for change—you’re funding it, ensuring that your contribution reaches the communities and causes that need it most.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Advocate for a Cause and Protest as a Student
                            </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#causeStandAccordion">
                            <div class="accordion-body">
                                Advocating for a cause doesn’t have to be confrontational; it can be peaceful, creative, and impactful. Customize your clothing with messages that reflect your values, encouraging dialogue and understanding. Wear your activism with pride, and inspire others to join the conversation for justice, freedom, and democracy. Your apparel becomes a canvas for peaceful protest, fostering awareness and change without ever raising your voice.
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
        @endif
    </div>
</section>

<script>
    //$(document).ready(function(){
        setTimeout(() => {
            var options = document.querySelectorAll('.option-conflict');
            var index = "{{$click_index}}"; // Change this index as needed (0-based index)
            
            if (options.length > index) {
                options[index].click(); // Simulate a click on the element at the specified index

                options = document.querySelectorAll('.standwith');
                index = "{{$click_index1}}"; // Change this index as needed (0-based index)
                options[index].click();
            } else {
                console.error('Index out of range');
            }
        }, 100);
    //});
</script>
@endsection