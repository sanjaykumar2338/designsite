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
								<li class="active"><a href="#">Community</a></li>
							</ul>
						</div>
					</div>
					
					<div class="us-order-main">
						<div class="us-bought">
						<div class="row">
							@if($users) 
								@foreach($users as $index => $user)
									@if($index % 3 == 0 && $index != 0)
										</div>
										<div class="row">
									@endif
									<div class="col-lg-4 col-md-4">
										<div class="bought-img">
											@if($user->profile_image != "")
												<img src="{{ asset('/images/profile/'.$user->profile_image) }}"/>
											@else
												<img src="https://causestand.com/storage/images/ysbJQNOkIsc3Nhks5tOH4eaBU95B8R9AsLAZ5kSw.png"/>
											@endif
										</div>
										<div class="bought-content">
											<h3 style="text-align:center">{{$user->first_name}} {{$user->last_name}}</h3>
											<div class="us-head-social" style="padding-left:50px">
												<ul>
													@if($user->facebook)
														<li><a href="{{$user->facebook}}" target="_blank"><i class="fa-brands fa-facebook-f"></i></a></li>
													@endif
													@if($user->instagram)
														<li><a href="{{$user->instagram}}" target="_blank"><i class="fa-brands fa-instagram"></i></a></li>
													@endif
													@if($user->tiktok)
														<li><a href="{{$user->tiktok}}" target="_blank"><i class="fa-brands fa-tiktok"></i></a></li>
													@endif
													@if($user->youtube)
														<li><a href="{{$user->youtube}}" target="_blank"><i class="fa-brands fa-youtube"></i></a></li>
													@endif
												</ul>
											</div>
										</div>
									</div>
								@endforeach
							@endif
						</div>
						</div>
						<nav>
							<ul class="pagination justify-content-center">
								@if ($users->onFirstPage())
									<li class="page-item disabled"><span class="page-link"><< Previous</span></li>
								@else
									<li class="page-item"><a class="page-link" href="{{ $orders->previousPageUrl() }}" rel="prev"><< Previous</a></li>
								@endif

								@for ($i = 1; $i <= $users->lastPage(); $i++)
									@if ($i == $users->currentPage())
										<li class="page-item active"><span class="page-link">{{ $i }}</span></li>
									@else
										<li class="page-item"><a class="page-link" href="{{ $users->url($i) }}">{{ $i }}</a></li>
									@endif
								@endfor

								@if ($users->hasMorePages())
									<li class="page-item"><a class="page-link" href="{{ $users->nextPageUrl() }}" rel="next">Next >></a></li>
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

    
@endsection