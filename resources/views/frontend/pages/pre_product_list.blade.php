@extends('frontend.layout.pre_product_list_template')

@section('content')

    <section class="products-section">
        <div class="container">
            <div class="text">
                <h4> Shop {{$collection->title}} Design Products </h4>
            </div>
        </div>
    </section>
    
    @if($products->count() > 0)
        
        <input type="hidden" name="product_front" id="product_front" value="{{$front}}">

        <div class="crt-pre-list">
        <div class="container">
        <div class="flex flex-wrap crt-pre-row">

        @php $key = 0; @endphp
        @foreach($products as $product)                
                
                @php $key++; $product_class = ''; @endphp
                
                {{-- Product ID: {{$product->id}} --}}

                @if($product->product_type=='Bottoms')
                    @php $product_class= "lowre-canva"; @endphp
                @elseif($product->product_type=='Footwear')
                    @php $product_class= "shoes-canva"; @endphp                    
                @elseif($product->product_type=='Phone Cases')
                    @php $product_class= "iphone-canva"; @endphp                    
                @else
                    @php $product_class= "t-shirt-canva"; @endphp                    
                @endif

                <div class="crt-prd-main div_{{$key}} {{$product_class}}">
                    
                    <input type="hidden" name="product_ids_{{$key}}" value="{{$product->id}}">

                    <div id="data_{{$key}}" hidden>{{ $product }}</div>
                    
                        @if($product->product_type=='Bottoms')
                            <div class="prd-left lowre-canva">
                        @elseif($product->product_type=='Footwear')
                            <div class="prd-left shoes-canva">
                        @elseif($product->product_type=='Phone Cases')
                            <div class="prd-left iphone-canva">
                        @else
                            <div class="prd-left t-shirt-canva {{strtolower($product->product_for)}}-{{strtolower($product->product_type)}}">
                        @endif

                        <div class="prd-image">
                            <div style="position: relative" id="canvasParent">
                                <div class="cmn-frame" style="height: 500px; width: 500px; position: absolute; backgorud"
                                    id="canvasBgImage_{{$key}}">
                                </div>
                                <div class="cmn-frame" style="height: 500px; width: 500px; position: relative">
                                    <div class="border-neutral-300 frame-area"
                                        style="
                                            position: absolute;
                                            top: 52%;
                                            left: 48%;                                                    
                                            z-index: 10;
                                        "
                                        id="div_front_{{$key}}" hidden>
                                    </div>                                            
                                </div>
                            </div>

                             <div class="crt-pre-details">
                                <h5><b>Product Name:</b> {{ $product->website_product_name }}</h5>
                                <p class="prc-inf">Price: ${{ $product->product_price }}</p>
                            </div>

							<div class="buy-now">
								<a href="{{ url('/collection/design') }}/{{strtolower($collection->slug)}}/{{strtolower($boycott->slug)}}/{{strtolower($product->product_slug)}}">Buy Now</a>
							</div>
                        </div>
                    </div>
                </div> 
        @endforeach
		</div>
		</div>
		</div>
    @else
        <div class="crt-prd-main" style="text-align: center;font-size: x-large;">
            <p>No Record found!</p>
        </div>
    @endif

    <!-- SPINNER -->
    <div id="loader" hidden wire:loading style="z-index: 2000;"
        class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        <div style="border-top-color: #3498db !important"
            class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
        <p class="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
    </div>    
@endsection
