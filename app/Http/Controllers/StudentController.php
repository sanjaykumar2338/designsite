<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Blogs;
use App\Models\Collections;
use App\Models\Contacts;
use App\Models\PrintfulOrder;
use App\Models\Payment;
use App\Models\BlogReview;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;
use Illuminate\Support\Facades\Redirect;

class StudentController extends Controller
{
    public function index(Request $request){

        $metaDescription = 'Explore Cause Stand`s activist streetwear and advocacy apparel shop; join a movement, shop our urban collections, and wear your convictions on your clothing.';
        $keywords = 'activist streetwear,  advocacy apparel shop, urban collections';
        $pageTitle = 'Advocacy Streetwear Collections - Shop Now and Join the Movement';
        $metaTitle = ' Shop Advocacy Apparel - Activist Streetwear with a Movement';

        return view('frontend.student.all')->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords)->with('metaTitle' , $metaTitle);
    }
}