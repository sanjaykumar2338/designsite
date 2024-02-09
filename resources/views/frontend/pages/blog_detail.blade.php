@extends('frontend.layout.homepagelayout')

@section('content')
<section class="blog-detail">
    <div class="container">
        <div class="text">
            <h2>Read the blog</h2>
        </div>
    </div>
</section>


<section class="text-all">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="text-style">
                    <h4>
                        <li>{!! $blog->title !!}</li>
                    </h4>

                    {!! $blog->description !!}

                </div>

            </div>

        </div>

    </div>
</section>       <!-- ========== Start footer ========== -->
@endsection