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
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            padding: 20px;
            text-align: center;
            font-weight: bold;
            color: #333;
            transition: all 0.3s;
        }

        .container-fluid .col:hover {
            background-color: #eb3e32;
            color: white;
            transform: scale(1.05);
            cursor: pointer;
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
            @foreach(\App\Models\Collections::all() as $coll)
                @php
                    $boycott = \App\Models\Boycotts::where('collection',$coll->id)->first();
                    //echo "<pre>";  print_r($boycott);
                @endphp
                <div class="col" onclick="window.location.href='{{ url('collection/design/' . $coll->slug . '-collection/'. $boycott->slug) }}'"
                >{{$coll->title}} Collection</div>
            @endforeach
        </div>
    </div>

    <!-- ========== Start products ========== -->
    <section class="Products-3 bg-img">
        <div class="container">                     
            <div class="row">
                
                @php
                   //echo "<pre>"; print_r($products);
                @endphp

                @if($collection_design->count())
                    @foreach($collection_design as $product)
                        
                        <input type="hidden" name="product_ids" value="{{$product->id}}">

                        @if($product->feature_image!="")
                            {{--Product ID: {{$product->id}}--}}
                            <div class="col-lg-3 col-md-6 col-sm-6">
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
                    <p>No Product Found!</p>
                @endif
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