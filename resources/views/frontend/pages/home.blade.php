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
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="asset/frontend/images/parallax-1.jpg" class="d-block w-100" alt="...">
                            <div class="carousel-caption ">
                                <h5>MOVED BY<br> IMAGES!</h5>
                                <p>Stand in the Face of Oppression<br> Challenge False Narratives<br> and Demand Accountability.</p>
                                <button onclick='location.href ="{{route('donate_now')}}";' class=" donate"> shop and donate</button>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="asset/frontend/images/banner-2.jpg" class="d-block w-100" alt="...">
                            <div class="carousel-caption ">
                                <h5>MOVED BY<br> IMAGES!</h5>
                                <p>Stand in the Face of Oppression<br> Challenge False Narratives<br> and Demand Accountability.</p>
                                <button onclick='location.href ="{{route('donate_now')}}";' class=" donate"> shop and donate</button>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="asset/frontend/images/banner-3.jpg" class="d-block w-100" alt="...">
                            <div class="carousel-caption ">
                                <h5>MOVED BY<br> IMAGES!</h5>
                                <p>Stand in the Face of Oppression<br> Challenge False Narratives<br> and Demand Accountability.</p>
                                <button onclick='location.href ="{{route('donate_now')}}";' class=" donate"> shop and donate</button>
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
                                <li class="israel-1 option-conflict">Azerbaijan & Armenia</li>
                                <li class="option-conflict">Russia & Ukraine</li>
                                <li class="option-conflict">Turkey & Kurdistan </li>
                                <li class="option-conflict">India & Pakistan</li>
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
                                <li class="accessories">Accessories</li>
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


<section class="Products">
        <div class="container">
            <h3> Apparel </h3>
            <p>Express your support for a cause and stand in the face of injustice by adding images that resonate with your values into your apparel. Shop to donate and make a difference.
            </p>
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="img aos-init aos-animate" data-aos="zoom-in">
                        <img src="asset/frontend/images/p-1.jpg" alt="">
                        <div class="text-one">
                            <span>$ 13.40</span>
                        </div>
                        <div class="text-two">
                            <h4>Shirts</h4>
                             <button class="buy_now"> buy now</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="img aos-init aos-animate" data-aos="zoom-in">
                        <img src="asset/frontend/images/p-2.jpg" alt="">
                        <div class="text-one">
                            <span>$ 13.40</span>
                        </div>
                        <div class="text-two">
                            <h4>Hoodies</h4>
                             <button class="buy_now"> buy now</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="img aos-init aos-animate" data-aos="zoom-in">
                        <img src="asset/frontend/images/p-3.jpg" alt="">
                        <div class="text-one">
                            <span>$ 13.40</span>
                        </div>
                        <div class="text-two">
                            <h4>Sweatshirts</h4>
                             <button class="buy_now"> buy now</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="img aos-init aos-animate" data-aos="zoom-in">
                        <img src="asset/frontend/images/p-3.jpg" alt="">
                        <div class="text-one">
                            <span>$ 13.40</span>
                        </div>
                        <div class="text-two">
                            <h4>Bottom</h4>
                             <button class="buy_now"> buy now</button>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    </section>

    <!-- ========== End Apparel ========== -->

    <section class="Products-3 bg-img">
        <div class="container">
            <h3> Accessories </h3>
            <p>Demonstrate solidarity with a cause and oppose misinformation by accessorizing your fashion with images that reflect your voice. Shop to donate and effect positive change.
            </p>
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="img aos-init aos-animate" data-aos="zoom-in">
                        <img src="asset/frontend/images/caps-1.webp" alt="">
                        <div class="text-one">
                            <span>$ 13.40</span>
                        </div>
                        <div class="text-two">
                            <h4>Caps</h4>
                            <button class="buy_now"> buy now</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="img aos-init aos-animate" data-aos="zoom-in">
                        <img src="asset/frontend/images/sc-2.png" alt="">

                        <div class="text-one">
                            <span>$ 13.40</span>
                        </div>
                        <div class="text-two">
                            <h4>Scarfs</h4>
                            <button class="buy_now"> buy now</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="img aos-init aos-animate" data-aos="zoom-in">
                        <img src="asset/frontend/images/b-1.png" alt="">

                        <div class="text-one">
                            <span>$ 13.40</span>
                        </div>
                        <div class="text-two">
                            <h4>Flyers</h4>
                            <button class="buy_now"> buy now</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="img aos-init aos-animate" data-aos="zoom-in">
                        <img src="asset/frontend/images/pin.png" alt="">

                        <div class="text-one">
                            <span>$ 13.40</span>
                        </div>
                        <div class="text-two">
                            <h4>Pins</h4>
                            <button class="buy_now"> buy now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <!-- ========== Start Donations ========== -->
    <section class="Donations">
        <div class="container">
            <h3 class="heading">Donations</h3>
            <p>Upon incorporating an image into your purchase, a $10 contribution is donated to strengthen the associated cause.</p>
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6 add-margin">
                    <div class="Donations-box">
                        <h3>Donations</h3>
                        <p class="p">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem, eius magni aliquam
                            ullam at odio ea!
                            Doloremque porro, eveniet totam cum impedit, hic mollitia
                        </p>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 col-sm-6 add-margin">
                    <div class="Donations-box">
                        <h3>Total</h3>
                        <p class="p">$3000
                        </p>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 col-sm-6 add-margin">
                    <div class="Donations-box">
                        <h3>By Cause</h3>
                        <div class="algin-span">
                            <span>Israeli</span>
                            <span>$1000</span>
                        </div>

                        <div class="algin-span">
                            <span>Palestinian</span>
                            <span>$1211</span>
                        </div>



                        <div class="algin-span">
                            <span>Russiona</span>
                            <span>$591</span>
                        </div>
                        <div class="algin-span">
                            <span>Ukraine</span>
                            <span>$6000</span>
                        </div>
                        <div class="algin-span">
                            <span>Donate
                                Make a Difference </span>
                            <span>$6000</span>
                        </div>
                    </div>


                </div>

                <div class="col-lg-3 col-md-6 col-sm-6 add-margin">


                    <div class="Donations-box">
                        <h3 class="add-style">Donate
                            Make a Difference</h3>
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Choose your Cause
                            </option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- ========== End Donations ========== -->
    <section class="Media">
        <div class="container">
            <h4 class="heading-two">media</h4>
            <p class="p">Explore trending media posts that shed light on current conflicts so you can support or oppose the narrative. Select a cause to view social posts from various media.
            </p>
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="add_video">
                        <iframe width="100%" height="315px"
                            src="https://www.youtube.com/embed/pqlXzL5QSrA?si=NvH-vaFP5UcAyfW1"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="add_video">
                        <iframe width="100%" height="315px"
                            src="https://www.youtube.com/embed/pqlXzL5QSrA?si=NvH-vaFP5UcAyfW1"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="add_video">
                        <iframe width="100%" height="315px"
                            src="https://www.youtube.com/embed/pqlXzL5QSrA?si=NvH-vaFP5UcAyfW1"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="add_video">
                        <iframe width="100%" height="315px"
                            src="https://www.youtube.com/embed/pqlXzL5QSrA?si=NvH-vaFP5UcAyfW1"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                    </div>
                </div>

            </div>

        </div>
    </section>












    <section class="Justice">
        <div class="container">
            <h4 class="j_u">Justice</h4>
            <div class="row">
                <div class="col-md-12 col-lg-6">
                    <div class="left-text">
                        <h4 class="text">Accountable to Truth</h4>
                        <p>Ensuring accountability for the aggressor demands a commitment to truth
and transparency. Holding those who perpetrate wrongdoing accountable is
necessary to peace.

Stand in the face of crime and advocate for justice, explore the Hall of Shame to prosecute those who intentionally propagate bigoted narratives.</p>
                        <button onclick='location.href ="{{route('justice')}}";' class="Read"> Read more</button>

                    </div>

                </div>

                <div class="col-md-12 col-lg-6">
                    <div class="text">
                        <h5 class="Hall">Hall Of Shame
                            Advocate: Sign a List</h5>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Explore and advocate for prosecution</p>
                    </div>
                </div>
            </div>
        </div>

        </div>
    </section>


    <section class="blog">
        <div class="container">
            <h3 class="latest">General Blogs & News</h3>
            <div class="row">

                <div class="col-lg-6">
                    <div class="card-one-1">
                        <h3 class="latest add">Trending Blogs:</h3>
                        <p>Join us on this journey as we navigate through the intricacies of global affairs, shedding light on the why behind the what, and putting a spotlight on the injustices affecting our reality and shaping our world.</p>

                        <p>Step into our General Blog, a space that offers insightful perspectives on current events and conflicts. We venture beyond the headlines, we investigate the pivotal questions surrounding the motivations propelling these conflicts.</p>
                    </div>

                </div>


                <div class="col-lg-6">
                    <div class="row">
                        <div class=" col-md-6">
                            <div class="card-one">
                                <div class="img">
                                    <img src="asset/frontend/images/post-05.jpg" alt="">
                                </div>
                                <div class="text">
                                    <p class="mas">MASONRY</p>
                                    <h3>New Website</h3>
                                    <p class="pp">Phasellus enim libero, blandit vel sapien vitae, condimentum ultricies
                                        magna
                                        et. Quisque
                                        euismod orci.</p>
                                </div>
                                <div class="date">
                                    <h4>14</h4>
                                    <span class="mar">mar</span>
                                </div>
                            </div>

                        </div>
                        <div class=" col-md-6">
                            <div class="card-one">
                                <div class="img">
                                    <img src="asset/frontend/images/post-07.jpg" alt="">
                                </div>
                                <div class="text">
                                    <p class="mas">MASONRY</p>
                                    <h3>New Website</h3>
                                    <p class="pp">Phasellus enim libero, blandit vel sapien vitae, condimentum ultricies
                                        magna
                                        et. Quisque
                                        euismod orci.</p>
                                </div>
                                <div class="date">
                                    <h4>14</h4>
                                    <span class="mar">mar</span>
                                </div>
                            </div>

                        </div>

                        <!-- <div class="col-lg-4 col-md-6">
                    <div class="card-one">
                        <div class="img">
                            <img src="images/post-08.jpg" alt="" class="img-height">
                        </div>

                    </div>

                </div> -->

                    </div>
                </div>
            </div>

        </div>

    </section>

    <script>
        
    </script>
    @endsection