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

    .alert {
        margin-top: 10px;
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
    }
</style>

<div class="container mt-5">
    <div class="row">
        <!-- Left Content Section -->
        <div class="col-md-6 left-content">
            <h2>Login to Advocate to - Shop to Subscribe to Cause Stand</h2>
            <p>Welcome Back, Advocate! Log in to your Cause Stand account to continue your journey of advocacy and activism. By accessing your personalized dashboard, you can manage your orders, customize your apparel, and stay connected with the causes you support. Whether you’re standing with Israel, Palestine, Russia, or Ukraine, your voice matters here.</p>
            <a href="{{url('/shop')}}" class="btn btn-primary">Shop</a> 
        </div>

        <!-- Right Content Section - Login Form -->
        <div class="col-md-6 right-content">
            <form method="POST" action="{{ route('login') }}">
                @csrf

                <div class="imgcontainer">
                    <h2>Login</h2>
                </div>

                @if ($errors->any())
                    <div class="alert alert-danger">
                        {{ $errors->first() }}
                    </div>
                @endif

                @if(session('message'))
                    <div class="alert alert-info">
                        {{ session('message') }}
                    </div>
                @endif

                @if(session('status'))
                    <div class="alert alert-info">
                        {{ session('status') }}
                    </div>
                @endif

                <div class="container">
                    <label for="uname"><b>Email</b></label>
                    <input type="text" placeholder="Enter Username" name="email" required>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" required>
                        
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
