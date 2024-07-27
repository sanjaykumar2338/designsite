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

							<nav>
                                <ul class="pagination justify-content-center">
                                    @if ($orders->onFirstPage())
                                        <li class="page-item disabled"><span class="page-link"><< Previous</span></li>
                                    @else
                                        <li class="page-item"><a class="page-link" href="{{ $orordersders->previousPageUrl() }}" rel="prev"><< Previous</a></li>
                                    @endif

                                    @for ($i = 1; $i <= $orders->lastPage(); $i++)
                                        @if ($i == $orders->currentPage())
                                            <li class="page-item active"><span class="page-link">{{ $i }}</span></li>
                                        @else
                                            <li class="page-item"><a class="page-link" href="{{ $orders->url($i) }}">{{ $i }}</a></li>
                                        @endif
                                    @endfor

                                    @if ($orders->hasMorePages())
                                        <li class="page-item"><a class="page-link" href="{{ $orders->nextPageUrl() }}" rel="next">Next >></a></li>
                                    @else
                                        <li class="page-item disabled"><span class="page-link">Next >></span></li>
                                    @endif
                                </ul>
						    </nav>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

    
@endsection