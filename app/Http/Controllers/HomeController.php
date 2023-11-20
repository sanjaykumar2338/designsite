<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('frontend.pages.home');
    }

    public function contactus(){
        return view('frontend.pages.contactus');   
    }

    public function aboutus(){
        return view('frontend.pages.aboutus');   
    }

    public function conflicts(){
        return view('frontend.pages.conflicts');   
    }

    public function causes(){
        return view('frontend.pages.causes');      
    }

    public function shop(){
        return view('frontend.pages.shop');         
    }

    public function media(){
        return view('frontend.pages.media');         
    }

    public function blog(){
        return view('frontend.pages.media');         
    }

    public function justice(){
        return view('frontend.pages.media');         
    }

    public function products(){
        return view('frontend.pages.products');         
    }

    public function events(){
        return view('frontend.pages.events');         
    }

    public function track_order(){
        return view('frontend.pages.track_order');         
    }

    public function shipping(){
        return view('frontend.pages.shipping');            
    }

    public function wishlist(){
        return view('frontend.pages.wishlist');               
    }

    public function my_account(){
        return view('frontend.pages.my_account');               
    }

    public function order_history(){
        return view('frontend.pages.order_history');               
    }

    public function return_order(){
        return view('frontend.pages.return_order');               
    }

    public function donate_now(){
        return view('frontend.pages.donate_now');                  
    }

    public function login(){
        return view('frontend.pages.login');                  
    }

    public function register(){
        return view('frontend.pages.register');                  
    }

    public function product_design(){
        return view('frontend.pages.product_design');                  
    }
}
