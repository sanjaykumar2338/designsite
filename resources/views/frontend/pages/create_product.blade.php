@extends('frontend.layout.product_creation')

@section('content')
    
    <input type="hidden" name="product_ids" value="{{$product->id}}">

    <div class="crt-prd-main">
        <div id="data" hidden>{{ $product }}</div>
        <div class="container">
            <div class="flex flex-wrap">
                
                    @if($product->product_type=='Bottoms')
                        <div class="prd-left lowre-canva">
                    @elseif($product->product_type=='Footwear')
                        <div class="prd-left shoes-canva">
                    @elseif($product->product_type=='Phone Cases')
                        <div class="prd-left iphone-canva">
                    @else
                        <div class="prd-left t-shirt-canva {{strtolower($product->product_for)}}-{{strtolower($product->product_type)}}">
                    @endif


                    {{-- <div class="flex flex-wrap prd-crs-img">
                        <button class="hover:bg-slate-200 h-[50px] w-[50px]" onclick="setSelected(1)">
                            <img src="https://files.cdn.printful.com/m/ec1000/medium/onman/front/05_ec1000_onman_front_base_whitebg.png?v=1675420344"
                                class="h-full" alt="" />
                        </button>
                        <button class="hover:bg-slate-200 h-[50px] w-[50px]" onclick="setSelected(2)">
                            <img src="{{ url('/') }}/poster.jpg" class="h-full" alt="" />
                        </button>
                        <button class="hover:bg-slate-200 h-[50px] w-[50px]" onclick="setSelected(3)">
                            <img src="{{ url('/') }}/signage.jpg" class="h-full" alt="" />
                        </button>
                    </div> --}}
                    <div class="prd-image">
						<div class="prd-image-shadow">
                        <div style="position: relative" id="canvasParent">
                            <div class="cmn-frame" style="height: 500px; width: 500px; position: absolute; backgorud"
                                id="canvasBgImage">
                            </div>
                            <div class="cmn-frame" style="height: 500px; width: 500px; position: relative">
                                <div class="border-[1px] border-neutral-300 frame-area"
                                    style="
										position: absolute;
										top: 52%;
										left: 48%;
										/* transform: translate(-43%, -70%); */
										z-index: 10;
									"
                                    id="div_front" hidden>
                                    {{-- <canvas id="canvas_front" width="150" height="200"
                                        style="border: 1px; border-color: black"></canvas> --}}
                                </div>
                                <div class="border-[1px] border-neutral-300 frame-area"
                                    style="
										position: absolute;
										top: 60%;
										left: 48%;
										/* transform: translate(-43%, -70%); */
										z-index: 10;
									"
                                    id="div_back" hidden>
                                    {{-- <canvas id="canvas_back" width="150" height="250"
                                        style="border: 1px; border-color: black"></canvas> --}}
                                </div>
                                <div class="border-[1px] border-neutral-300 frame-area"
                                    style="
										position: absolute;
										top: 60%;
										left: 60%;
										/* transform: translate(-43%, -70%); */
										z-index: 10;
									"
                                    id="div_sleeve_left" hidden>
                                    {{-- <canvas id="canvas_sleeve_left" width="140" height="140"
                                        style="border: 1px; border-color: black"></canvas> --}}
                                </div>
                                <div class="border-[1px] border-neutral-300 frame-area"
                                    style="
										position: absolute;
										top: 60%;
										left: 40%;
										/* transform: translate(-43%, -70%); */
										z-index: 10;
									"
                                    id="div_sleeve_right" hidden>
                                    {{-- <canvas id="canvas_sleeve_right" width="140" height="140"
                                        style="border: 1px; border-color: black"></canvas> --}}
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="prd-right">
                    <div class="flex flex-col gap-2" id="editables"></div>

                    @php
                        $commissionAmount = ($product->commission / 100) * $product->product_price;
                        $totalPrice = $product->product_price + $commissionAmount;
                    @endphp

                    @if(Auth::check())
                        @if(auth()->user()->email=='admin@gmail.com')
                            <br>
                            <a class="place-btn" style="font-size:8px;" target="_blank" href="{{url('/')}}/admin/products/{{$product->id}}/edit">Update Product Info</a> <a style="font-size:8px;" class="place-btn"  target="_blank" href="{{url('/')}}/admin/products/create_template/{{$product->id}}">Desgin Template</a>
                            <br><br>
                        @endif
                    @endif

                    <h1 class="product_title">{{ $product->website_product_name ? $product->website_product_name : $product->product_name }}</h1>
                    
                    <h3 class="product_price" style="font-weight: 700;" data-exact="{{ number_format($totalPrice, 2) }}" data-price="{{ number_format($totalPrice, 2) }}"> ${{ number_format($totalPrice, 2) }}</h3>

                    <p class="desc">{{ $product->product_description }}</p>
                    <div class="prd-option">
                        <div id="product-thumbnails">


                            <button class="border rounded-lg" onclick="setShowCanvas(`canvas_front`, true, 'front')">
                                <img width="50" height="50" id="thumbnail_front" src="" alt=""
                                    class="h-[50px] w-[50px]">
                                {{-- front --}}
                            </button>

                            <button class="border  rounded-lg" onclick="setShowCanvas(`canvas_back`, true, 'back')">
                                <img width="50" height="50" id="thumbnail_back" src="" alt=""
                                    class="h-[50px] w-[50px]">
                                {{-- back --}}
                            </button>

                            <button class="border  rounded-lg" onclick="setShowCanvas(`canvas_sleeve_left`, true, 'left')">
                                <img width="50" height="50" id="thumbnail_sleeve_left" src="" alt=""
                                    {{-- sleeve_left --}}>
                            </button>

                            <button class="border  rounded-lg" onclick="setShowCanvas(`canvas_sleeve_right`, true, 'right')">
                                <img width="50" height="50" id="thumbnail_sleeve_right" src="" alt=""
                                    class="h-[50px] w-[50px]">
                                {{-- sleeve_right --}}
                            </button>
                        </div>

                        <h4>Choose Color: <span id="color_name"></span></h4>
                        <div id="product-colours">
                        </div>

                        <div class="flex flex-wrap prd-opt-one align-items-center cmn-prd-opt editable">
                            <button class="border prd-btn rounded-lg p-2 px-3 hidden" onclick="setShowModal(true)">
                                Add Image
                            </button>
                            <button class="border prd-btn rounded-lg p-2 px-3 add-txt-btn" onclick="addText()">
                                Add Text
                            </button>
                            <div class="img-add-opt chooseImageFile">
                                <input id="image-picker" type="file" accept="image/*" class="w-[200px]"
                                    onchange="onImagePikked()" />
                            </div>
                        </div>
                        <div>
                            <button style="display: none;" class="border prd-btn rounded-lg p-2 px-3" onclick="togglePreview()">
                                Preview
                            </button>
                        </div>
                        <div class="prd-opt-three" id="text-controls-additional">

                            @if (in_array($product->product_type, ['Shirts', 'Hoodies', 'Sweatshirts', 'Hoodies']))
                            <div class="flex flex-wrap tw-sz">    
								<h4 class="tw-sz-one">Product Size :</h4>
                                <div class="tw-sz-two prd-sze">
                                    <select name="product_size" id="product_size" onchange="setSizeChange()">
                                        <option value="select" disabled>select</option>
                                    </select>
                                </div>
							</div>
                            @endif

                            <div class="prd-opt-four editable">
								<div class="flex flex-wrap tw-sz"> 
                                <h4 class="tw-sz-one">Popular Graphics:</h4>
								<div class="tw-sz-two">
                                <div class="prd-objects flex flex-wrap">                                    
                                    @if($product->supporting_country=='Israel')
                                        <?php
                                            $imagePath = public_path('objects/israel');
                                            $images = File::files($imagePath);
                                        ?>
                                        @foreach($images as $image)
                                            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                                onclick="addCustomImage(`{{ asset('objects/israel/' . basename($image)) }}`)">
                                                <img style="height: 50px;width:50px;" src="{{ asset('objects/israel/' . basename($image)) }}" alt="" />
                                            </button>                                            
                                        @endforeach
                                    @endif

                                    @if($product->supporting_country=='Palestine')
                                        <?php
                                            $imagePath = public_path('objects/palestine');
                                            $images = File::files($imagePath);
                                        ?>
                                        @foreach($images as $image)
                                            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                                onclick="addCustomImage(`{{ asset('objects/palestine/' . basename($image)) }}`)">
                                                <img style="height: 50px;width:50px;" src="{{ asset('objects/palestine/' . basename($image)) }}" alt="" />
                                            </button>                                            
                                        @endforeach
                                    @endif

                                    @if($product->supporting_country=='Russia')
                                        <?php
                                            $imagePath = public_path('objects/russia');
                                            $images = File::files($imagePath);
                                        ?>
                                        @foreach($images as $image)
                                            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                                onclick="addCustomImage(`{{ asset('objects/russia/' . basename($image)) }}`)">
                                                <img style="height: 50px;width:50px;" src="{{ asset('objects/russia/' . basename($image)) }}" alt="" />
                                            </button>                                            
                                        @endforeach
                                    @endif

                                    @if($product->supporting_country=='Ukraine')
                                        <?php
                                            $imagePath = public_path('objects/ukraine');
                                            $images = File::files($imagePath);
                                        ?>
                                        @foreach($images as $image)
                                            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                                onclick="addCustomImage(`{{ asset('objects/ukraine/' . basename($image)) }}`)">
                                                <img style="height: 50px;width:50px;" src="{{ asset('objects/ukraine/' . basename($image)) }}" alt="" />
                                            </button>                                            
                                        @endforeach
                                    @endif

                                    <div style="display: none;">
                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/1-circle-1.svg`)">
                                            <img src="{{ url('/') }}/objects/1-circle-1.svg" width="50px"
                                                alt="" />
                                        </button>
                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/1-circle-2.svg`)">
                                            <img src="{{ url('/') }}/objects/1-circle-2.svg" width="50px"
                                                alt="" />
                                        </button>
                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/1-circle-3.svg`)">
                                            <img src="{{ url('/') }}/objects/1-circle-3.svg" width="50px"
                                                alt="" />
                                        </button>

                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/2-rect-1.svg`)">
                                            <img src="{{ url('/') }}/objects/2-rect-1.svg" width="50px"
                                                alt="" />
                                        </button>
                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/2-rect-2.svg`)">
                                            <img src="{{ url('/') }}/objects/2-rect-2.svg" width="50px"
                                                alt="" />
                                        </button>
                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/2-rect-3.svg`)">
                                            <img src="{{ url('/') }}/objects/2-rect-3.svg" width="50px"
                                                alt="" />
                                        </button>

                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/3-triangle-1.svg`)">
                                            <img src="{{ url('/') }}/objects/3-triangle-1.svg" width="50px"
                                                alt="" />
                                        </button>
                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/3-triangle-2.svg`)">
                                            <img src="{{ url('/') }}/objects/3-triangle-2.svg" width="50px"
                                                alt="" />
                                        </button>
                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/3-triangle-3.svg`)">
                                            <img src="{{ url('/') }}/objects/3-triangle-3.svg" width="50px"
                                                alt="" />
                                        </button>

                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/5-poly-1.svg`)">
                                            <img src="{{ url('/') }}/objects/5-poly-1.svg" width="50px"
                                                alt="" />
                                        </button>
                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/5-poly-2.svg`)">
                                            <img src="{{ url('/') }}/objects/5-poly-2.svg" width="50px"
                                                alt="" />
                                        </button>
                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/5-poly-3.svg`)">
                                            <img src="{{ url('/') }}/objects/5-poly-3.svg" width="50px"
                                                alt="" />
                                        </button>
                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/6-poly-1.svg`)">
                                            <img src="{{ url('/') }}/objects/6-poly-1.svg" width="50px"
                                                alt="" />
                                        </button>
                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/6-poly-2.svg`)">
                                            <img src="{{ url('/') }}/objects/6-poly-2.svg" width="50px"
                                                alt="" />
                                        </button>
                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/6-poly-3.svg`)">
                                            <img src="{{ url('/') }}/objects/6-poly-3.svg" width="50px"
                                                alt="" />
                                        </button>
                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/7-arrow-1.svg`)">
                                            <img src="{{ url('/') }}/objects/7-arrow-1.svg" width="50px"
                                                alt="" />
                                        </button>
                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/7-arrow-2.svg`)">
                                            <img src="{{ url('/') }}/objects/7-arrow-2.svg" width="50px"
                                                alt="" />
                                        </button>

                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/7-arrow-3.svg`)">
                                            <img src="{{ url('/') }}/objects/7-arrow-3.svg" width="50px"
                                                alt="" />
                                        </button>
                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/bookmark-shapes.svg`)">
                                            <img src="{{ url('/') }}/objects/bookmark-shapes.svg" width="50px"
                                                alt="" />
                                        </button>
                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/circle.svg`)">
                                            <img src="{{ url('/') }}/objects/circle.svg" width="50px"
                                                alt="" />
                                        </button>
                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/cloud.svg`)">
                                            <img src="{{ url('/') }}/objects/cloud.svg" width="50px"
                                                alt="" />
                                        </button>

                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/cube.svg`)">
                                            <img src="{{ url('/') }}/objects/cube.svg" width="50px" alt="" />
                                        </button>
                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/heart.svg`)">
                                            <img src="{{ url('/') }}/objects/heart.svg" width="50px"
                                                alt="" />
                                        </button>
                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/moon.svg`)">
                                            <img src="{{ url('/') }}/objects/moon.svg" width="50px" alt="" />
                                        </button>
                                        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                                            onclick="addObjectImage(`{{ url('/') }}/objects/star.svg`)">
                                            <img src="{{ url('/') }}/objects/star.svg" width="50px" alt="" />
                                        </button>
                                    </div>
                                </div>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div class="prd-opt-two">
                            <button class="border rounded-lg p-2 px-3 place-btn" onclick="setShowDetailsModal(true)">
                                Next
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>


    <div id="modal" hidden>
        <div class="fixed z-20 overflow-y-auto top-0 w-full left-0">
            <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity">
                    <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen">
                    &#8203;
                </span>
                <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <label class="font-medium text-gray-800">Image Url</label>
                        <input type="text" id="imgUrl"
                            class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                            value="" />
                    </div>

                    <div class="bg-gray-200 px-4 py-3 text-right">

                        <button type="button" class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                            type="submit" onclick="addSample()">
                            Try Sample
                        </button>
                        
                        <button type="button" class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                            type="submit" onclick="submitImgUrl()">
                            Add
                        </button>

                        <button type="button" class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                            onclick="setShowModal(false)">
                            Cancel
                        </button>

                        
                        
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div id="customer-modal" hidden>

        <div class="fixed z-10 overflow-y-auto top-0 w-full left-0" style="z-index: 1000">
            <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity">
                    <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen">
                    &#8203;
                </span>
                <div class="fodal inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog" style="max-width: 45rem;" aria-modal="true" aria-labelledby="modal-headline">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <label class="font-bold text-gray-800">Order Shipping Details:</label>
                        <br>
                        <br>

                        <label class="font-medium text-gray-800">Name*</label>
                        <input type="text" id="cd_name"
                            class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3" name="cd_name" value=""
                            placeholder="Full Name" required />

                        <label class="font-medium text-gray-800">Email*</label>
                        
                        <input type="text" id="cd_email"
                            class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                            placeholder="email" value="{{ auth()->check() ? auth()->user()->email : '' }}"
                            name="cd_email" required />

                        <label class="font-medium text-gray-800">Phone Number*</label>
                        <input type="text" id="cd_number"
                            class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3" value=""
                            placeholder="Phone Number" name="cd_number" required />

                        <label class="font-medium text-gray-800">Address*</label>
                        <input type="text" id="cd_address"
                            class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3" value=""
                            placeholder="Address" name="cd_address" required />

                        <label class="font-medium text-gray-800">City*</label>
                        <input type="text" id="cd_city"
                            class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3" value=""
                            placeholder="City" name="cd_city" required />
                        <label class="font-medium text-gray-800">Zip Code*</label>
                        <input type="text" id="cd_zip"
                            class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3" value=""
                            placeholder="Zip code" name="cd_zip" required />
                        <label class="font-medium text-gray-800 country_label">Country*</label><br>
                        <select style="height: 40px; border: 1px solid #eee"
                            class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3" name="country" id="country"
                            onchange="onCountrySelect()">
                            <option value="">Select</option>
                        </select>
                        <label class="font-medium text-gray-800" id="state_label" hidden>State*</label><br>
                        <select style="height: 40px; border: 1px solid #eee"
                            class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3" name="state" id="state"
                            hidden>
                            <option value="select" disabled>select</option>
                        </select>

                        {{-- <br>
                        <br>
                        <div id="price" class="font-medium text-gray-800">Price:</div>
                        <div id="front" class="font-medium text-gray-800" hidden>Front:</div>
                        <div id="back" class="font-medium text-gray-800" hidden>Back:</div>
                        <div id="subtotal" class="font-medium text-gray-800">Subtotal:</div>
                        <div id="shipping" class="font-medium text-gray-800">Shipping:</div>
                        <div id="total" class="font-bold text-gray-800">Total:</div> --}}
                    </div>

                    <div class="bg-gray-200 px-4 py-3 text-right">
                        <button type="button" class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                            onclick="setShowDetailsModal(false)">
                            Cancel
                        </button>

                        <button onclick="submitCustomerDetails()"
                            class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2">Submit
                        </button>

                    </div>
                </div>
            </div>
        </div>
        </form>
    </div>

    <div id="payment-modal" hidden>
        <form action="{{ route('charge') }}" method="post" id="payment-form">
            @csrf
            <div class="fixed z-10 overflow-y-auto top-0 w-full left-0" style="z-index: 1000">
                <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div class="fixed inset-0 transition-opacity">
                        <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
                    </div>
                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen">
                        &#8203;
                    </span>
                    <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                        role="dialog" style="max-width: 50rem;" aria-modal="true" aria-labelledby="modal-headline">
                        
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4" style="overflow-y: auto;height: 650px;">
                            <label class="font-bold text-gray-800">Payment Details</label>
                            <br>
                            <br>
                            
                            <div class="pricing_details">
                                <div id="price" class="font-medium text-gray-800">Price:</div>
                                <div id="front" class="font-medium text-gray-800">Front:</div>
                                <div id="front_text" class="font-medium text-gray-800">Front Text:</div>
                                <div id="back" class="font-medium text-gray-800">Back:</div>
                                <div id="back_text" class="font-medium text-gray-800">Back Text:</div>
                                <div id="subtotal" class="font-medium text-gray-800">Subtotal:</div>
                                <div id="shipping" class="font-medium text-gray-800">Shipping:</div>
                                <div id="total" class="font-bold text-gray-800">Total: 22</div>
                            </div>

                            <br>
                            <br>
                            <label hidden class="font-medium text-gray-800">Name</label>
                            <input hidden type="text" id="customer_name"
                                class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3" name="customer_name"
                                disabled value="" placeholder="Full Name" required />
                            <label hidden class="font-medium text-gray-800">Email</label>
                            <input hidden type="text" id="customer_email"
                                class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3" value="" disabled
                                placeholder="email" name="customer_email" required />
                            <label hidden class="font-medium text-gray-800">Phone Number</label>
                            <input hidden type="text" id="customer_number"
                                class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3" value="" disabled
                                placeholder="Phone Number" name="customer_number" required />
                            <label hidden class="font-medium text-gray-800">Address</label>
                            <input hidden type="text" id="customer_address"
                                class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3" value="" disabled
                                placeholder="Address" name="customer_address" required />
                            <div class="form-group">
                                <label for="card-element">
                                    Credit or debit card
                                </label>
                                <div id="card-element">
                                    <!-- A Stripe Element will be inserted here. -->
                                </div>
                                <!-- Used to display form errors. -->
                                <div id="card-errors" role="alert"></div>
                            </div>

                            <div class="form-group">
                                <label>Coupon Code</label>
                                <input type="text" name="coupon" id="example5-coupon" style="margin-bottom: 6px;" placeholder="Enter a coupon code" class="form-control">
                                <br><br>
                                <button type="button" id="check-coupon-btn"
                                class="py-2 px-4 bg-gray-500 text-white rounded">Apply Coupon</button>
                                <button type="button" id="remove-coupon-btn" class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2">Remove Coupon</button>

                                <div id="coupon-errors" class="text-danger mt-1"></div> 
                            </div>
                        </div>

                        <div class="bg-gray-200 px-4 py-3 text-right">
                            <button type="button" class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                                onclick="setShowPaymentModal(false)">
                                Cancel
                            </button>

                            <button type="submit" id="checkout-submit-btn"
                                class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2">Submit
                                Payment</button>


                            {{-- <button type="button" class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                                type="submit">
                                Place Order
                            </button> --}}

                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <!-- SPINNER -->
    <div id="loader" hidden wire:loading style="z-index: 2000;"
        class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        <div style="border-top-color: #3498db !important"
            class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
        <p class="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const doneTypingInterval = 1000; // milliseconds (1 second)

            // Elements
            const checkCouponBtn = document.getElementById('check-coupon-btn');
            const couponInput = document.getElementById('example5-coupon');
            const couponErrors = document.getElementById('coupon-errors');
            const totalElement = document.getElementById('total');
            const checkoutSubmitBtn = document.getElementById('checkout-submit-btn');
            const removeCouponBtn = document.getElementById('remove-coupon-btn');

            let originalTotal = parseFloat(totalElement.innerText.replace(/[^0-9.]/g, ''));
            let typingTimer;

            if (checkCouponBtn) {
                checkCouponBtn.addEventListener('click', async (event) => {
                    event.preventDefault(); // Prevent form submission
                    await validateCoupon();
                });
            }

            if (removeCouponBtn) {
                removeCouponBtn.addEventListener('click', (event) => {
                    event.preventDefault(); // Prevent form submission
                    removeCoupon();
                });
            }

            // Function to validate coupon
            async function validateCoupon() {
                const couponValue = couponInput.value.trim();

                if (couponValue === "") {
                    // Clear any previous error messages
                    couponErrors.innerText = '';
                    return false;
                }

                // Disable the coupon input field
                couponInput.disabled = true;

                // Display a message indicating coupon validation is in progress
                couponErrors.innerText = 'Please wait, checking coupon...';

                typingTimer = setTimeout(async () => {
                    try {
                        const response = await fetch('/check_coupon', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRF-TOKEN': '{{ csrf_token() }}' // Include CSRF token if you're using it
                            },
                            body: JSON.stringify({ coupon: couponValue })
                        });

                        const data = await response.json();

                        if (response.ok) {
                            // Coupon validation succeeded, update UI accordingly
                            console.log('Coupon is valid:', data);
                            couponErrors.innerText = data.message;

                            // Update the displayed price if a discount is applied
                            if (data.valid && data.discount > 0) {
                                let discountedPrice;

                                if (data.discount_type === 'fixed_amount') {
                                    // If the discount is a fixed amount
                                    discountedPrice = originalTotal - parseFloat(data.discount); // Adjusted price after discount
                                } else {
                                    // If the discount is a percentage
                                    discountedPrice = originalTotal * (1 - (parseFloat(data.discount) / 100)); // Adjusted price after discount
                                }

                                totalElement.innerText = `$${discountedPrice.toFixed(2)}`;
                                checkoutSubmitBtn.innerText = `Pay $${discountedPrice.toFixed(2)}`;

                            } else {
                                // No discount applied, display original price
                                totalElement.innerText = `$${originalTotal.toFixed(2)}`;
                                checkoutSubmitBtn.innerText = `Pay $${originalTotal.toFixed(2)}`;
                            }

                            if (!data.valid) {
                                couponInput.value = '';
                            }
                        } else {
                            // Coupon validation failed, display error message
                            console.error('Coupon validation failed:', data.error);
                            couponErrors.innerText = data.message;
                        }
                    } catch (error) {
                        // Handle network error
                        console.error('Network error:', error);
                        couponErrors.innerText = error.message;
                    } finally {
                        // Re-enable the coupon input field after validation is complete
                        couponInput.disabled = false;
                    }
                }, doneTypingInterval);
            }

            // Function to remove coupon
            function removeCoupon() {
                couponInput.value = '';
                couponErrors.innerText = '';
                totalElement.innerText = `$${originalTotal.toFixed(2)}`;
                checkoutSubmitBtn.innerText = `Pay $${originalTotal.toFixed(2)}`;
            }
        });
    </script>
    
    <script src="https://js.stripe.com/v3/"></script>
    <script>
        const stripe = Stripe('{{ env('STRIPE_KEY') }}');
        const elements2 = stripe.elements();

        // Create an instance of the card Element.
        const card = elements2.create('card');

        // Add an instance of the card Element into the `card-element` div.
        card.mount('#card-element');

        // Handle form submission.
        const form = document.getElementById('payment-form');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            // setIsLoading(true);

            // Create a payment method using the card Element.
            const {
                paymentMethod,
                error
            } = await stripe.createPaymentMethod({
                type: 'card',
                card: card,
            });

            if (error) {
                // Display error message to the user.
                const errorElement = document.getElementById('card-errors');
                errorElement.textContent = error.message;
            } else {
                // If no errors, token should be sent to your server.
                stripeTokenHandler(paymentMethod);
            }
        });

        // Send the payment method ID to your server to complete the payment.
        const stripeTokenHandler = async (paymentMethod) => {
            const token = paymentMethod.id;

            // Submit the form with the token ID to your Laravel controller.
            const amountString = document.getElementById('total').innerText;
            const extractedDecimal = extractPriceFromString(amountString);

            console.log('extractedDecimal', extractedDecimal, document.getElementById('total'));

            if (extractedDecimal !== null) {
                const decimalValue = parseFloat(extractedDecimal);
                const centsValue = convertToCents(decimalValue);
                const coupon = document.getElementById('example5-coupon').value.trim();;

                const formData = new FormData();
                formData.append('_token', '{{ csrf_token() }}');
                formData.append('payment_method_id', token);
                formData.append('total', centsValue);
                formData.append('coupon', coupon);

                try {
                    setIsLoading(true)
                    const response = await fetch('{{ route('charge') }}', {
                        method: 'POST',
                        body: formData,
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok.');
                    }

                    const data = await response.json();

                    if (data.success) {
                        // alert(data.message);
                        Toastify({
                            text: "Payment Success!",
                            className: "info",
                        }).showToast();
                        
                        placeOrder(data.payment_id);

                    } else {
                        alert(data.error);
                    }
                    
                    // submitPayment()
                    // window.location.reload();
                } catch (error) {
                    console.error('There was an error:', error);
                    alert('There was an error while processing the payment.');
                }
            } else {
                alert('No Price');
                setIsLoading(false);
            }
        };

        function extractPriceFromString(text) {
            const regex = /\$?\d+(\.\d+)?/g; // Regular expression to match prices

            const matches = text.match(regex); // Get all matches in the text

            if (matches) {
                return matches.map(match => parseFloat(match.replace('$', ''))); // Parse to floats
            } else {
                return null; // Return null if no price is found
            }
        }

        function convertToCents(decimalAmount) {
            const cents = Math.round(decimalAmount * 100);
            return cents;
        }

        /*
        const expand_option = document.querySelector('.expand_option');
        const prd_objects = document.querySelector('.prd-objects');

        expand_option.addEventListener('click', function() {
            const computedStyle = window.getComputedStyle(prd_objects);
            const displayProperty = computedStyle.getPropertyValue('display');

            if (displayProperty === 'none') {
                prd_objects.style.display = 'block';
            } else {
                prd_objects.style.display = 'none';
            }
        });
        */
    </script>

    <script>
        window.addEventListener('load', function() {
            // Get the country dropdown element
            var countryDropdown = document.getElementById('country');
            var country_label = document.querySelector('.country_label');

            // Select the second option
            if (countryDropdown.options.length > 1) {
                countryDropdown.selectedIndex = 1;

                // Trigger the change event
                var event = new Event('change');
                countryDropdown.dispatchEvent(event);
                countryDropdown.style.display = 'none';
                country_label.style.display = 'none';
            }
        });
    </script>
@endsection
