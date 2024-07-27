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
								<li><a href="#">Dontation</a></li>
								<li class="active"><a href="#"> Report & Receipts</a></li>
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
								
							<table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th scope="col">Printful #ID</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Total Amount</th>
                                    <th scope="col">Donation</th>
                                    <th scope="col">Country</th>
                                    
                                    <th scope="col">Product</th>
                                    <th scope="col">Invoice</th>
                                </tr>
                                </thead>
                                <tbody>
                                @if($orders) 
                                    @foreach($orders as $order) 
                                    
                                        <tr>
                                            @php
                                                $data = json_decode($order->printful_order_data, true);
                                                $url = url('/').'/stand-with-'.strtolower($order->supporting_country).'/shop/'.strtolower($order->product_for).'/'.strtolower($order->product_type).'/'.$order->product_slug;                        
                                            @endphp

                                            <th scope="row">{{$data['id']}}</th>
                                            <td>{{$order->website_product_name}}</td>
                                            <td>{{$order->print_order_status}}</td>
                                            <td>${{$data['retail_costs']['total']}}</td>
                                            <td>${{$order->total_amount - $order->product_price}}</td>
                                            <td>{{$order->supporting_country}}</td>
                                            
                                            <td>
                                                <button type="button" class="btn btn-primary" onclick="window.open('{{ $url }}', '_blank')"><i class="far fa-eye"></i></button>
                                                <button style="display:none;" type="button" class="btn btn-success"><i class="fas fa-edit"></i></button>
                                                <button style="display:none;" type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-primary" onclick="window.open('{{ url('/invoice/' . $order->id) }}', '_blank')" style="cursor: pointer;"><i class="far fa-eye"></i></button>
                                            </td>
                                        </tr>
                                    @endforeach
                                @endif  
                                </tbody>
                            </table>

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