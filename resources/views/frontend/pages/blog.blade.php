@extends('frontend.layout.homepagelayout')

@section('content')

<!-- ========== Start blog-heading ========== -->
<section class="blog-heading">
    <div class="container">
        <div class="text">
            <h2>Our Blogs</h2>
        </div>
    </div>
</section>
<!-- ========== End blog-heading ========== -->
<!-- ========== Start blog-cards ========== -->
<section class="cards">
    <div class="container">
        <h2 class="heading-style">Updates</h2>
        <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12  col-12">
                <div class="style-box">
                    <div class="img-box">
                        <img src="asset/frontend/images/img-1.webp" alt="">
                    </div>
                    <div class="text">
                        <h4>Lorem, ipsum dolor </h4>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias enim provident earum
                            quidem ad!
                        </p>
                       <a href="{{route('blog_detail')}}"> <button class="btn-style"> Read more </button></a>


                    </div>
                </div>

            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 col-12">
                <div class="style-box">
                    <div class="img-box">
                        <img src="asset/frontend/images/img-2.webp" alt="">
                    </div>
                    <div class="text">
                        <h4>Lorem, ipsum dolor </h4>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias enim provident earum
                            quidem ad!
                        </p>
                        <a href="blog-detail.html"> <button class="btn-style"> Read more </button></a>



                    </div>
                </div>

            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 col-12">
                <div class="style-box">
                    <div class="img-box">
                        <img src="asset/frontend/images/img-3.webp" alt="">
                    </div>
                    <div class="text">
                        <h4>Lorem, ipsum dolor </h4>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias enim provident earum
                            quidem ad!
                        </p>
                        <a href="blog-detail.html"> <button class="btn-style"> Read more </button></a>


                    </div>
                </div>

            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 col-12">
                <div class="style-box">
                    <div class="img-box">
                        <img src="asset/frontend/images/img-4.webp" alt="">
                    </div>
                    <div class="text">
                        <h4>Lorem, ipsum dolor </h4>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias enim provident earum
                            quidem ad!
                        </p>
                        <a href="blog-detail.html"> <button class="btn-style"> Read more </button></a>

                    </div>
                </div>

            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 col-12">
                <div class="style-box">
                    <div class="img-box">
                        <img src="asset/frontend/images/img-2.webp" alt="">
                    </div>
                    <div class="text">
                        <h4>facial treatment</h4>
                        <h4>Lorem, ipsum dolor </h4>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias enim provident earum
                            quidem ad!
                        </p>
                        <a href="blog-detail.html"> <button class="btn-style"> Read more </button></a>

                    </div>
                </div>

            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 col-12">
                <div class="style-box">
                    <div class="img-box">
                        <img src="asset/frontend/images/img-1.webp" alt="">
                    </div>
                    <div class="text">
                        <h4>Lorem, ipsum dolor </h4>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias enim provident earum
                            quidem ad!
                        </p>
                        <a href="blog-detail.html"> <button class="btn-style"> Read more </button></a>

                    </div>
                </div>

            </div>

        </div>

    </div>

</section>
@endsection