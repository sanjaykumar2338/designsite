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

    <style>
        .container-fluid .col {
            padding: 20px;
            text-align: center;
            font-weight: bold;
            color: #333;
            transition: all 0.3s;
        }

        .container-fluid .container-fluid {
            margin-top: 20px;
        }

        .container-fluid .row {
            gap: 10px; /* Add some spacing between columns */
        }
    </style>
    

    <div class="container-fluid">
        <div class="row">
            <div class="col">Shop By Design</div>
        </div>
    </div>

    <!-- ========== Start products ========== -->
    <section class="Products-3 bg-img">
        <div class="container">                     
            <div class="row">
                
                @php
                    $collections = \App\Models\Collections::all();
                    foreach($collections as $cll) {
                        $collection_design = \App\Models\Boycotts::where('collection', $cll->id)->get();
                @endphp
                @if($collection_design->count())
                    @foreach($collection_design as $product)
                        
                        <input type="hidden" name="product_ids" value="{{$product->id}}">

                        @if($product->feature_image!="")
                            {{--Product ID: {{$product->id}}--}}
                            <div class="col-lg-3 col-md-3 col-sm-6">
                                <div class="img aos-init aos-animate" data-aos="zoom-in">
                                    <img style="height: 300px;" src="{{fileToUrl($product->feature_image)}}" alt="">
                                    <div class="text-two">
                                        @php
                                            $url = url('/').'/collection/design/'.strtolower($collection->slug.'-'.'collection').'/'.$product->slug;
                                        @endphp
                                        <a class="buy_now" href="{{$url}}">Buy</a>
                                    </div>
                                </div>
                            </div>
                        @endif
                    @endforeach
                @else
                    
                @endif
                @php } @endphp
            </div>
        </div>
    </section>

    <!-- ========== Start products section ========== -->
    <section class="Products" style="background-image:url('')">
        <div class="container">     
            {!! $page_content !!}
        </div>
    </section>

    <!-- ========== End products section ========== -->
    <!-- ========== End products ========== -->
@endsection