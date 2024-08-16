@extends('frontend.layout.homepagelayout')

@section('content')

<style>
    /* Custom styles for the form */
    form {
        border: 3px solid #f1f1f1;
        padding: 20px;
    }

    input[type=text], input[type=password] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
        border-radius: 5px;
    }

    .cancelbtn {
        width: auto;
        padding: 10px 18px;
        background-color: #f44336;
    }

    .imgcontainer {
        text-align: center;
        margin: 24px 0 12px 0;
    }

    .container {
        padding: 16px;
    }

    .left-content {
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .left-content h2 {
        margin-bottom: 20px;
    }

    .right-content h2 {
        margin-bottom: 20px;
    }

    /* Responsive design */
    @media screen and (max-width: 768px) {
        .left-content, .right-content {
            margin-bottom: 20px;
        }
    }

    @media screen and (max-width: 300px) {
        span.psw {
            display: block;
            float: none;
        }
        .cancelbtn {
            width: 100%;
        }
    }
</style>

<div class="container mt-5">
    <div class="row">
        <!-- Left Content Section -->
        <div class="col-md-6 left-content">
            <h2>Shop to Join, Advocate, and Donate to a Cause</h2>
            <p>At Cause Stand, your purchase is more than just a transaction, it's a commitment to advocacy. When you place your first order, you'll automatically become a member, gaining access to your personalized user dashboard. Here, you can track your orders, manage your account, and join a community that stands for meaningful change.</p>
            <p>Registering is simple: just complete your purchase, and your account will be created, unlocking a dashboard that puts you at the heart of activism.</p>

            <a href="{{url('/shop')}}" class="btn btn-primary">Shop</a> 
        </div>

        <!-- Right Content Section - Registration Form -->
        <div class="col-md-6 right-content">
            <form method="POST" action="{{ route('register') }}">
                {{ csrf_field() }}

                <div class="imgcontainer">
                    <h2>Sign Up</h2>
                </div>

                <div class="container">
                    <div>
                        <label for="uname"><b>Name</b></label>
                        <input type="text" placeholder="Enter First Name" name="name" value="{{ old('name') }}">
                        @error('name')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    <div>
                        <label for="uname"><b>Email</b></label>
                        <input type="text" placeholder="Enter Email" name="email" value="{{ old('email') }}">
                        @error('email')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    <div>
                        <label for="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="password">
                        @error('password')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    <div>
                        <label for="psw"><b>Confirm Password</b></label>
                        <input type="password" placeholder="Enter Confirm Password" name="password_confirmation">
                        @error('password_confirmation')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>

                    <button type="submit" class="btn btn-primary">Submit</button>  
                    <a class="btn btn-secondary" href="{{ route('forget') }}">
                        <small>Forgot Password?</small>
                    </a>  
                </div>
            </form>
        </div>
    </div>
</div>

@endsection
