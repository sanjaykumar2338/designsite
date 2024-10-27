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
            <div class="col" onclick="window.location.href='{{ url('shop/shop-by-product-type/shirts') }}'"
            >T-Shirts</div>
            <div class="col" onclick="window.location.href='{{ url('shop/shop-by-product-type/hoodies') }}'"
            >Hoodies</div>
            <div class="col" onclick="window.location.href='{{ url('shop/shop-by-product-type/sweatshirts') }}'"
            >Sweatshirts</div>
        </div>
    </div>

    <!-- ========== Start products ========== -->
    <section class="Products-3 bg-img">
        <div class="container">                     
            <div class="row">
                @php
                    $collections = \App\Models\Collections::all();
                @endphp

                @foreach($collections as $coll)
                    @php
                        $collection_design = App\Models\Boycotts::where('collection', $coll->id)->get();
                    @endphp

                    @if($collection_design->count())
                        @foreach($collection_design as $product)
                            <input type="hidden" name="product_ids" value="{{ $product->id }}">

                            @if($product->feature_image)
                                {{-- Product ID: {{ $product->id }} --}}
                                <div class="col-lg-3 col-md-6 col-sm-6">
                                    <div class="img" data-aos="zoom-in">
                                        <img style="height: 300px;" src="{{ fileToUrl($product->feature_image) }}" alt="">
                                        <div class="text-two">
                                            @php
                                                $url = url('/collection/design/type/'.strtolower($coll->slug.'-collection').'/'.$product->slug.'/'.$product_type);
                                            @endphp
                                            <a class="buy_now" href="{{ $url }}">Buy</a>
                                        </div>
                                    </div>
                                </div>
                            @endif
                        @endforeach
                    @else
                        <p>No Product Found!</p>
                    @endif
                @endforeach
            </div>
        </div>
    </section>
@endsection