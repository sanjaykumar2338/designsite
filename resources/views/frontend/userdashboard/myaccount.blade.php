@extends('frontend.layout.homepagelayout')
@section('content')

<div class="us-dashborad">
	<div class="container">
		<div class="row">
			
			@include('frontend.userdashboard.sidebar')

			<div class="user-content">
				<div class="user-content-inner">
					<div class="us-head">
						<div class="us-head-menu">
							<ul>
								<li><a href="#">Order</a></li>
								<li class="active"><a href="#">History</a></li>
							</ul>
						</div>
						<div class="us-head-social">
							<ul>
								<li><a href="https://www.facebook.com/causestand" target="_blank"><i class="fa-brands fa-facebook-f"></i></a></li>
								<li><a href="https://www.instagram.com/standcause" target="_blank"><i class="fa-brands fa-instagram"></i></a></li>
								<li><a href="https://www.tiktok.com/@cause.stand" target="_blank"><i class="fa-brands fa-tiktok"></i></a></li>
								<li><a href="https://www.youtube.com/@CauseStand" target="_blank"><i class="fa-brands fa-youtube"></i></a></li>
							</ul>
						</div>
					</div>
					<div class="us-order-main">
						<h2></h2>
						<div class="us-bought">
							<div class="row">
								
							@if($orders) 
            					@foreach($orders as $order) 
									<div class="col-lg-4 col-md-6">

										@php
											$data = json_decode($order->printful_order_data, true);
											$url = url('/').'/stand-with-'.strtolower($order->supporting_country).'/shop/'.strtolower($order->product_for).'/'.strtolower($order->product_type).'/'.$order->product_slug;   
											
											$file = $data['items'][0]['files'][0];
										@endphp

										<div class="bought-bs">
											<div class="bought-img">
												<img src="{{$file['url']}}"/>
											</div>

											<div class="bought-content">
												<h3>{{$order->website_product_name}}</h3>

												@if($order->predesign_order!='yes')
													<a href="{{$url}}" target="_blank">Buy Again</a>
												@else
													@php
														$product = \DB::table('pre_products')->where('id', $order->product_id)->first();
														$collection = \DB::table('collections')->where('id', $order->collection)->first();

														$url = url('/shop').$collection->slug;
													@endphp
													<a href="{{$url}}" target="_blank">Buy Again</a>
												@endif
											</div>
										</div>
									</div>
								@endforeach
							@endif 

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

    
@endsection