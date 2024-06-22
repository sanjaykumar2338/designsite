@extends('frontend.layout.homepagelayout')

@section('content')
    
    <!-- ========== Start products section ========== -->
    <section class="products-section">
        <div class="container">
            <div class="text">
                <h4> Shop {{$slug}} Designs </h4>
            </div>
        </div>
    </section>
    <!-- ========== End products section ========== -->
    
    <!-- ========== Start products ========== -->
    <section class="Products-3 bg-img">
        <div class="container">                     
            <div class="row">
                
                @php
                   //echo "<pre>"; print_r($products);
                @endphp

                @if($collection_desing->count())
                    @foreach($collection_desing as $product)
                        
                        <input type="hidden" name="product_ids" value="{{$product->id}}">

                        @if($product->front_image!="")
                            {{--Product ID: {{$product->id}}--}}
                            <div class="col-lg-3 col-md-6 col-sm-6">
                                <div class="img aos-init aos-animate" data-aos="zoom-in">
                                    <img src="{{fileToUrl($product->front_image)}}" alt="">
                                    
                                 
                                    <div class="text-two">
                                        <h4>{{$product->product_name}}</h4>
                                        @php
                                            $url = url('/').'/shop/'.strtolower($product->collections_type.'-'.'collection').'/'.$product->product_slug;
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
    <!-- ========== End products ========== -->
@endsection