<div class="user-sidebar">
    <div class="user-sidebar-inner">
        <div class="user-img">
            @if(auth()->user()->profile_image!="")
                <img src="{{ asset('/images/profile/'.auth()->user()->profile_image) }}"/>
            @else
                <img src="https://causestand.com/storage/images/ysbJQNOkIsc3Nhks5tOH4eaBU95B8R9AsLAZ5kSw.png"/>
            @endif
            <h4>Wecome {{auth()->user()->first_name}},</h4>
        </div>
        <div class="us-menu-main">
            <ul class="us-menu">
                
                <li><a class="{{\Request::route()->getName()=='index' ? 'active': ''}}" href="{{route('index')}}">My Account</a></li>
                <li>
                    <a class="{{\Request::route()->getName()=='myaccount' || \Request::route()->getName()=='history' || \Request::route()->getName()=='designed_used' ? 'active': ''}}" href="{{route('myaccount')}}">Order</a>
                    <ul class="us-menu-sub">
                        <li><a href="{{route('history')}}" class="{{\Request::route()->getName()=='history' ? 'active': ''}}"><i class="fa-solid fa-angle-right"></i> Histroy</a></li>
                        <li><a href="{{route('designed_used')}}" class="{{\Request::route()->getName()=='history' ? 'active': ''}}"><i class="fa-solid fa-angle-right"></i> Designed Used</a></li>
                    </ul>
                </li>
                <li><a class="{{\Request::route()->getName()=='community' ? 'active': ''}}" href="{{route('community')}}">Community Subscriptions</a></li>
                <li><a href="#">Coupons</a></li>
                <li>
                    <a class="{{\Request::route()->getName()=='donation' ? 'active': ''}}" href="{{route('donation')}}">Dontation</a>
                    <ul class="us-menu-sub">
                        <li><a class="{{\Request::route()->getName()=='donation' ? 'active': ''}}" href="{{route('donation')}}"><i class="fa-solid fa-angle-right"></i> Report & Receipts</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>