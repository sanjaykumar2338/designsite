<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{env('APP_NAME')}}</title>
    <!-- stylesheet  -->
    <!--
        <link rel="stylesheet" href="asset/frontend/css/stylesheet.css">
        <link rel="stylesheet" href="asset/frontend/css/responsive.css">
    -->

    <link rel="stylesheet" href="{{url('/')}}/asset/frontend/css/bootstrap.min.css">
    <link rel="stylesheet" href="{{url('/')}}/asset/frontend/css/responsive.css">
    <link rel="stylesheet" href="{{url('/')}}/asset/frontend/css/stylesheet.css">
    <link rel="stylesheet" href="{{url('/')}}/asset/frontend/css/final-style.css">
    <link rel="stylesheet" href="{{url('/')}}/asset/frontend/css/final-responsive.css">

    
    <!-- font-awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- slider cdn  -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css"
        integrity="sha512-tS3S5qG0BlhnQROyJXvNjeEM4UpMXHrQfTGmbQ1gKmelCxlSEBUaxhRBj/EFTzpbP4RVSrpEikbmdJobCvhE3g=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css"
        integrity="sha512-sMXtMNL1zRzolHYKEujM2AqCLUR9F2C4/05cdbxjjLSRvMQIciEPCQZo++nk7go3BtSuK9kfa/s+a4f4i5pLkw=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="{{url('/')}}/asset/frontend/images/new-logo.jpg">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js"
        integrity="sha512-CeIsOAsgJnmevfCi2C7Zsyy6bQKi43utIjdA87Q0ZY84oDqnI0uwfM9+bKiIkI75lUeI00WG/+uJzOmuHlesMA=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">

    <style>
        .loader {
            border-top-color: #3498db;
            -webkit-animation: spinner 1.5s linear infinite;
            animation: spinner 1.5s linear infinite;
        }

        @-webkit-keyframes spinner {
            0% {
                -webkit-transform: rotate(0deg);
            }

            100% {
                -webkit-transform: rotate(360deg);
            }
        }

        @keyframes spinner {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        #payment-modal form button.py-2:nth-of-type(2) {
            background-color: #eb3e32;
        }

        #payment-modal form label {
            font-size: 30px;
            font-weight: 600;
            border-bottom: 1px solid #d9d9d9;
            width: 100%;
            padding: 0 0 10px;
            margin: 0 0 15px;
        }

        #payment-modal form br {
            display: none;
        }

        #payment-modal form .form-group label {
            font-size: 22px;
        }

        #payment-modal form .form-group {
            margin-top: 20px;
            border: 1px solid #eee;
            background-color: #fff;
            box-shadow: rgb(149 157 165 / 10%) 0px 4px 14px;
            padding: 20px;
            border-radius: 10px;
        }
        @media only screen and (max-width:767px){
        #payment-modal form label {
            font-size: 24px
        }  
        #payment-modal form .form-group label{
            font-size: 18px;
        }    
        }

        div#price {
            font-weight: 400;
        }

        div#front {
            font-weight: 400;
        }

        div#back {
            font-weight: 400;
        }

        div#subtotal {
            font-weight: 400;
        }

        div#total {
            color: #eb3e32;
            margin-top: 10px;
            font-size: 20px;
        }

        #payment-modal form .bg-gray-200.px-4.py-3.text-right {
            background-color: #F2F3F7;
        }

        .pricing_details {
            border: 1px solid #eee;
            background-color: #fff;
            box-shadow: rgb(149 157 165 / 10%) 0px 4px 14px;
            padding: 20px;
            border-radius: 10px;
        }
        
    </style>
    
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4830008298391201"
     crossorigin="anonymous"></script>
</head>

<body>
    
    <!-- ========== Start top-bar ========== -->
    
    <input type="hidden" value="{{url('/')}}" id="site_url">

    <div class="top-bar">
        <div class="container">
            <div class="row">
                <div class="col-md-9">
                    <div class="left-side" id="logo-hide">
                    <img onclick="window.location.href = '{{ route('home') }}';" src="{{ url('/asset/frontend/images/new-logo.jpg') }}" alt="">
                    </div>
                </div>
                <div class="col-lg-3 d-flex justify-content-end">
                    <div class="left-side">

                        @if (Auth::check())
                            <li>
                                <span style="cursor: pointer;" class="add-border" onclick='location.href ="{{route('myaccount')}}";'>
                                    My Account
                                </span>
                            </li>
                            <li>
                                <span style="cursor: pointer;" onclick='location.href ="{{route('logout')}}";'>
                                    Logout
                                </span>
                            </li>
                        @else                            
                            <li>
                                <span style="cursor: pointer;" class="add-border" onclick='location.href ="{{route('register')}}";'>
                                    sign up
                                </span>
                            </li>

                            <li>
                                <span style="cursor: pointer;" onclick='location.href ="{{route('login')}}";'>
                                    sign in
                                </span>
                            </li>
                        @endif

                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- ========== End top-bar ========== -->
    <!-- ========== Start header ========== -->
    <header class="position-sticky">
        <nav class="navbar navbar-expand-lg ">
            <div class="container">
                <a class="navbar-brand" href="{{url('/')}}"> <img src="{{url('/')}}/asset/frontend/images/new-logo.jpg" alt="">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="{{route('home')}}">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{route('conflicts')}}">Conflicts</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{route('causes')}}">Causes</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{route('collections')}}">Shop</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{route('media')}}">Media</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{route('justice')}}">Justice</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{route('blogs')}}">Blog</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{route('aboutus')}}">About Us</a>
                        </li>
                        <button hidden class="donate" onclick='location.href ="{{route('donate_now')}}";'>DONATE NOW</button>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    @yield('content')

    <!-- ========== Start footer ========== -->
    @include('frontend.layout.footer')
    <!-- ========== End footer ========== -->
    <!-- js file  -->
    <!-- slider cdn  -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
        integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"
        integrity="sha512-bPs7Ae6pVvhOSiIcyUClR7/q2OAsRiovw4vAkX+zJbw3ShAeeqezq50RIIcIURq7Oa20rW2n2q+fyXBNcU9lrw=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="{{url('/')}}/asset/frontend/js/bootstrap.bundle.min.js"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        AOS.init();
    </script>
    <script>
        var owl = $('.owl-carousel');
        owl.owlCarousel({
            items: 4,
            loop: true,
            margin: 30,
            autoplay: true,
            autoplayTimeout: 1000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 4
                }
            }
        });
        $('.play').on('click', function () {
            owl.trigger('play.owl.autoplay', [1500])
        })
        $('.stop').on('click', function () {
            owl.trigger('stop.owl.autoplay')
        })
    </script>    
    <script src="{{url('/')}}/script.js?v={{time()}}"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        clifford: "#da373d",
                    },
                },
            },
        };
    </script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
    <!-- Google tag (gtag.js) --> <script async src="https://www.googletagmanager.com/gtag/js?id=G-WHL9MP7892"></script> <script> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-WHL9MP7892'); </script>
</body>
</html>