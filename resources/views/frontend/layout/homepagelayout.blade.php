<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ isset($pageTitle) ? $pageTitle : env('APP_NAME') }}</title>
    <meta name="title" content="{{ isset($metaTitle) ? $metaTitle : '' }}">
    <meta name="description" content="{{ isset($metaDescription) ? $metaDescription : '' }}">
    <meta name="keywords" content="{{ isset($keywords) ? $keywords : '' }}">
   
    <link rel="stylesheet" href="{{url('/')}}/asset/frontend/css/bootstrap.min.css?v={{time()}}">
    <link rel="stylesheet" href="{{url('/')}}/asset/frontend/css/responsive.css?v={{time()}}">
    <link rel="stylesheet" href="{{url('/')}}/asset/frontend/css/stylesheet.css?v={{time()}}">
    <link rel="stylesheet" href="{{url('/')}}/asset/frontend/css/final-style.css?v={{time()}}">
    <link rel="stylesheet" href="{{url('/')}}/asset/frontend/css/final-responsive.css?v={{time()}}">
    <link rel="stylesheet" href="{{url('/')}}/asset/frontend/css/media-explore.css?v={{time()}}">


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
    <link rel="icon" type="image/x-icon" href="{{url('asset/frontend/images/new-logo.jpg')}}">

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4830008298391201"
     crossorigin="anonymous"></script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">


</head>
<body>
    <!-- ========== Start top-bar ========== -->
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
                                <span style="cursor: pointer;" class="add-border" onclick='location.href ="{{url('dashboard')}}";'>
                                    My Account
                                </span>
                            </li>
                            <li>
                                <span style="cursor: pointer;" onclick='location.href ="{{route('logout')}}";'>
                                    Logout
                                </span>
                            </li>
                        @else                            
                            <li style="display:none">
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
                    @include('frontend.layout.menu')
                </div>
            </div>
        </nav>
    </header>


    @yield('content')

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4830008298391201"
        crossorigin="anonymous"></script>
    <!-- Causestand -->
    <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-4830008298391201"
        data-ad-slot="1696096485"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
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
        const conflicts = document.querySelectorAll('.option-conflict');
        const box1 = document.getElementById('box-1');
        const box2 = document.getElementById('box-2');
        const box3 = document.getElementById('box-3');
        const box4 = document.getElementById('box-4');
        const box5 = document.getElementById('box-5');
        
        conflicts.forEach(conflict => {
            conflict.addEventListener('click', () => {
                const values = conflict.textContent.split(' & ');

                const li1 = document.querySelector('.option-conflict-li1');
                const li2 = document.querySelector('.option-conflict-li2');

                li1.textContent = values[0];
                li2.textContent = values[1];

                box1.style.display = 'none';
                box2.style.display = 'block';
            });
        });

        const chosenConflicts = document.querySelectorAll('.option-conflict-li1, .option-conflict-li2');

        chosenConflicts.forEach(chosenConflict => {
            chosenConflict.addEventListener('click', () => {
                const values = chosenConflict.textContent;

                const chosenLi1 = document.querySelector('.chosen-conflict-li1');
                const chosenLi2 = document.querySelector('.chosen-conflict-li2');              

                box1.style.display = 'none';
                box2.style.display = 'none';
                box3.style.display = 'block';
            });
        });

        var product = '';
        const box3Options = document.querySelectorAll('.men, .woman, .accessories');
        box3Options.forEach(option => {
            option.addEventListener('click', (event) => {
                product = event.target.className;
                box3.style.display = 'none';
                if(product=='accessories'){
                    box5.style.display = 'block';
                }else{
                    box4.style.display = 'block';
                }
            });
        });

        const box4Options = document.querySelectorAll('.typeofproduct');

        box4Options.forEach(option => {
            option.addEventListener('click', () => {
                box3.style.display = 'none';
                box4.style.display = 'none';
                //box5.style.display = 'block';
            });
        });


        const elements = document.querySelectorAll('.standwith');

        elements.forEach(element => {
            element.addEventListener('click', standwith);
        });

        let standwithtype = 'stand-with-';
        function standwith(event) {
            const text = event.target.textContent;
            standwithtype += event.target.textContent.toLowerCase().trim();
            console.log('Clicked on:', text, standwithtype);
        }

        const elements2 = document.querySelectorAll('.typeofproduct4');

        elements2.forEach(element => {
            element.addEventListener('click', typeofproduct);
        });

        let product_type = '';
        function typeofproduct(event) {
            const productType = event.target.textContent.toLowerCase().trim();
            const baseUrl = "{{ url('product/list') }}/"; 
            const finalUrl = `${baseUrl}${encodeURIComponent(standwithtype)}/${encodeURIComponent(productType)}/${encodeURIComponent(product)}`;

            window.location.href = finalUrl;
            //window.location.href = "{{ url('/') }}/product_list";
        }
    </script>

    <script>
        $(document).ready(function(){
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
    
            $('#myCarousel').carousel({
                interval: 3000,
                cycle: true
            });
        })

        const buttons = document.querySelectorAll('.carousel-indicators button');

        function triggerClick() {
            // Find the active button
            const activeButton = document.querySelector('.carousel-indicators button.active');

            // Find the index of the active button
            const activeIndex = Array.from(buttons).indexOf(activeButton);

            // Calculate the index of the next button
            const nextIndex = (activeIndex + 1) % buttons.length;

            // Trigger click on the next button
            buttons[nextIndex].click();
        }

        // Set interval to trigger click every 3 seconds
        setInterval(triggerClick, 3000);
    </script>

    <!-- Google tag (gtag.js) --> <script async src="https://www.googletagmanager.com/gtag/js?id=G-WHL9MP7892"></script> <script> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-WHL9MP7892'); </script>
	<!--<script>
(function($){
		$('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
		  if (!$(this).next().hasClass('show')) {
			$(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
		  }
		  var $subMenu = $(this).next(".dropdown-menu");
		  $subMenu.toggleClass('show');

		  $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
			$('.dropdown-submenu .show').removeClass("show");
		  });

		  return false;
		});
	})(jQuery);
</script>-->
@include('frontend.layout.menuscript')
</body>
</html>