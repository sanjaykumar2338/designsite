@extends('frontend.layout.homepagelayout')

@section('content')

<!-- ========== Start blog-heading ========== -->
<section class="blog-heading">
    <div class="container">
        <div class="text">
            <h1>Political Insights and Causes for Advocacy - Cause Stand Blog</h1>
        </div>
    </div>
</section>
<!-- ========== End blog-heading ========== -->
<!-- ========== Start blog-cards ========== -->
<section class="cards">
    <div class="container">
        
        <h2 class="heading-style" style="text-align: left;">Uncovering Political Strategies and Global Issues</h2>
        <p>Welcome to the Cause Stand blog, a platform dedicated to shedding light on global issues and advocacy movements. Through in-depth analyses and compelling narratives, we uncover the political strategies behind international conflicts, political bigotry, and historical animosities. Join our mission to illuminate these crucial topics.</p>
        
        <div class="row">
            @if($blogs)
                @foreach($blogs as $blog)
                    <div class="col-lg-4 col-md-6 col-sm-12  col-12">
                        <div class="style-box">
                            <div class="img-box">
                                <img src="{{$blog->feature_image}}" alt="">
                            </div>
                            <div class="text">
                                <h4>{{$blog->title}}</h4>
                                <p>
                                    {!! substr(strip_tags($blog->description), 0, 100) !!}...
                                </p>
                                <a href="{{url('blog')}}/{{$blog->slug}}"> <button class="btn-style"> Read more </button></a>
                            </div>
                        </div>
                    </div>
                @endforeach
            @endif
        </div>
        <br><br>
        <h2 class="heading-style" style="text-align: left;">Join the debate for Justice and Peace</h2>
        <p>Join us in seeking change and standing up to advocate for justice and peace. Stay informed, get involved, and be part of the debate that makes a meaningful impact. Respond to our insightful blogs, share your opinions, and engage with each narrative. Together, we can amplify voices, challenge narratives, and drive positive change in our world.</p>
    </div>
</section>
@endsection