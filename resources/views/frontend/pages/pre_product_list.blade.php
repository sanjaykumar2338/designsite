@extends('frontend.layout.pre_product_list_template')

@section('content')

    <style>
       
        h1, h2 {
            color: #0c9e98;
        }
        p {
            margin: 10px 0;
        }
        ul {
            margin: 10px 0 20px 20px;
            text-align: justify;
            list-style: inside;
        }
        ul li {
            margin-bottom: 5px;
        }
        .extra_content{
            text-align: left;
            padding-left: 40px;
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

        .container-fluid .selected {
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
                    //$boycott = \App\Models\Boycotts::where('collection',$coll->id)->first();
                    //echo "<pre>";  print_r($boycott);
                @endphp

                @if($collection->slug==$coll->slug)
                    <div class="col selected" onclick="window.location.href='{{ url('collection/design/' . $coll->slug . '-collection/'. $design_type) }}'">{{$coll->title}} Collection</div>
                @else
                    <div class="col" onclick="window.location.href='{{ url('collection/design/' . $coll->slug . '-collection/'. $design_type) }}'">{{$coll->title}} Collection</div>
                @endif
            @endforeach
        </div>

        <br>
        <div class="row">
            @foreach(['tshirts'=>'T-Shirts','hoodies'=>'Hoodies','sweatshirts'=>'Sweatshirts'] as $key=>$coll)
                @if($key==$design_type)
                <div onclick="window.location.href='{{ url('collection/design/' . $collection->slug . '-collection/'. $key) }}'" class="col selected"
                >{{$coll}}</div>
                @else
                <div onclick="window.location.href='{{ url('collection/design/' . $collection->slug . '-collection/'. $key) }}'" class="col"
                >{{$coll}}</div>
                @endif
            @endforeach
        </div>
        <br>

    </div>

    <section class="products-section">
        <div class="container">
            <div class="text">
                <h4> Shop {{$collection->title}} Design Products </h4>
            </div>
        </div>
    </section>

    <style>
    .card-img-top {
        height: 200px; /* Set a fixed height */
        object-fit: cover; /* Ensures images fill the space without distortion */
        position: relative;
    }
    .canvas-container {
        position: relative;
        height: 340px;
        width: 324px;
        margin: auto;
    }
    .canvas-container:hover::after {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.6);
        color: #fff;
        padding: 5px 10px;
        font-size: 0.9em;
        border-radius: 5px;
    }
    .loader {
        border: 4px solid #f3f3f3;
        border-top: 4px solid #eb3e32;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 1s linear infinite;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
    .buy-now .btn {
        background-color: #eb3e32; /* Custom button color */
        font-size: 1.1em; /* Make button text slightly larger */
    }
</style>

<div class="container my-4">
    @if($boycott->count() > 0)
        <div class="row row-cols-1 row-cols-md-3 g-4">
            @foreach($boycott as $bt)
                @if(isset($bt->blog_image) && isset($bt->title) && fileToUrl($bt->blog_image) != 'https://causestand.com/storage/')
                    <div class="col">
                        <div class="card h-100">
                            <div class="canvas-container" id="canvas-container-{{ $loop->index }}">
                                <div class="loader" id="loader-{{ $loop->index }}"></div>
                                <canvas id="canvas-{{ $loop->index }}" width="324" height="340" style="display:none;"></canvas>
                            </div>
                            <div class="card-body text-center">
                                <h5 class="card-title" style="display:none;">{{ $bt->title }}</h5>
                                <div class="buy-now">
                                    <button class="btn btn-primary">Buy</button>
                                </div>
                            </div>
                        </div>

                        <script>
                            document.addEventListener("DOMContentLoaded", function() {
                                var canvas = new fabric.Canvas('canvas-{{ $loop->index }}');
                                var loader = document.getElementById('loader-{{ $loop->index }}');
                                var canvasElement = document.getElementById('canvas-{{ $loop->index }}');

                                // Load the background image
                                fabric.Image.fromURL('{{$background_image}}', function(bgImg) {
                                    bgImg.set({
                                        originX: 'center',
                                        originY: 'center',
                                        left: canvas.width / 2,
                                        top: canvas.height / 2,
                                        selectable: false
                                    });
                                    bgImg.scaleToWidth(canvas.width);
                                    bgImg.scaleToHeight(canvas.height);
                                    canvas.setBackgroundImage(bgImg, canvas.renderAll.bind(canvas));

                                    // Load the overlay image
                                    fabric.Image.fromURL('{{ fileToUrl($bt->blog_image) }}', function(overlayImg) {
                                        overlayImg.set({
                                            left: canvas.width / 2,
                                            top: canvas.height / 2,
                                            originX: 'center',
                                            originY: 'center',
                                            selectable: false
                                        });

                                        // Adjust scaling
                                        var scaleFactor = 0.4; // Adjust scaling as needed
                                        overlayImg.scaleToWidth(canvas.width * scaleFactor);
                                        overlayImg.scaleToHeight(canvas.height * scaleFactor);

                                        canvas.add(overlayImg);
                                        canvas.renderAll();

                                        // Hide the loader and show the canvas once loading is complete
                                        loader.style.display = 'none';
                                        canvasElement.style.display = 'block';
                                    });
                                });
                            });
                        </script>
                    </div>
                @endif
            @endforeach
        </div>
    @else
        <div class="crt-prd-main" style="text-align: center; font-size: x-large;">
            <p>No Record found!</p>
        </div>
    @endif
</div>



    @if($products->count() > 0 && false)
        
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
                                @if(isset($collection) && isset($boycott) && isset($product))
                                    <a href="{{ url('/collection/design') }}/{{ strtolower($collection->slug) }}/{{ strtolower($boycott->slug) }}/{{ strtolower($product->product_slug) }}">Buy Now</a>
                                @else
                                    <a href="{{ url('/collection/design') }}/{{ strtolower($collection->slug) }}/boycott/{{ strtolower($product->product_slug) }}">Buy Now</a>
                                @endif
                            </div>

                        </div>
                    </div>
                </div> 
        @endforeach
		</div>
		</div>
		</div>
    @else
        
    @endif

    @php
    //echo $slug;

    if ($slug == 'oversight') {
            echo <<<HTML
            <div class="extra_content">
                <h1>Boycott Bucks Protest Wear - Stand against Unethical Corporations</h1>
                <p>In a world where corporate practices often go unchecked, the "Boycott Bucks" design from the Oversight Collection empowers advocates to make their voices heard. Available in t-shirts, hoodies, and sweatshirts, this design is a call to action for those who demand accountability from businesses that support unethical practices. Wear this design to protests, on the streets, or in your daily life to show that you stand against corporate bias. Each piece is crafted to be both a fashion statement and a tool for advocacy, ensuring that your message resonates loud and clear.</p>

                <h2>Boycott Bucks Apparel List Options - Shop the Oversight Collection</h2>
                <ul>
                    <li><strong>T-Shirt:</strong> Comfortable, casual, and perfect for everyday wear.</li>
                    <li><strong>Hoodie:</strong> Stay warm and stylish while making a statement.</li>
                    <li><strong>Sweatshirt:</strong> A versatile piece that combines comfort with advocacy.</li>
                </ul>
            </div>
    HTML;
        }

        if ($slug == 'traitor') {
            echo <<<HTML
            <div class="extra_content">
                <h1>Reject AIPAC for Peace - Political Accountability Clothing</h1>
                <p>The "Reject AIPAC" design from the Traitor Collection is a bold statement against the influence of lobbying groups in politics. This design challenges the double-loyalty of lawmakers and calls for political integrity that produces peace. Available in t-shirts, hoodies, and sweatshirts, each piece is crafted to make an impact.</p>
                <p>Whether worn at protests or in daily life, this design serves as a reminder of the need for transparency and accountability in governance. Peacefully stand against the undue influence of AIPAC and other lobbying groups by wearing this powerful design.</p>

                <h2>Reject AIPAC Clothing Options - Shop the Traitor Collection</h2>
                <ul>
                    <li><strong>T-Shirt:</strong> Lightweight and comfortable, perfect for raising awareness.</li>
                    <li><strong>Hoodie:</strong> Stay warm and vocal with this protest-ready piece.</li>
                    <li><strong>Sweatshirt:</strong> Ideal for layering, combining comfort with a strong message.</li>
                </ul>
            </div>
    HTML;
        }

        if ($slug == 'trader') {
            echo <<<HTML
            <div class="extra_content">
                <h1>Lawmakers Making Laws and Trades - Conflict and Greed Clothes</h1>
                <p>The "Law Making and Insider Trading" design from the Trader Collection addresses the unethical practice of insider trading by lawmakers. This design calls for transparency and ethical conduct in governance, challenging those who use their positions for personal gain. Available in t-shirts, hoodies, and sweatshirts, this design is perfect for those who demand fairness and integrity from their elected officials. Wear this design to show that you stand against corruption and for the ethical making of laws.</p>

                <h2>Insider Trading Clothes Styles - Shop the Trader Collection</h2>
                <ul>
                    <li><strong>T-Shirt:</strong> A classic fit, perfect for making a statement.</li>
                    <li><strong>Hoodie:</strong> Comfortable and bold, ideal for any protest or rally.</li>
                    <li><strong>Sweatshirt:</strong> Cozy and impactful, a great way to stay warm while advocating for change.</li>
                </ul>
            </div>
    HTML;
        }

        if ($slug == 'propaganda') {
            echo <<<HTML
            <div class="extra_content">
                <h1>Biased Influence Apparel - Media Accountability Clothing</h1>
                <p>The "Biased Influence" design from the Propaganda Collection is a powerful critique of media misinformation. This design calls out the media's role in shaping public opinion through biased reporting and propaganda. Available in t-shirts, hoodies, and sweatshirts, this design empowers advocates to demand truth and accountability from the press.</p>
                <p>Wear this design to protests, in everyday life, or on social media to show that you are part of the fight against misinformation and propaganda.</p>

                <h2>No Fake News Clothing Options - Shop the Propaganda Collection</h2>
                <ul>
                    <li><strong>T-Shirt:</strong> Ideal for daily wear, helping to spread awareness.</li>
                    <li><strong>Hoodie:</strong> Warm, comfortable, and perfect for making a public statement.</li>
                    <li><strong>Sweatshirt:</strong> A versatile piece that combines comfort with a message for media accountability.</li>
                </ul>
            </div>
    HTML;
        }
    @endphp


    <!-- SPINNER -->
    <div id="loader" hidden wire:loading style="z-index: 2000;"
        class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        <div style="border-top-color: #3498db !important"
            class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
        <p class="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
    </div>    
@endsection
