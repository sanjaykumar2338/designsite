@extends('frontend.layout.homepagelayout')
@section('content')
    
<div class="wrapper">
	<div class="community-head">
		<div class="container">
			<div class="row-flx">
				<div class="cl-md-6">
					<div class="cmt-head-left">
						<div class="cmt-head-img">
							<img src="{{fileToUrl($collection->blog_image)}}"/>
						</div>
						<div class="cmt-head-cont">
							<ul class="cmt-list">
								<li><strong>Movement:</strong>{{$collection->movement}}</li>
								<li><strong>Collection:</strong>{{$collection->title}}</li>
								<li><strong>Mission:</strong>{{$collection->mission}}</li>
							</ul>
						</div> 
					</div>
					
				</div>
				<div class="cl-md-6">
					<div class="cmt-head-right">
						<ul class="cmt-list">
								<li><strong>Members:</strong>{{$total_member}}</li>
								<li><strong>Donations:</strong>{{$donation}}</li>
								<li><strong>Donations to:</strong>{{$collection->donations_to}}</li>
							</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="cm-breadcreum">
		<div class="container">
			<div class="breadcreum-flex">
				<div class="left-bred">
					<ul>
						<li><a href="#">Members</a></li>
						<li><a href="#">Feeds</a></li>
						<li><a href="#"># & @</a></li>
					</ul>
				</div>
				<div class="right-bred">
					<a href="#">simple community</a>
				</div>
			</div>
		</div>
	</div>
	<div class="member-area">
		<div class="container">
			@if($users->count() > 0 && $type=='members') 
				<div class="member-area-rep">
					<div class="member-area-head">
						<h2>New Members</h2>
					</div>
					<div class="mem-data">
						
							@foreach($users as $index => $user)
								<div class="mem-wd">
									<div class="mem-inner">
										<div class="mem-img">
											@if($user->profile_image != "")
												<img src="{{url('/mediaimages/boycott-movement-media.png')}}"/>
											@else
												<img src="https://causestand.com/storage/images/ysbJQNOkIsc3Nhks5tOH4eaBU95B8R9AsLAZ5kSw.png"/>
											@endif
										</div>
										<div class="mem-content">
											<h3>Explore</h3>
											<ul class="cmt-list">
												<li><strong>Movement:</strong>{{$collection->movement}}</li>
												<li><strong>Collection:</strong>{{$collection->title}}</li>
												<li><strong>Mission:</strong>{{$collection->mission}}</li>
											</ul>
										</div>
									</div>
								</div>
							@endforeach
					</div>
				</div>
			@endif
			
			@if($orders->count() > 0 && $type=='purchases')  
				<div class="member-area-rep">
					<div class="member-area-head">
						<h2>Member Purchases</h2>
						<a href="#">View All</a>
					</div>
					<div class="mem-data">
						@foreach($orders as $order) 
							@php
								$data = json_decode($order->printful_order_data, true);
								$url = url('/').'/stand-with-'.strtolower($order->supporting_country).'/shop/'.strtolower($order->product_for).'/'.strtolower($order->product_type).'/'.$order->product_slug;   
								
								$file = $data['items'][0]['files'][0];
							@endphp

							<div class="mem-wd">
								<div class="mem-inner">
									<div class="mem-img">
										<img src="{{$file['url']}}"/>
									</div>
									<div class="mem-content">
										<h3>Explore</h3>
										<ul class="cmt-list">
											<li><strong>Movement:</strong>Boycott</li>
											<li><strong>Collection:</strong>Oversight</li>
											<li><strong>Mission:</strong>Hold institutions accountable for biased influence.</li>
										</ul>
									</div>
								</div>
							</div>
						@endforeach
					</div>
				</div>
			@endif
			
			<div class="member-area-rep" style="display:none">
				<div class="member-area-head">
					<h2>Member Feeds</h2>
				</div>
				<div class="mem-data">
					<div class="mem-wd">
						<div class="mem-inner">
							<div class="mem-img">
								<img src="{{url('/mediaimages/boycott-movement-media.png')}}"/>
							</div>
							<div class="mem-content">
								<h3>Explore</h3>
								<ul class="cmt-list">
									<li><strong>Movement:</strong>Boycott</li>
									<li><strong>Collection:</strong>Oversight</li>
									<li><strong>Mission:</strong>Hold institutions accountable for biased influence.</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="mem-wd">
						<div class="mem-inner">
							<div class="mem-img">
								<img src="{{url('/mediaimages/boycott-movement-media.png')}}"/>
							</div>
							<div class="mem-content">
								<h3>Explore</h3>
								<ul class="cmt-list">
									<li><strong>Movement:</strong>Boycott</li>
									<li><strong>Collection:</strong>Oversight</li>
									<li><strong>Mission:</strong>Hold institutions accountable for biased influence.</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="mem-wd">
						<div class="mem-inner">
							<div class="mem-img">
								<img src="{{url('/mediaimages/boycott-movement-media.png')}}"/>
							</div>
							<div class="mem-content">
								<h3>Explore</h3>
								<ul class="cmt-list">
									<li><strong>Movement:</strong>Boycott</li>
									<li><strong>Collection:</strong>Oversight</li>
									<li><strong>Mission:</strong>Hold institutions accountable for biased influence.</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="mem-wd">
						<div class="mem-inner">
							<div class="mem-img">
								<img src="{{url('/mediaimages/boycott-movement-media.png')}}"/>
							</div>
							<div class="mem-content">
								<h3>Explore</h3>
								<ul class="cmt-list">
									<li><strong>Movement:</strong>Boycott</li>
									<li><strong>Collection:</strong>Oversight</li>
									<li><strong>Mission:</strong>Hold institutions accountable for biased influence.</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="mem-wd">
						<div class="mem-inner">
							<div class="mem-img">
								<img src="{{url('/mediaimages/boycott-movement-media.png')}}"/>
							</div>
							<div class="mem-content">
								<h3>Explore</h3>
								<ul class="cmt-list">
									<li><strong>Movement:</strong>Boycott</li>
									<li><strong>Collection:</strong>Oversight</li>
									<li><strong>Mission:</strong>Hold institutions accountable for biased influence.</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection