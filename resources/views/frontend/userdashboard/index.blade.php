@extends('frontend.layout.homepagelayout')
@section('content')

<style>
body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box}

/* Full-width input fields */
input[type=text], input[type=password],input[type=url] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for all buttons */
button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

button:hover {
  opacity:1;
}

/* Extra styles for the cancel button */
.cancelbtn {
  padding: 14px 20px;
  background-color: #f44336;
}

/* Float cancel and signup buttons and add an equal width */
.cancelbtn, .signupbtn {
  float: left;
  width: 50%;
}

/* Add padding to container elements */
.container {
  padding: 16px;
}

/* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

/* Change styles for cancel button and signup button on extra small screens */
@media screen and (max-width: 300px) {
  .cancelbtn, .signupbtn {
     width: 100%;
  }
}
</style>
<div class="us-dashborad">
	<div class="container">
		<div class="row">
			
			@include('frontend.userdashboard.sidebar')

			<div class="user-content">
				<div class="user-content-inner">
					<div class="us-head">
						<div class="us-head-menu">
							<ul>
								<li class="active"><a href="#">My Account</a></li>
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
							
							@if ($errors->any())
								<div class="alert alert-danger">
									<ul>
										@foreach ($errors->all() as $error)
											<li>{{ $error }}</li>
										@endforeach
									</ul>
								</div>
							@endif

							@if (session('success'))
								<div class="alert alert-success">
									{{session('success')}}
								</div>
							@endif

							<form class="form-group" method="POST" action="{{ route('updateprofile') }}" enctype="multipart/form-data">
									@csrf
									<div class="container">
										
										<label for="email"><b>First Name,</b></label>
										<input type="text" value="{{old('first_name', auth()->user()->first_name)}}" placeholder="Enter First Name" name="first_name" required>

										<label for="email"><b>Last Name</b></label>
										<input type="text" value="{{old('last_name', auth()->user()->last_name)}}" placeholder="Enter Last Name" name="last_name" required>

										<label for="email"><b>Email</b></label>
										<input type="text" value="{{old('email', auth()->user()->email)}}" placeholder="Enter Email" name="email" required>

										<label for="psw"><b>Password</b></label>
										<input type="password" value="{{old('password')}}" placeholder="Enter Password" name="password">

										<label for="psw"><b>Facebook Feed URL</b></label>
										<input type="url" value="{{old('facebook', auth()->user()->facebook)}}" placeholder="Enter Feedback URL" name="facebook">

										<label for="psw"><b>Instagram Feed URL</b></label>
										<input type="url" value="{{old('instagram', auth()->user()->instagram)}}" placeholder="Enter Instagram URL" name="instagram">

										<label for="psw"><b>Tiktok Feed URL</b></label>
										<input type="url" value="{{old('tiktok', auth()->user()->tiktok)}}" placeholder="Enter Tiktok URL" name="tiktok">

										<label for="psw"><b>Youtube Feed URL</b></label>
										<input type="url" value="{{old('youtube', auth()->user()->youtube)}}" placeholder="Enter Youtube URL" name="youtube">

										<label for="psw-repeat"><b>Image</b></label>
										<input type="file" name="profile_image">

										<br><br>
										<div class="clearfix">
										<button type="submit" class="cancelbtn">Update</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

    
@endsection