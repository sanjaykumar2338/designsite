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
								<li><a href="#">Coupons</a></li>
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
                                    <th>Name</th>
                                    <th>Code</th>
                                    <th>Duration</th>
                                    <th>Discount</th>
                                </tr>
                            </thead>
                            <tbody>
                                @if (count($coupons) > 0)
                                    @foreach ($coupons as $coupon)
                                        <tr>
                                            <td>{{ $coupon['name'] }}</td>
                                            <td>{{ $coupon['code'] }}</td>
                                            <td>{{ ucfirst($coupon['duration']) }}</td>
                                            <td>{{ $coupon['discount'] }}</td>
                                        </tr>
                                    @endforeach
                                @else
                                    <tr>
                                        <td colspan="4" class="text-center">No active coupons available.</td>
                                    </tr>
                                @endif
                            </tbody>
                        </table>

                            

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

    
@endsection