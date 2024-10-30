<style>
.position-sticky {
    z-index: 9999;
}
li.nav-item {
    position: relative;
}

.open>.dropdown-menu {
    display: block;
}
.navbar .dropdown-menu>li>a {
    display: block;
    padding: 6px 20px;
    clear: both;
    font-weight: 400;
    line-height: 1.42857143;
    color: #434343;
    text-decoration: none;
    font-size: 16px;
}
div#navbarSupportedContent .dropdown-menu>li>a:hover {
    background-color: #eee;
    color: #eb3e32 !important;
}
@media only screen and (min-width: 767px) {
.navbar .dropdown-menu .dropdown-toggle::after {
    transform: rotate(-90deg);
}
}
@media only screen and (max-width: 991.98px) {
.dropdown-menu {
    background-color: #000;
}
}
.dropdown-menu .nav-item{
    width: 200px;
}
</style>
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
        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Shop <b class="caret"></b></a>

        <ul class="dropdown-menu">
            <li class="nav-item">
                <a href="{{url('/')}}/shop/oversight-collection">Shop by Collection</a>
            </li>
            <li class="nav-item">
                <a href="{{url('/')}}/shop/shop-by-product-type/shirts">Shop by Product Type</a>
            </li>
            <li class="nav-item">
                <a href="{{url('/')}}/shop/shop-by-product-type" class="">Shop by Design</a>
            </li>
        </ul>
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