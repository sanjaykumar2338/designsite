@extends('frontend.layout.homepagelayout')

@section('content')

<style>
     form {border: 3px solid #f1f1f1;}

    input[type=text], input[type=password] {
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      box-sizing: border-box;
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

    img.avatar {
      width: 40%;
      border-radius: 50%;
    }

    .container {
      padding: 16px;
    }

    span.psw {
      float: right;
      padding-top: 16px;
    }

    /* Change styles for span and cancel button on extra small screens */
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
</head>
<body>
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
    <a class="btn btn-primary" href="{{ route('forget') }}">
        <small>Forgot Password?</small>
    </a> 
  </div>
</form>
@endsection