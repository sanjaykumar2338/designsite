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
                                <h5> WE LOVE ALL PEOPLE</h5>
                                <p>Check Our Latest Causes And Missions</p>
                                <button onclick='location.href ="{{route('donate_now')}}";' class=" donate"> donate now</button>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="asset/frontend/images/banner-2.jpg" class="d-block w-100" alt="...">
                            <div class="carousel-caption ">
                                <h5> WE LOVE ALL PEOPLE</h5>
                                <p>Check Our Latest Causes And Missions</p>
                                <button onclick='location.href ="{{route('donate_now')}}";' class=" donate"> donate now</button>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="asset/frontend/images/banner-3.jpg" class="d-block w-100" alt="...">
                            <div class="carousel-caption ">
                                <h5> WE LOVE ALL PEOPLE</h5>
                                <p>Check Our Latest Causes And Missions</p>
                                <button onclick='location.href ="{{route('donate_now')}}";' class=" donate"> donate now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ========== Start top-align-slider ========== -->
<div class="container">
    <div class="row add-flex">
        <div class="col-md-12 col-lg-3 z-3 ">
            <div class="vioce">
                <h4>Display your voice</h4>
                <ul>
                    <li><a href="{{route('product_design')}}">poster</a></li>
                    <li><a href="{{route('product_design')}}">sigange</a></li>
                    <li><a href="{{route('product_design')}}">t-shirt</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<section class="Products">
        <div class="container">
            <h3> Apparel </h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem, eius magni aliquam ullam at odio ea!
                Doloremque porro, eveniet totam cum impedit, hic mollitia libero maxime nobis beatae voluptate nulla!
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
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem, eius magni aliquam ullam at odio ea!
                Doloremque porro, eveniet totam cum impedit, hic mollitia libero maxime nobis beatae voluptate nulla!
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
            <p class="p">Lorem Ipsum Dolor Sit Amet Consectetur, Adipisicing Elit. Autem, Eius Magni Aliquam Ullam At
                Odio Ea!
                Doloremque Porro, Eveniet Totam Cum Impedit, Hic Mollitia Libero Maxime Nobis Beatae Voluptate Nulla!
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
                        <h4 class="text">Justice</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus maiores quos, corporis
                            perferendis
                            odio sit, consequuntur recusandae architecto quia illum doloremque magni aperiam, quibusdam
                            nesciunt corrupti modi eaque pariatur officiis? Aliquam perspiciatis saepe beatae. Amet
                            eaque
                            alias voluptas aliquid? Libero?</p>
                        <button onclick='location.href ="{{route('justice')}}";' class="Read"> Read more</button>

                    </div>

                </div>

                <div class="col-md-12 col-lg-6">
                    <div class="text">
                        <h5 class="Hall">Hall of Shame
                            Advocate: Sign a List</h5>
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
                        <h3 class="latest add">General Blogs:</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe nostrum error at. Optio
                            deleniti sit autem, mollitia iure officia adipisci illum qui eveniet et voluptates,
                            excepturi obcaecati assumenda nulla pariatur possimus molestias a aut? Obcaecati laboriosam
                            error at quidem provident, ipsa commodi reprehenderit recusandae animi. Itaque dolores neque
                            illo recusandae?</p>

                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam saepe voluptatibus facere
                            iste, assumenda dolorem voluptas soluta qui. Quia magnam veritatis id cumque officia.
                            Eveniet omnis quaerat aut odio, commodi fugit distinctio provident, asperiores, ad
                            laboriosam dignissimos quidem error natus.</p>
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
@endsection