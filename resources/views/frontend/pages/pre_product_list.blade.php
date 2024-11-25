@extends('frontend.layout.pre_product_list_template')

@section('content')

    <style>
       
        .product_list_data h1, h2 {
            color: #0c9e98;
        }
        .product_list_data p {
            margin: 10px 0;
        }
        .product_list_data ul {
            margin: 10px 0 20px 20px;
            text-align: justify;
            list-style: inside;
        }
        .product_list_data ul li {
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

    @if(session('error'))
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            {{ session('error') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif

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
        height: 220px; /* Increased height */
        object-fit: cover;
        position: relative;
    }
    .canvas-container {
        position: relative;
        height: 440px; /* Adjusted height for better aspect ratio */
        width: 400px; /* Increased width */
        margin: auto;
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
    .view-buttons {
        margin-top: 10px;
        text-align: center;
    }
    .view-buttons button {
        margin: 0 5px;
        padding: 5px 15px;
        font-size: 0.9em;
        border: none;
        background-color: #eb3e32;
        color: white;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s;
    }
    .view-buttons button:hover {
        background-color: #c72d27;
    }
    .buy-now .btn {
        background-color: #eb3e32;
        font-size: 1.1em;
        margin-top: 10px;
    }
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
</style>

<div class="container my-4 product_list_data">
    @if($boycott->count() > 0)
        <div class="row row-cols-1 row-cols-md-3 g-4">
            @foreach($boycott as $bt)
                @if(isset($bt->blog_image) && isset($bt->title) && fileToUrl($bt->blog_image) != 'https://causestand.com/storage/')
                    <div class="col">
                    <div class="card h-100">
                        <div class="canvas-container clickable-canvas" 
                            id="canvas-container-{{ $loop->index }}" 
                            data-url="{{url('/')}}/collections/{{$collection->slug}}/{{$design_type}}/{{$bt->slug}}">
                            <div class="loader" id="loader-{{ $loop->index }}"></div>
                            <canvas id="canvas-{{ $loop->index }}" width="400" height="440" style="display:none; cursor: pointer;"></canvas>
                        </div>
                        <div class="view-buttons">
                            <button style="border-radius:25px;" onclick="showView('{{ $loop->index }}', 'front')">Front</button>
                            <button style="border-radius:25px;" onclick="showView('{{ $loop->index }}', 'back')">Back</button>
                        </div>
                        <div class="card-body text-center">
                            <h5 class="card-title">{{ $bt->title }}</h5>

                            @if(!empty($bt->price))
                                <p class="price">Price: ${{ number_format($bt->price, 2) }}</p>
                            @endif

                            @if(!empty($bt->design_number))
                                <p class="design-number">Design No: {{ $bt->design_number }}</p>
                            @endif
                            
                            <div class="buy-now">
                                <a class="btn btn-primary" style="background-color: #eb3e32; font-size: 11px; margin-top: 10px; width: 170px; text-decoration: underline;" href="{{url('/')}}/collections/{{$collection->slug}}/{{$design_type}}/{{$bt->slug}}">Shop</a>
                            </div>
                        </div>
                    </div>

                        <script>
                            (function(index) {
                                var canvas = new fabric.Canvas('canvas-' + index);
                                var loader = document.getElementById('loader-' + index);
                                var canvasElement = document.getElementById('canvas-' + index);
                                var back_image_size = 3.5;
                                var width = 0.45;

                                if('{{$design_type}}'=='tshirts'){
                                    var frontBackground = 'https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/ghost/front/05_BC_3413_XL_Ghost_base_whitebg.png?v=1702297406';
                                    var backBackground = 'https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/ghost/back/05_BC_3413_XL_Ghost_back_base_whitebg.png?v=1702297406';
                                }

                                if('{{$design_type}}'=='hoodies'){
                                    back_image_size = 2.8;
                                    width = 0.35;
                                    var frontBackground = 'https://files.cdn.printful.com/m/g18500/medium/ghost/front/05_gildan18500_ghost_front_base_whitebg.png?v=1700731048';
                                    var backBackground = 'https://files.cdn.printful.com/m/g18500/medium/ghost/back/05_gildan18500_ghost_back_base_whitebg.png?v=1700731048';
                                }

                                if('{{$design_type}}'=='sweatshirts'){
                                    var frontBackground = 'https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/front/05_ghost_front_base_whitebg.png?v=1702459598';
                                    var backBackground = 'https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/back/05_ghost_back_base_whitebg.png?v=1702459598';
                                }

                                var frontImage = '{{ fileToUrl($bt->blog_image) }}';
                                var backImage = '{{ asset("collectionback/T1000.png") }}';

                                if ('{{$collection->slug}}' === 'oversight') {
                                    backImage = '{{ asset("collectionback/oversight.png") }}';
                                } else if ('{{$collection->slug}}' === 'traitor') {
                                    backImage = '{{ asset("collectionback/traitor.png") }}';
                                } else if ('{{$collection->slug}}' === 'trader') {
                                    backImage = '{{ asset("collectionback/traitor.png") }}';
                                } else if ('{{$collection->slug}}' === 'propaganda') {
                                    backImage = '{{ asset("collectionback/propaganda.png") }}';
                                }

                                if ('{{ $design_type }}' === 'hoodies') {
                                    [frontImage, backImage] = [backImage, frontImage];
                                }

                                var imagesCache = {};
                                function preloadImage(url, callback) {
                                    if (imagesCache[url]) {
                                        callback(imagesCache[url]);
                                    } else {
                                        fabric.Image.fromURL(url, function(img) {
                                            imagesCache[url] = img;
                                            callback(img);
                                        });
                                    }
                                }

                                function loadCanvas(background, overlay) {
                                    canvas.clear();
                                    loader.style.display = 'block';

                                    preloadImage(background, function(bgImg) {
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

                                        preloadImage(overlay, function(overlayImg) {
                                            overlayImg.set({
                                                left: canvas.width / 2,
                                                top: canvas.height / 2.5,
                                                originX: 'center',
                                                originY: 'center',
                                                selectable: false
                                            });

                                            var scaleFactor = Math.min(canvas.width / overlayImg.width, canvas.height / overlayImg.height) * width; // Adjusted for more padding
                                            overlayImg.scale(scaleFactor);

                                            canvas.add(overlayImg);
                                            canvas.renderAll();

                                            loader.style.display = 'none';
                                            canvasElement.style.display = 'block';
                                        });
                                    });
                                }

                                function loadCanvasBack(background, overlay) {
                                    canvas.clear();
                                    loader.style.display = 'block';

                                    preloadImage(background, function(bgImg) {
                                        bgImg.set({
                                            originX: 'center',
                                            originY: 'center',
                                            left: canvas.width / 2,
                                            top: canvas.height / 1.8,
                                            selectable: false
                                        });
                                        bgImg.scaleToWidth(canvas.width);
                                        bgImg.scaleToHeight(canvas.height);
                                        canvas.setBackgroundImage(bgImg, canvas.renderAll.bind(canvas));

                                        preloadImage(overlay, function(overlayImg) {
                                            overlayImg.set({
                                                left: canvas.width / 2,
                                                top: canvas.height / back_image_size,
                                                originX: 'center',
                                                originY: 'center',
                                                selectable: false
                                            });

                                            var scaleFactor = Math.min(canvas.width / overlayImg.width, canvas.height / overlayImg.height) * 0.20; // Adjusted for more padding
                                            overlayImg.scale(scaleFactor);

                                            canvas.add(overlayImg);
                                            canvas.renderAll();

                                            loader.style.display = 'none';
                                            canvasElement.style.display = 'block';
                                        });
                                    });
                                }

                                if('{{$design_type}}'=='hoodies'){
                                    loadCanvasBack(backBackground, backImage);
                                }else{
                                    loadCanvas(frontBackground, frontImage);
                                }
                                window['showView' + index] = function(view) {
                                    if (view === 'front') {
                                        loadCanvas(frontBackground, frontImage);
                                    } else {
                                        loadCanvasBack(backBackground, backImage);
                                    }
                                };

                                document.querySelector(`button[onclick="showView('{{ $loop->index }}', 'front')"]`).onclick = function() {
                                    window['showView' + index]('front');
                                };
                                document.querySelector(`button[onclick="showView('{{ $loop->index }}', 'back')"]`).onclick = function() {
                                    window['showView' + index]('back');
                                };
                            })({{ $loop->index }});
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

<script>
    // Add click event listener to canvas-container elements
    document.querySelectorAll('.clickable-canvas').forEach(container => {
        container.style.cursor = 'pointer'; // Add pointer cursor for the canvas-container
        container.addEventListener('click', () => {
            const url = container.getAttribute('data-url');
            if (url) {
                window.location.href = url; // Redirect to the specified URL
            }
        });
    });
</script>

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

    if ($slug == 'oversight' && $design_type=='tshirts') {
            echo <<<HTML
            <div class="extra_content product_list_data">
                <h1>Empower Your Advocacy with Oversight Collection T-Shirts</h1>
                <p>Oversight Collection T-Shirts go beyond fashion—they are tools for change, designed to spark conversations and ignite movements. Every t-shirt in this collection is a wearable testament to the power of transparency and accountability. The bold messages featured on each tee challenge injustice and demand action, making them the perfect attire for activists, truth-seekers, and anyone who refuses to stand by silently.</p>

                <h2>Transform Your Wardrobe, Transform the World</h2>
                <p>Fashion is powerful. With Oversight Collection T-Shirts, you don’t just dress—you express. These t-shirts are a platform for individuals who are passionate about holding institutions and individuals accountable for their actions. Each design serves as both a call to action and a declaration of your values. Wear them proudly and make a statement that resonates far beyond the fabric.</p>

                <h3>Impactful Design, Purposeful Fashion</h3>

                <h2>Join the Oversight Movement: Take Action Today</h2>

                <p>Are you ready to stand up, speak out, and demand more from those in power? The Oversight Collection T-Shirts provide the perfect opportunity to do just that. They aren’t just clothes—they’re part of a larger movement for transparency, justice, and accountability. By wearing them, you’re aligning yourself with those who refuse to let corruption go unnoticed.</p>

                <h3>Order Now: Make a Statement That Matters</h3>

                <p>Don’t wait to be heard. Order your Oversight Collection T-Shirt today and take the first step toward challenging injustice. This is more than a purchase—it’s a pledge to support transparency, fight corruption, and stand for truth. Wear it, share it, and lead the charge for change.</p>

                <h2>Final Thoughts on the Oversight Collection T-Shirts:</h2>

                <p>Oversight Collection T-Shirts offer more than just a way to dress—they offer a way to express your passion for advocacy, accountability, and social change. These shirts are designed for activists who are ready to speak truth to power, and they provide an easy way to get involved in movements that demand justice. Join the cause, wear your voice, and make the world a better place with every step you take.</p>

                <p>Every shirt is a work of art, designed with a mission. The Oversight Collection features revolutionary slogans such as "Boycott Corruption" and "Demand Transparency". These messages are crafted to incite change by encouraging dialogue, fostering awareness, and challenging societal norms. These aren’t just designs—they are movements woven into the fabric.</p>

                <h2>Why Choose the Oversight Collection T-Shirts?</h2>

                <p>When you wear an Oversight Collection t-shirt, you’re joining a community committed to justice, truth, and transparency. Here’s why our shirts are more than just clothing—they’re a powerful statement:</p>

                <ul>
                    <li><strong>Revolutionary Advocacy:</strong>The Oversight Collection speaks to the heart of the modern activism movement. Our t-shirts are designed to make the invisible visible, shedding light on injustices that often go unnoticed.</li>
                    <li><strong>Premium Quality for Lasting Impact:</strong>Crafted with care and built to last, these t-shirts are made from high-quality materials that endure wear and tear. Wear your values loud and proud, wherever life takes you.</li>
                    <li><strong>Purpose-Driven Apparel:</strong>Each purchase supports efforts to bring accountability to those in power, ensuring your advocacy goes further than just fashion.</li>
                </ul>

                <h3>Elevate Your Activism: Wear What You Believe In</h3>

                <p>Advocacy is an ongoing conversation, and the Oversight Collection t-shirts make sure your voice is heard in every setting. Whether you’re at a rally, on your college campus, or simply living your daily life, your message is clear: the time for transparency is now. These shirts amplify the voices that need to be heard, sparking important dialogues about accountability and justice.</p>

                <h2>The Power of Personal Expression Through Fashion</h2>
                <p>Fashion speaks louder than words sometimes, and the Oversight Collection ensures your voice is never silenced. With every wear, you stand against corruption, challenge apathy, and invite others to join the movement for accountability. These shirts aren’t just worn—they are experienced. When you wear them, you’re contributing to the global push for truth and justice.</p>

                <h3>How to Style Your Oversight T-Shirt</h3>

                <p>Our t-shirts are designed for versatility, so they can be paired with almost any style. Whether you’re rocking a casual look with jeans or dressing it up for a more polished appearance, these shirts make it easy to wear your advocacy with pride:</p>

                <ul>
                    <li><strong>With Jeans:</strong>Perfect for casual days when you want to make a statement.</li>
                    <li><strong>Layered with a Jacket:</strong>Make your shirt pop and stand out even more by pairing it with your favorite outerwear.</li>
                    <li><strong>For a Protest or Rally:</strong>These shirts are the ultimate gear for any activist event, sending a clear message of resistance and change.</li>
                </ul>
            </div>
    HTML;
        }

        if ($slug == 'oversight' && $design_type=='hoodies') {
            echo <<<HTML
            <div class="extra_content product_list_data">
                <h1>Oversight Collection Hoodies: Amplify Your Activism</h1>
                <p>When the cold winds blow, let your activism warm the world with the <b>Oversight Collection Hoodies</b>. Designed to keep you cozy and impactful, these hoodies aren’t just about staying comfortable—they’re about making a statement. Stand up for transparency, wear your beliefs, and challenge those in power with every thread. These hoodies speak volumes, and they demand that the powerful be held accountable for their actions.<p>

                <h2>Wear What Matters: A Hoodie for Accountability</h2>
                <p>The Oversight Collection Hoodie is more than just outerwear—it’s a uniform for those who dare to challenge injustice. Crafted with purpose, this hoodie is designed to make activism easy, stylish, and bold. When you wear it, you’re not just keeping warm, you’re joining a movement of people who believe in accountability and truth. It’s time to stop standing by and start standing up.</p>

                <h3>Designed for Change, Built to Last</h3>
                <p>Just like the fight for justice, the <b>Oversight Collection Hoodies</b> are built to last. Whether you're marching in the streets or just out and about, these hoodies are made from durable, high-quality materials that will withstand the test of time—and the resistance. They feature bold, thought-provoking slogans like "End Corruption", "Transparency Now!", and "Accountability First". With every wear, you’re helping to spark crucial conversations about justice and reform.</p>

                <h2>Why Choose Oversight Collection Hoodies?</h2>

                <p>The <b>Oversight Collection Hoodies</b> are more than just clothing—they're a movement. Here's why they’re a must-have for any advocate looking to make a difference:<p>

                <ul>
                    <li><strong>A Statement of Advocacy:</strong>Each hoodie sends a powerful message about standing against corruption and injustice. It's the perfect way to demonstrate that accountability matters to you.</li>
                    <li><strong>Quality You Can Trust:</strong>Made from premium materials, these hoodies are designed to be as resilient as the cause they represent. Whether you're on the streets or lounging at home, they'll keep you comfortable and active in your mission.</li>
                    <li><strong>Join the Movement:</strong>Wearing an Oversight Collection hoodie means you're not just a bystander—you're a part of the larger push for transparency and reform. Your hoodie is a flag that flies for justice.</li>
                </ul>

                <h3>Let Your Hoodie Speak for You</h3>
                <br>
            </div>
    HTML;
        }

        if ($slug == 'oversight' && $design_type=='sweatshirts') {
            echo <<<HTML
            <div class="extra_content product_list_data">
            <h1>Oversight Collection Sweatshirts: Champion Justice Every Day</h1>
                <p>Stay warm, stay vocal, and stay committed to justice with the Oversight Collection Sweatshirts. This sweatshirt isn’t just a piece of clothing—it’s a statement of resilience and responsibility. It’s designed for activists who believe in holding the powerful accountable, for people who demand transparency, and for those who know that silence isn’t an option. With bold designs and a commitment to change, these sweatshirts empower you to challenge corruption in style.</p>
                <br> 
                <h2>Wear Your Truth: Sweatshirts That Speak for You</h2>
                <p>When you put on the Oversight Collection Sweatshirt, you are not just wrapping yourself in fabric—you’re wearing your commitment to justice, your fight for accountability, and your unwavering belief in transparency. Every design, from "Expose the Lies" to "Transparency Now," challenges the status quo and demands action. It’s more than a trend—it’s a movement, and you are the catalyst for change.</p>
                <br> 
                <h3>Crafted for Comfort, Designed for Advocacy</h3>
                <p>Comfort and advocacy go hand in hand with the Oversight Collection Sweatshirts. Made with premium materials that provide the perfect blend of softness and durability, these sweatshirts are suitable for any occasion, whether you’re rallying for a cause or showing your support for justice in daily life. The high-quality fabric ensures that while you’re making a bold statement, you’re also staying comfortable enough to take action wherever the fight for justice leads you.</p>
                <br> 
                <h2>Why Choose Oversight Collection Sweatshirts?</h2>
                <p>The Oversight Collection Sweatshirts are the ideal garments for those who believe in taking a stand. These sweatshirts offer the perfect combination of style and comfort, keeping you cozy while amplifying your message of accountability and justice. Built with durable, high-quality material, they’re designed to endure, just like the fight for transparency. Every sweatshirt carries a bold message for change, contributing to the growing demand for accountability. It’s time to stop standing by and start standing up—this is your moment to be heard.</p>
                <br> 
                <h3>Be the Change You Want to See in the World</h3>
                <p>Every time you wear an Oversight Collection Sweatshirt, you’re making a statement. Whether at a protest or walking through the city, your sweatshirt conveys a powerful message: it’s time to demand accountability. When you wear it, you challenge the corruption plaguing society and become the voice for those who have been silenced. Every sweatshirt worn signifies one more person joining the fight for a better, more transparent world.</p>
                <br> 
                <h2>Style Your Activism: Sweatshirts for Every Occasion</h2>
                <p>The Oversight Collection Sweatshirts aren’t just for activism events—they’re versatile enough for everyday wear. Pair your sweatshirt with casual jeans for a laid-back look that keeps your message loud and clear. Layer it with a jacket for extra warmth and style—whether it’s a leather jacket or a bomber, your sweatshirt will always make a bold statement. Wear it proudly to protests and rallies, amplifying the collective voice for change.</p>
                <br> 
                <h3>Your Activism Starts with Your Apparel</h3>
                <p>Your activism begins with how you present yourself, and the Oversight Collection Sweatshirts allow you to showcase your passion for justice and demand accountability. By wearing one, you align your values with your actions. The more people who wear these sweatshirts, the stronger the collective call for transparency and justice becomes. It’s more than just clothing—it’s a movement you can wear.</p>
                <br> 
                <h2>Take Action Now: Order Your Oversight Sweatshirt</h2>
                <p>Don’t wait for change—be the change you wish to see in the world. Order your Oversight Collection Sweatshirt today and wear it as a reminder that justice cannot wait. It’s time to stand for transparency, hold the powerful accountable, and speak truth to power. When you wear this sweatshirt, you’re not just staying warm—you’re showing the world where you stand.</p>
                <br> 
                <h3>Join the Oversight Movement and Make a Difference</h3>
                <p>The Oversight Movement needs you. Order your Oversight Collection Sweatshirt and be part of the growing movement for justice, accountability, and transparency. This sweatshirt represents more than just fabric—it’s a testament to your commitment to fighting for what’s right. Don’t just talk about change—wear it. Be part of something larger, something that will leave a lasting impact.</p>
            </div>
        HTML;
        }

        if ($slug == 'traitor' && $design_type=='tshirts') {
            echo <<<HTML
            <div class="extra_content product_list_data">
                <h1>Traitor Collection T-Shirts: Wear Your Stand for Justice</h1>
                <p>Wearing the Traitor Collection T-Shirt isn’t just about fashion—it’s about integrity. These shirts are designed to ensure that your values are clear for all to see. It’s a bold declaration of your belief in holding power to account and your refusal to allow betrayal to go unchallenged. Whether you’re protesting against corrupt politicians or demanding corporate transparency, your t-shirt will speak for you, ensuring that your voice isn’t drowned out.</p>
                <br> 
                <h3>Every Action Counts: Wear Your Advocacy Loud and Proud</h3>
                <p>Every time you wear the Traitor Collection T-Shirt, you are participating in something bigger than yourself. This t-shirt is a tool for advocacy—it’s your way of showing that you care about the issues that affect the world. By wearing it, you make an important statement that betrayal won’t go unchecked. You take a stand for integrity, and with every shirt worn, you encourage others to do the same.</p>
                <br> 
                <h2>Style Your Advocacy: Versatile and Powerful</h2>
                <p>The Traitor Collection T-Shirt isn’t just for protests—it’s versatile enough to be worn anytime you want to send a message. Here are some great ways to incorporate it into your everyday wardrobe:</p>
                <ul>
                <li><strong>Pair with Jeans for a Casual Look:</strong> For a laid-back yet impactful look, pair the Traitor Collection T-Shirt with your favorite jeans. It's a great way to make a statement without saying a word.</li>
                <li><strong>Layer with a Jacket for Extra Style:</strong> For cooler days, layer your t-shirt with a jacket or hoodie to keep your message loud and clear. No matter the weather, the fight for justice never stops.</li>
                <li><strong>Perfect for Political Rallies:</strong> Wear it proudly at political rallies, protests, or social justice events. Let your t-shirt amplify the message and inspire others to join the movement.</li>
                </ul>
                <br> 
                <h3>Now Is the Time to Act: Order Your Traitor Collection T-Shirt Today</h3>
                <p>The time to act is now. Order your Traitor Collection T-Shirt today and stand up for integrity, justice, and accountability. By wearing it, you join a growing movement demanding that betrayal be exposed and the truth be heard. It’s more than just a shirt—it’s a declaration of your values and a commitment to change.</p>
                <br> 
                <h2>Take a Stand: Wear Your Activism on Your Sleeve</h2>
                <p>Now is the time to take action. The Traitor Collection T-Shirt empowers you to speak out, stand up, and demand justice. Every time you wear it, you contribute to the growing voice of activists who believe in exposing betrayal and fighting for a better world. Don’t wait—order yours today and wear your activism proudly.</p>
            </div>
            HTML;
        }

        if ($slug == 'traitor' && $design_type=='hoodies') {
            echo <<<HTML
            <div class="extra_content product_list_data">
            <h1>Traitor Collection Hoodies: Wear Your Justice, Stand for Integrity</h1>
            <p>The Traitor Collection Hoodies are more than just a cozy layer—they are a bold statement against betrayal. When you wear one of these hoodies, you’re making a powerful stand for accountability and transparency. This isn’t just about fashion; this is about using your voice to call out corruption and demand change. Whether you're at a rally, meeting with like-minded advocates, or simply going about your day, these hoodies make sure your values are loud and clear.</p>
            <br> 
            <h2>Stand Against Corruption: The Hoodie That Demands Action</h2>
            <p>Every time you wear the Traitor Collection Hoodie, you're amplifying your commitment to justice. With slogans like "Expose the Betrayer" and "Integrity Above All", this hoodie serves as a call to action for all who see it. It’s more than just a piece of clothing—it’s a reminder that those who betray the public trust must be held accountable. This hoodie is your declaration that betrayal has no place in politics, business, or any sphere of influence.</p>
            <br> 
            <h3>Comfort with Purpose: Designed for Activists</h3>
            <p>The Traitor Collection Hoodie offers unbeatable comfort without compromising its message. Made from high-quality, soft fabric, it’s perfect for chilly days at protests, social justice events, or simply staying cozy while you plan your next steps in the fight for integrity. It’s durable, warm, and ready for action—just like you.</p>
            <p>With every purchase of the Traitor Collection Hoodie, you're supporting a larger movement—one that fights for justice, integrity, and transparency. By wearing this hoodie, you not only make a bold personal statement but also inspire others to take action. The fight against betrayal and corruption is ongoing, and your hoodie is a reminder that you are part of the solution. Empower your activism and wear your values on your sleeve—literally.</p>
            <br> 
            <h3>Wear Your Advocacy Everywhere</h3>
            <p>The Traitor Collection Hoodie supports your activism every step of the way. Whether you wear it for a protest or to make a statement in everyday life, this hoodie ensures your message is always clear and impactful.</p>
            <br> 
            <h2>Why Choose the Traitor Collection Hoodie?</h2>
            <p>The Traitor Collection Hoodie is the perfect choice for anyone who believes that integrity must be upheld. Here’s why this hoodie belongs in your activist wardrobe:</p>
            <ul>
            <li><strong>Bold, Impactful Messaging:</strong> Designed with slogans that challenge betrayal and demand accountability, it turns heads and starts conversations wherever you go.</li>
            <li><strong>Ultimate Comfort:</strong> Soft, breathable, and perfect for layering, this hoodie ensures that comfort never takes a back seat to activism.</li>
            <li><strong>Join a Movement:</strong> Every hoodie purchased is a step toward creating the world you want to see—one where accountability, justice, and integrity prevail.</li>
            </ul>
            <br> 
            <h3>Take the Lead: Wear Your Activism Proudly</h3>
            <p>The Traitor Collection Hoodie isn’t just a symbol—it’s a tool for sparking change. When you wear it, you stand out as a leader who demands justice and accountability. You’re not afraid to speak up and make your beliefs known. Every hoodie serves as a reminder that betrayal and corruption can never be ignored. It’s time to stand up and make sure your voice is heard—this hoodie helps you do just that.</p>
            <br> 
            <h2>The Perfect Hoodie for the Modern Activist</h2>
            <p>In the world of political activism, you need gear that’s both functional and meaningful. The Traitor Collection Hoodie meets that need in every way. Here’s how it serves the modern activist:</p>
            <ul>
            <li><strong>Versatile for Every Occasion:</strong> Whether you're at a protest, meeting with fellow activists, or showing support on social media, this hoodie keeps your message front and center.</li>
            <li><strong>Comfy Yet Statement-Making:</strong> No need to sacrifice comfort for your values—this hoodie is the perfect balance of activism and relaxation.</li>
            <li><strong>Sustainability and Durability:</strong> Made to last, this hoodie will keep you warm and inspired through countless marches, rallies, and conversations about justice.</li>
            </ul>
            <br> 
            <h3>Take Action, Make a Statement</h3>
            <p>When you put on the Traitor Collection Hoodie, you’re not just wearing a hoodie—you’re wearing your values. This hoodie speaks for you when words alone are not enough. Whether you're marching for justice, advocating for political reform, or simply showing up to support accountability, this hoodie ensures that your stance is known. It’s time to make your voice heard and fight for what’s right.</p>
            <br> 
            <h2>Empower Your Activism: Join the Movement</h2>
            <p>The Traitor Collection Hoodie is perfect for everyday wear. Whether you’re grabbing coffee, attending a meeting, or joining a protest, it’s an easy way to bring your activism wherever you go. The strong, clear messages printed on these hoodies make sure you stand out in any crowd and speak out for those who have been silenced. It’s more than a hoodie—it’s your platform to advocate for change.</p>
            <br> 
            <h2>Order the Traitor Collection Hoodie Today: Stand Up, Speak Out</h2>
            <p>The time for action is now. Don’t wait for others to speak out—order the Traitor Collection Hoodie today and be a voice for integrity, justice, and accountability. Every hoodie sold helps advance the cause, so your purchase makes a difference beyond your wardrobe. Wear it with pride, wear it with purpose, and join a growing movement of individuals demanding change statement in everyday life, the Traitor Collection Hoodie supports your activism every step of the way.</p>
            <h2>Why Choose the Traitor Collection Hoodie?</h2>
            <p>The Traitor Collection Hoodie is the perfect choice for anyone who believes that integrity must be upheld. Here’s why this hoodie belongs in your activist wardrobe:</p>
            <ul>
            <li><strong>Bold, Impactful Messaging:</strong> Designed with slogans that challenge betrayal and demand accountability, it turns heads and starts conversations wherever you go.</li>
            <li><strong>Ultimate Comfort:</strong> Soft, breathable, and perfect for layering, this hoodie ensures that comfort never takes a back seat to activism.</li>
            <li><strong>Join a Movement:</strong> Every hoodie purchased is a step toward creating the world you want to see—one where accountability, justice, and integrity prevail.</li>
            </ul>
            <br> 
            <h3>Take the Lead: Wear Your Activism Proudly</h3>
            <p>The Traitor Collection Hoodie isn’t just a symbol—it’s a tool for sparking change. When you wear it, you stand out as a leader who demands justice and accountability. You’re not afraid to speak up and make your beliefs known. Every hoodie serves as a reminder that betrayal and corruption can never be ignored. It’s time to stand up and make sure your voice is heard—this hoodie helps you do just that.</p>
            <br> 
            <h2>The Perfect Hoodie for the Modern Activist</h2>
            <p>In the world of political activism, you need gear that’s both functional and meaningful. The Traitor Collection Hoodie meets that need in every way. Here’s how it serves the modern activist:</p>
            <ul>
            <li><strong>Versatile for Every Occasion:</strong> Whether you're at a protest, meeting with fellow activists, or showing support on social media, this hoodie keeps your message front and center.</li>
            <li><strong>Comfy Yet Statement-Making:</strong> No need to sacrifice comfort for your values—this hoodie is the perfect balance of activism and relaxation.</li>
            <li><strong>Sustainability and Durability:</strong> Made to last, this hoodie will keep you warm and inspired through countless marches, rallies, and conversations about justice.</li>
            </ul>
            <br> 
            <h3>Take Action, Make a Statement</h3>
            <p>When you put on the Traitor Collection Hoodie, you’re not just wearing a hoodie—you’re wearing your values. This hoodie speaks for you when words alone are not enough. Whether you're marching for justice, advocating for political reform, or simply showing up to support accountability, this hoodie ensures that your stance is known. It’s time to make your voice heard and fight for what’s right.</p>
            <br> 
            <h2>Empower Your Activism: Join the Movement</h2>
            <p>The Traitor Collection Hoodie is perfect for everyday wear. Whether you’re grabbing coffee, attending a meeting, or joining a protest, it’s an easy way to bring your activism wherever you go. The strong, clear messages printed on these hoodies make sure you stand out in any crowd and speak out for those who have been silenced. It’s more than a hoodie—it’s your platform to advocate for change.</p
            </div>
            HTML;
        }

        if ($slug == 'traitor' && $design_type=='sweatshirts') {
            echo <<<HTML
            <div class="extra_content product_list_data">
            <h1>Traitor Collection Sweatshirts: Bold Statements for a Brighter Future</h1>
            <p>The Traitor Collection Sweatshirts are a call to action, designed for the bold individuals who refuse to stay silent in the face of corruption. These sweatshirts are not just about keeping warm—they’re about keeping your principles alive and visible. Each sweatshirt is a declaration that you stand for justice and accountability, refusing to turn a blind eye to betrayal. Whether you wear it to a protest, a march, or simply in everyday life, these sweatshirts will make sure your message is loud and clear.</p>
            <br> 
            <h2>Rise Against Betrayal: The Sweatshirt That Makes a Statement</h2>
            <p>When you slip into the Traitor Collection Sweatshirt, you’re not just dressing for comfort—you’re dressing for change. Each piece in this collection is designed to fight against political betrayal and demand transparency from those in power. With statements like "Expose the Betrayer" and "Accountability is Key," you are sending a strong message that betrayal should never be tolerated. This sweatshirt stands for integrity and justice—two values that will never go out of style.</p>
            <br> 
            <h3>Comfort Meets Activism: Designed to Make a Difference</h3>
            <p>The Traitor Collection Sweatshirt brings you comfort while making sure your activism never takes a backseat. Made from high-quality materials, this sweatshirt is perfect for staying warm during chilly rallies or for keeping cozy at home while you strategize your next steps in the fight for accountability. It’s built for durability, softness, and, most importantly, to remind you of your commitment to making a difference in the world. Wear it with pride and know that every time you do, you're adding to the movement for justice.</p>
            <br> 
            <h2>Why Choose the Traitor Collection Sweatshirt?</h2>
            <p>If you want to make a statement while staying warm and comfortable, this sweatshirt is for you. Here’s why the Traitor Collection Sweatshirt is the perfect fit for any activist:</p>
            <ul>
            <li><strong>Powerful, Action-Oriented Messages:</strong> The bold statements printed on the sweatshirt ensure that your values are heard, whether you're participating in protests, marches, or discussions.</li>
            <li><strong>Unmatched Comfort:</strong> Made from soft, high-quality fabric, it ensures that comfort is never sacrificed in the name of activism.</li>
            <li><strong>Join a Movement:</strong> Wearing this sweatshirt isn’t just about fashion—it’s about joining a movement that demands change and promotes accountability. Every purchase helps advance that cause.</li>
            </ul>
            <br> 
            <h3>Activate Your Voice: Wear Your Advocacy Everywhere</h3>
            <p>The Traitor Collection Sweatshirt is more than just a piece of clothing—it’s an advocacy tool. Whether you're speaking out against corruption or simply having a conversation about political reform, this sweatshirt ensures your message is front and center. It’s perfect for everyday wear, making sure that your stance is known no matter where you go. Wear it to show the world that you believe in integrity, transparency, and justice for all.</p>
            <br> 
            <h2>Empowering Change: How the Traitor Collection Sweatshirt Supports Your Activism</h2>
            <p>By wearing the Traitor Collection Sweatshirt, you are actively contributing to a movement that seeks to hold individuals in power accountable. This sweatshirt serves as a constant reminder that the fight for justice is ongoing and that every voice matters. It’s not just about wearing a slogan—it’s about supporting a cause that calls out betrayal and demands transparency.</p>
            <ul>
            <li><strong>Versatile for Activists:</strong> Whether you're organizing or attending an event, this sweatshirt is a versatile piece that lets you spread your message everywhere.</li>
            <li><strong>Durability for Change:</strong> Made to withstand wear and tear, this sweatshirt will keep you warm and motivated, rallying against corruption for years to come.</li>
            <li><strong>A Symbol of Integrity:</strong> Every time you wear the Traitor Collection Sweatshirt, you wear your commitment to integrity and transparency.</li>
            </ul>
            <br> 
            <h3>Speak Loudly, Stand Strong: Make Your Voice Heard</h3>
            <p>When you wear the Traitor Collection Sweatshirt, you're not just keeping warm—you're sending a message that betrayal will not be tolerated. With every march, protest, and conversation, this sweatshirt serves as a bold declaration that you believe in accountability. It's not just clothing—it’s a uniform for change, designed for those who aren’t afraid to take a stand. So wear it proudly and use it as your voice when words alone won’t suffice.</p>
            <br> 
            <h2>Order the Traitor Collection Sweatshirt Now: Stand for Integrity</h2>
            <p>Are you ready to make your stand against betrayal? The Traitor Collection Sweatshirt is your chance to stand up for justice and show your commitment to accountability. Wear it wherever you go and let it serve as a reminder to those around you that the fight for integrity is real, and it’s happening now. By ordering today, you join a growing movement that is demanding transparency and standing firm against corruption.</p>
            </div>
            HTML;
        }

        if ($slug == 'trader' && $design_type=='tshirts') {
            echo <<<HTML
            <div class="extra_content product_list_data">
            <h1>The Trader Collection T-Shirt: More Than Fashion, It's a Statement</h1>
            <p>The Trader Collection T-Shirt is not just about fashion—it’s about making a statement. When you wear this shirt, you’re showing the world that you refuse to stand by while corruption runs rampant in the political system. Here’s why you should get yours today:</p>
            <ul>
            <li><strong>Bold Political Statement:</strong> With impactful, eye-catching designs, this shirt makes sure your message is seen. Every time you wear it, you’re challenging the status quo and demanding that lawmakers act with integrity.</li>
            <li><strong>Comfortable and Durable:</strong> Made from soft, high-quality fabric, this t-shirt is perfect for all-day wear. Whether you’re rallying for justice or simply going about your day, this shirt has you covered.</li>
            <li><strong>Support the Movement:</strong> By purchasing the Trader Collection T-Shirt, you’re not just adding to your wardrobe—you’re supporting the fight for political accountability. It’s more than a shirt; it’s a statement of your values.</li>
            </ul>
            <br> 
            <h3>Be the Change: Wear the Trader Collection T-Shirt and Stand for Integrity</h3>
            <p>Change starts with individuals who are willing to stand up and speak out. The Trader Collection T-Shirt is designed for those who know that holding politicians accountable is the first step toward a more just society. Wearing this shirt lets others know that you’re not afraid to demand more from those in power. You’re saying, loud and clear, that integrity matters.</p>
            <p>With each wear, you’re promoting the values that will make a difference in the world—values like honesty, transparency, and accountability. This shirt isn’t just about style—it’s about starting a movement.</p>
            <br> 
            <h2>Make a Statement Without Saying a Word</h2>
            <p>The Trader Collection T-Shirt speaks for you. Designed to be bold and provocative, this t-shirt is perfect for those who want to make a difference but may not have the words to express it. With striking graphics and powerful slogans, it’s impossible to ignore. Wear it at rallies, protests, or casual outings, and let the message do the talking.</p>
            <p>Each time you put it on, you’re reminding others that change is possible, but only if we demand accountability from our leaders. Don’t just follow the conversation—start it with the Trader Collection T-Shirt.</p>
            <br> 
            <h3>Transform Your Wardrobe into a Voice for Justice</h3>
            <p>Your clothes should be more than just something you wear—they should reflect your beliefs and values. The Trader Collection T-Shirt is a perfect example of this philosophy. Each time you wear it, you're showing your commitment to integrity in politics and your dedication to making a change.</p>
            <p>Designed for advocates, activists, and anyone who believes in transparency and honesty, this shirt is an essential piece for your activist wardrobe. Let your clothes speak for you, and let the world know where you stand.</p>
            <br> 
            <h2>Order the Trader Collection T-Shirt Today: Stand for Integrity</h2>
            <p>Are you ready to demand accountability and support integrity in politics? The Trader Collection T-Shirt is the perfect way to take a stand. By ordering today, you’re not just buying a shirt—you’re joining a movement. Don’t wait any longer—make your voice heard and show the world where you stand. The time for change is now, and the Trader Collection T-Shirt is here to help you lead the charge.</p>
            </div>
            HTML;
        }

        if ($slug == 'trader' && $design_type=='hoodies') {
            echo <<<HTML
            <div class="extra_content product_list_data">
            <h1>Trader Collection Hoodies: Expose Insider Trading, Demand Change</h1>
            <p>The Trader Collection Hoodie is for those who refuse to sit idly by while corrupt politicians profit from insider trading. Designed to stand against the unethical practices of lawmakers using their positions for personal gain, this hoodie makes a bold statement. It’s more than just a piece of clothing; it’s a symbol of resistance against corruption.</p>
            <p>Wear it proudly as a protest against those in power who use their positions to enrich themselves, all while making laws that serve their financial interests. With every thread, this hoodie embodies the fight for integrity in politics, shining a light on the insiders who manipulate the system for personal gain.</p>
            <br> 
            <h2>Shine a Light on Corruption: The Trader Collection Hoodie</h2>
            <p>Inside trading among politicians has become a growing concern, with lawmakers making millions by trading on the very information they legislate. The Trader Collection Hoodie is designed to expose these corrupt practices and demand justice. By wearing this hoodie, you’re calling for transparency, accountability, and a commitment to making laws that benefit the people, not the few who use their political power for personal enrichment.</p>
            <p>The bold design symbolizes the fight for a fair political system where laws aren’t dictated by the financial interests of a select group.</p>
            <br> 
            <h3>Demand Accountability: The Hoodie that Speaks Truth to Power</h3>
            <p>This hoodie is more than a fashion statement—it’s a powerful tool for activism. The Trader Collection Hoodie is for the outspoken individual who refuses to allow insider trading to go unchecked. Designed for those who stand for integrity, this hoodie symbolizes the fight against lawmakers who prioritize their wealth over their duty to the public.</p>
            <p>With sharp, eye-catching graphics and a message that speaks truth to power, this hoodie is a perfect choice for anyone who believes that laws should serve the greater good—not the personal agendas of the corrupt few.</p>
            <br> 
            <h2>Why Choose the Trader Collection Hoodie?</h2>
            <p>When it comes to protesting corruption in politics, you need more than just words—you need a strong visual statement. The Trader Collection Hoodie is just that. Here’s why you should wear it with pride:</p>
            <ul>
            <li><strong>Expose Corruption:</strong> The bold design of the hoodie highlights the corrupt practice of insider trading in politics. Wearing this hoodie makes sure your message is loud and clear: no more secret deals behind closed doors.</li>
            <li><strong>Comfort and Durability:</strong> Made from high-quality, soft fabric, this hoodie ensures you stay comfortable while you fight for justice. It’s perfect for rallies, protests, or just a day out, giving you the freedom to express your values wherever you go.</li>
            <li><strong>Support the Movement:</strong> By choosing the Trader Collection Hoodie, you’re supporting the push for a political system where honesty and transparency come first. Your purchase helps fund advocacy efforts that demand change in the political landscape.</li>
            </ul>
            <br> 
            <h3>Fight for Integrity: Wear the Trader Collection Hoodie and Take Action</h3>
            <p>Wearing the Trader Collection Hoodie is about more than just showcasing your support for transparency. It’s about actively calling out those who use their political power for personal gain. The hoodie’s design is a direct statement against lawmakers who pass legislation that enriches them through insider trading.</p>
            <p>If you’re ready to be part of the solution and fight for a political system that works for everyone—not just the wealthy few—this hoodie is for you. With its strong message and striking visuals, it’s the perfect choice for anyone committed to making change.</p>
            <br> 
            <h2>The Hoodie That Challenges the Status Quo</h2>
            <p>The Trader Collection Hoodie isn’t just a piece of clothing; it’s an act of defiance. It challenges the status quo of corrupt practices in politics, and it calls for real change. Every time you put it on, you’re not only keeping warm, you’re showing the world that you won’t stand for the manipulations and injustices of the political elite.</p>
            <p>It’s a reminder to everyone that the laws we live by should be made for the good of society, not the benefit of a select few. Wear this hoodie with pride as a symbol of resistance against corruption and a call for a fairer, more honest political system.</p>
            <br> 
            <h3>Join the Movement: Take Action with the Trader Collection Hoodie</h3>
            <p>The Trader Collection Hoodie is for those who aren’t afraid to take a stand. Whether you’re at a protest, speaking out on social media, or simply going about your day, this hoodie is a powerful visual statement. It shows that you’re committed to ending the corrupt practices that plague the political system.</p>
            <p>When you wear it, you’re joining a movement of individuals who demand accountability, transparency, and a government that works for the people. Don’t just sit back and watch the corruption unfold—take action with the Trader Collection Hoodie.</p>
            <br> 
            <h2>Order Your Trader Collection Hoodie Today: Stand Up, Speak Out</h2>
            <p>The time for change is now, and the Trader Collection Hoodie is your chance to be a part of that change. Wear it proudly and let your voice be heard. Whether you’re protesting in the streets or speaking out in everyday life, this hoodie makes sure that your commitment to ending insider trading and political corruption is seen by everyone around you.</p>
            <p>Don’t wait—order your hoodie today and take a stand for integrity, transparency, and justice in politics.</p>
            </div>
            HTML;
        }

        if ($slug == 'trader' && $design_type=='sweatshirts') {
            echo <<<HTML
            <div class="extra_content product_list_data">
            <h1>Trader Collection Sweatshirts: Fashion for the Fearless Advocate</h1>
            <p>The Trader Collection Sweatshirts are not just garments—they are a movement. Designed for individuals who refuse to accept corruption and injustice, these sweatshirts are more than a style choice. They represent your voice, your stance, and your unwavering commitment to holding those in power accountable. With a design that speaks volumes, you can stand tall, speak out, and make an impact. Whether you’re at a protest or simply out and about, these sweatshirts ensure that your message is seen and heard loud and clear.</p>
            <br> 
            <h2>Stand Strong Against Corruption: Wear the Trader Collection Sweatshirt</h2>
            <p>When you wear the Trader Collection Sweatshirt, you're not just making a fashion statement—you’re making a bold statement against corruption and unethical dealings. The political landscape today requires citizens to be more engaged than ever, demanding that lawmakers act with integrity and honesty.</p>
            <p>This sweatshirt is a call for accountability, designed for the activist who isn’t afraid to speak up, even when the conversation gets uncomfortable. With powerful, striking designs that challenge the status quo, this sweatshirt is a tool for social change, urging others to take notice and join the cause.</p>
            <br> 
            <h3>Empower Your Activism: Designed for the Modern Advocate</h3>
            <p>The Trader Collection Sweatshirt combines comfort and purpose, making it the perfect piece for every advocate who wants to make a difference. Made from soft, durable materials, it’s perfect for cold rallies or long discussions on the future of politics. But comfort isn’t all—it’s also about looking and feeling empowered.</p>
            <p>Each sweatshirt is designed to inspire action, reminding you and those around you of the power of integrity in politics. It’s not just about keeping warm—it’s about staying motivated, focused, and ready for change.</p>
            <br> 
            <h2>Why Wear the Trader Collection Sweatshirt?</h2>
            <p>If you’re an advocate for integrity, transparency, and accountability, this sweatshirt was made for you. The Trader Collection Sweatshirt is designed for people who are tired of seeing their values compromised by those in power. By wearing it, you’re making a commitment to stand firm against political corruption and unethical behavior. Here’s why you should add it to your wardrobe:</p>
            <ul>
            <li><strong>Bold and Powerful Design:</strong> Featuring slogans that challenge corrupt practices, this sweatshirt ensures that your stance is seen by all.</li>
            <li><strong>Comfort and Durability:</strong> Made with high-quality materials that ensure comfort without sacrificing durability. Whether you're in the middle of a protest or on your way to an important meeting, this sweatshirt will hold up.</li>
            <li><strong>Support the Cause:</strong> By purchasing the Trader Collection Sweatshirt, you're supporting a movement that demands transparency and accountability from lawmakers. It's more than just a product; it’s a piece of advocacy.</li>
            </ul>
            <br> 
            <h3>Transform Your Wardrobe into a Political Statement</h3>
            <p>The Trader Collection Sweatshirt is more than just apparel; it’s a piece of activism. Each time you wear it, you're taking a stand for justice, demanding that elected officials act in the best interest of the people, not special interests. It’s about transformation—not just in the world, but in the way we approach politics and governance.</p>
            <p>This sweatshirt makes a statement wherever you go—whether you’re attending a rally or discussing the future of political integrity with friends.</p>
            <br> 
            <h2>Be the Change: Actively Promote Accountability with the Trader Collection Sweatshirt</h2>
            <p>Accountability doesn’t happen by accident—it happens when individuals like you take action and make their voices heard. The Trader Collection Sweatshirt is a tool in that fight. By wearing it, you’re reminding those around you that change is possible when we hold those in power to a higher standard. This sweatshirt empowers you to take your activism to the next level, giving you the chance to promote integrity, transparency, and justice wherever you go.</p>
            <ul>
            <li><strong>Perfect for Every Activist:</strong> Whether you’re attending a protest or simply meeting with like-minded individuals, this sweatshirt will ensure you’re always ready to make a statement.</li>
            <li><strong>Durable and Comfortable:</strong> Designed to last, this sweatshirt is made from high-quality fabric that holds up to the demands of your activism, all while offering supreme comfort.</li>
            <li><strong>A Unified Call for Justice:</strong> This sweatshirt speaks for you, giving a voice to your values and ensuring that accountability remains at the forefront of your mission.</li>
            </ul>
            <br> 
            <h3>Let Your Wardrobe Speak for You</h3>
            <p>Your clothes shouldn’t just be about fashion—they should reflect your values. With the Trader Collection Sweatshirt, you can make sure that every step you take is a statement about the change you want to see in the world. Whether you’re speaking to your peers or rallying against corruption, this sweatshirt makes sure your advocacy is as visible as your passion for justice.</p>
            <p>Let your wardrobe speak louder than words and show the world that integrity is worth fighting for.</p>
            <br> 
            <h2>Order the Trader Collection Sweatshirt Today: Make Your Stand Known</h2>
            <p>Ready to make your stand against corruption and support integrity in politics? The Trader Collection Sweatshirt is the perfect way to show your commitment to accountability. Don’t wait—order today and start wearing your values proudly. By doing so, you’ll not only be keeping warm in style, but you’ll also be helping to promote a message of justice and political integrity that the world desperately needs.</p>
            </div>
            HTML;
        }

        if ($slug == 'propaganda' && $design_type=='tshirts') {
            echo <<<HTML
                <div class="extra_content product_list_data">
                <h1>Propaganda Collection T-Shirts: Expose Lies, Demand Accountability</h1>
                <p>The Propaganda Collection T-Shirt is for the truth-seekers, the activists who refuse to accept the media’s distorted narratives. With a bold and striking design, this t-shirt challenges the powerful media machines that manipulate information and spread falsehoods to the public. It’s more than just a piece of clothing; it’s a call to action, a demand for transparency and accountability. When you wear this shirt, you’re standing up for the truth, exposing the media's role in spreading propaganda, and advocating for an honest, unbiased flow of information.</p>
                <br> 
                <h2>Challenge Media Lies: The Propaganda Collection T-Shirt</h2>
                <p>In today’s world, misinformation runs rampant, with the media shaping narratives that serve their own interests rather than the truth. The Propaganda Collection T-Shirt is designed to shine a spotlight on this issue, giving voice to those who demand transparency and fairness in the media. With this shirt, you’re calling out the media for distorting reality, creating confusion, and manipulating public opinion. It’s time for the truth to rise to the surface, and this t-shirt is your statement that you won’t stand for the lies any longer.</p>
                <br> 
                <h3>Make Your Voice Heard: Fight for Media Accountability</h3>
                <p>Wearing the Propaganda Collection T-Shirt is a powerful way to make your voice heard in the fight against misinformation. It’s a bold declaration that you value truth and transparency above all else. The media’s influence on public opinion is undeniable, but with the power of activism, we can challenge these narratives and demand a media landscape that serves the people, not powerful corporations.</p>
                <p>This t-shirt isn’t just a fashion statement—it’s a rallying cry for those who believe in the importance of truth in journalism and the need to hold the media accountable for the stories they tell.</p>
                <br> 
                <h2>Why Choose the Propaganda Collection T-Shirt?</h2>
                <p>When it comes to making a statement, you need more than just words—you need something that visually captures the essence of the message. The Propaganda Collection T-Shirt is designed to do just that. Here’s why this t-shirt is perfect for those who want to make a bold statement:</p>
                <ul>
                <li><strong>Expose Misinformation:</strong> The striking design directly calls attention to the role of the media in spreading misinformation. By wearing it, you’re challenging false narratives and demanding that the truth be told.</li>
                <li><strong>Comfort and Style:</strong> Made from high-quality cotton, this t-shirt ensures comfort while you take action. Whether you're at a protest, attending a rally, or simply out and about, this shirt serves as a reminder of your commitment to the truth.</li>
                <li><strong>Support the Movement:</strong> Every purchase of the Propaganda Collection T-Shirt helps fund efforts to hold the media accountable for their role in spreading propaganda. By wearing it, you’re contributing to a larger movement focused on media reform and transparency.</li>
                </ul>
                <br> 
                <h3>Stand Against Misinformation: Make a Statement with the Propaganda Collection T-Shirt</h3>
                <p>Misinformation in the media isn’t just an inconvenience—it’s a threat to democracy. The Propaganda Collection T-Shirt is for those who refuse to accept the lies that the media pushes. With its bold message, this t-shirt is a powerful visual protest against the corruption in journalism.</p>
                <p>It’s not just about wearing a shirt; it’s about standing up for integrity and demanding that the truth comes to light. By putting on this t-shirt, you’re telling the world that you won’t be silenced by propaganda and that you believe in the power of honest, unbiased reporting.</p>
                <br> 
                <h2>The Fight for Truth: Wear the Propaganda Collection T-Shirt</h2>
                <p>The Propaganda Collection T-Shirt is a tool for change, a call to everyone who values transparency and honesty. In a world filled with misinformation, this shirt is a beacon of truth. It serves as a reminder that the media holds great power, and with that power comes great responsibility.</p>
                <p>By wearing this t-shirt, you’re not only expressing your dissatisfaction with the media’s manipulation but also encouraging others to question the narratives they consume. It’s a statement that challenges the status quo and calls for a shift toward truth and accountability in journalism.</p>
                <br> 
                <h3>Join the Movement: Demand Media Transparency with the Propaganda Collection T-Shirt</h3>
                <p>The Propaganda Collection T-Shirt is a part of a larger movement that is calling for media reform and accountability. When you wear this t-shirt, you’re joining countless others who believe that the media should serve the public, not powerful elites. It’s time to take back the narrative and ensure that the stories we hear are truthful, fair, and unbiased.</p>
                <p>This t-shirt is your opportunity to take part in that fight. Whether you’re spreading awareness on social media, attending protests, or simply wearing it to start a conversation, you are actively contributing to a global movement for media transparency.</p>
                <br> 
                <h2>Order Your Propaganda Collection T-Shirt Today: Stand Up for Truth</h2>
                <p>The time for change is now, and the Propaganda Collection T-Shirt is your way to be part of it. By wearing it, you’re not just making a fashion statement—you’re sending a message that you stand for truth, transparency, and media reform. Don’t let misinformation dictate the narrative.</p>
                <p>Order your Propaganda Collection T-Shirt today and take a stand against the manipulation of the media. Be part of the movement that’s demanding a more truthful, transparent world.</p>
                </div>
            HTML;
        }

        if ($slug == 'propaganda' && $design_type=='hoodies') {
            echo <<<HTML
                <div class="extra_content product_list_data">
                <h1>Propaganda Collection Hoodies: Expose Media Lies, Demand the Truth</h1>
                <p>The Propaganda Collection Hoodie is for those who are ready to stand up against the media’s influence on public opinion. With a design that boldly calls out the media’s role in spreading misinformation, this hoodie serves as a shield for truth. It's not just about staying warm—it's about making a powerful statement, about taking a stand against the lies that shape our world. When you wear this hoodie, you are demanding transparency, accountability, and fairness from those who control the narrative.</p>
                <br> 
                <h2>Challenge the Media's Control: The Propaganda Collection Hoodie</h2>
                <p>The Propaganda Collection Hoodie represents a stand against the misinformation that floods our media every day. Whether it’s news outlets, social media, or other platforms, the truth is often distorted to serve the powerful few. With this hoodie, you are calling for change, demanding that media outlets stop spreading propaganda and start delivering the facts. It’s time to hold the media accountable, and this hoodie is your way of joining the movement.</p>
                <br> 
                <h3>Take Action: Fight Media Misinformation with the Propaganda Hoodie</h3>
                <p>By wearing the Propaganda Collection Hoodie, you're taking action. It's a simple but powerful way to tell the world that you won't tolerate the manipulation of the truth any longer. The hoodie’s bold design makes a clear statement to everyone you meet—it’s time for transparency, honesty, and accountability in the media. This is not just about fashion—it’s about taking part in a global movement to expose the lies that have been told for too long.</p>
                <br> 
                <h2>Why Choose the Propaganda Collection Hoodie?</h2>
                <p>This hoodie is designed for those who are serious about their activism. It's more than just a piece of clothing; it’s a statement of intent. Here’s why this hoodie is perfect for truth-seekers who want to make a bold impact:</p>
                <ul>
                <li><strong>Powerful Statement:</strong> The design on the Propaganda Collection Hoodie is meant to catch attention and make people question the media narratives they consume. With its thought-provoking message, you’re directly challenging the media’s role in misinformation.</li>
                <li><strong>Comfort Meets Activism:</strong> Made from soft, durable fabric, this hoodie ensures that you stay comfortable while you spread the message of truth. Whether you're out on the streets or at home, this hoodie represents your commitment to holding the media accountable.</li>
                <li><strong>Support the Cause:</strong> Each purchase of the Propaganda Collection Hoodie goes towards funding efforts to challenge media manipulation. Wearing it means you're actively contributing to a movement that seeks to reform the media landscape and demand transparency.</li>
                </ul>
                <br> 
                <h3>Wear Your Beliefs: The Propaganda Collection Hoodie</h3>
                <p>When you wear the Propaganda Collection Hoodie, you're making a powerful statement about the importance of truth in the media. This hoodie is for those who believe that journalism should be free from corporate influence, that media should tell the truth, and that we, as consumers, deserve to know what’s really happening in the world. It’s time to stand up for integrity, and this hoodie is your weapon of choice.</p>
                <br> 
                <h2>Make Your Statement: Expose Lies and Demand Media Transparency</h2>
                <p>The Propaganda Collection Hoodie is designed for those who are tired of the lies and ready to take action. By wearing it, you’re sending a message that you refuse to accept the media’s distorted narratives. This hoodie is your shield against the manipulation that’s all too common in today’s world. It’s a call to action, encouraging others to stand up for the truth and demand that the media be held accountable for the information they spread.</p>
                <br> 
                <h3>Join the Fight for Media Accountability with the Propaganda Hoodie</h3>
                <p>The fight for media accountability isn’t just about being informed—it’s about challenging the institutions that control the flow of information. With the Propaganda Collection Hoodie, you’re not just a consumer of news—you’re an advocate for change. This hoodie is for those who believe that media should be transparent, unbiased, and serve the public interest. Wear it as a symbol of your dedication to demanding the truth.</p>
                <br> 
                <h2>Order Your Propaganda Collection Hoodie Today: Stand for Truth</h2>
                <p>The time for action is now. The Propaganda Collection Hoodie is your chance to stand up against the manipulation of the media. Wear it proudly and make a statement that you demand the truth. With every purchase, you’re not just buying a hoodie—you’re joining a movement dedicated to exposing lies and promoting transparency in journalism.</p>
                <p>Don’t wait for change to happen—be part of it. Order your Propaganda Collection Hoodie today and stand for truth, accountability, and a free press.</p>
                </div>
            HTML;
        }

        if ($slug == 'propaganda' && $design_type=='sweatshirts') {
            echo <<<HTML
                <div class="extra_content product_list_data">
                <h1>Propaganda Collection Sweatshirts: Wear Your Stand Against Misinformation</h1>
                <p>The Propaganda Collection Sweatshirt isn’t just about staying warm—it’s about staying informed and demanding accountability. Crafted for those who believe in truth over distortion, this sweatshirt is your shield in the battle against media manipulation. Wear it with pride as a statement to the world that you refuse to accept the lies that often shape public opinion. It's time to stand up, speak out, and hold the media to the highest standards of transparency.</p>
                <br> 
                <h2>Demand Media Accountability with the Propaganda Collection Sweatshirt</h2>
                <p>The media holds immense power over public perception, but that power can be used for good—or for manipulation. The Propaganda Collection Sweatshirt challenges the status quo, asking the hard questions about media integrity. Why do certain narratives prevail while others are suppressed? Why does misinformation spread unchecked? This sweatshirt is more than a piece of clothing—it's an invitation to fight back against the forces that use media to distort the truth. It’s time to demand honesty, transparency, and accountability from the sources we trust.</p>
                <br> 
                <h3>Speak Up for the Truth: Wear the Propaganda Sweatshirt</h3>
                <p>With bold, impactful design, the Propaganda Collection Sweatshirt helps amplify the call for truth in journalism. As consumers, we deserve access to honest, unbiased news—news that informs rather than deceives. This sweatshirt isn’t just about comfort; it’s about sending a clear message that you won’t stand by while misinformation is allowed to spread unchecked. Every time you wear this sweatshirt, you are part of a movement that is pushing for change and demanding the media be held accountable for its role in society.</p>
                <br> 
                <h2>Why Choose the Propaganda Collection Sweatshirt?</h2>
                <p>The Propaganda Collection Sweatshirt is designed for those who believe that media should be a force for good—something that informs, educates, and tells the truth. Here’s why this sweatshirt is the perfect fit for truth-seekers:</p>
                <ul>
                <li><strong>Uncompromising Message:</strong> The design of the Propaganda Collection Sweatshirt makes a bold, powerful statement against misinformation. Wear it to challenge the mainstream media and push for more honest, transparent journalism.</li>
                <li><strong>Comfort and Activism Combined:</strong> Made with soft, durable fabric, this sweatshirt ensures that you stay comfortable while also staying committed to your activism. Whether you’re at home or out in the world, you can wear it proudly as a symbol of your fight for the truth.</li>
                <li><strong>A Call to Action:</strong> By purchasing the Propaganda Collection Sweatshirt, you're not just buying apparel—you’re supporting a larger cause to reform media practices. This sweatshirt is for those who want to see change in the media landscape, and who believe in the power of collective action to make that change happen.</li>
                </ul>
                <br> 
                <h3>Make Your Voice Heard: The Propaganda Collection Sweatshirt</h3>
                <p>When you wear the Propaganda Collection Sweatshirt, you’re making a statement to the world. It’s not just about being warm; it’s about making sure the truth is heard. The media has the power to shape our perceptions, but it’s up to all of us to challenge those narratives and demand transparency. This sweatshirt is a call to action, a way for activists and truth-seekers to unite and work together to expose the lies that have been hidden for too long.</p>
                <br> 
                <h2>Take Action Against Media Manipulation: The Propaganda Sweatshirt</h2>
                <p>The Propaganda Collection Sweatshirt is more than just an article of clothing—it’s a declaration. By wearing it, you’re telling the world that you’re not content with the status quo. You’re standing up for the truth and calling for accountability from the media. Whether you’re at a rally, at home, or out with friends, this sweatshirt is a visible reminder that the fight for truth in the media is ongoing—and you’re a part of it.</p>
                <br> 
                <h3>Support the Movement for Media Transparency with the Propaganda Sweatshirt</h3>
                <p>This sweatshirt is designed for those who want to be a part of something bigger. It’s not just about wearing a cool piece of clothing—it’s about standing for something that matters. The Propaganda Collection Sweatshirt is for those who believe that the media should be a tool for good, that it should inform and educate rather than mislead and deceive. Wear it proudly and let others know that you're part of the movement for change. Demand accountability from the sources we trust.</p>
                <br> 
                <h2>Order Your Propaganda Collection Sweatshirt: Stand Up for the Truth</h2>
                <p>It’s time to make a change. The Propaganda Collection Sweatshirt is your way of standing up against media manipulation and spreading the message of truth. With every purchase, you're joining a community of like-minded individuals who are committed to demanding better from the media. Order yours today and make a statement that you will no longer tolerate the lies that influence our world.</p>
                <p>Together, we can create a media landscape that values honesty and transparency. Take action today—order your Propaganda Collection Sweatshirt now and wear your commitment to the truth.</p>
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
