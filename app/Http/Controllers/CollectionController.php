<?php

namespace App\Http\Controllers;

use App\Models\Products;
use App\Models\PreProducts;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Blogs;
use App\Models\Contacts;
use App\Models\PrintfulOrder;
use App\Models\Payment;
use App\Models\BlogReview;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;

class CollectionController extends Controller
{
    public function collections()
    {
        return view('frontend.pages.collections');
    }

    public function collections_list(Request $request, $slug)
    {
        $collection = explode('-',$slug)[0];
        $products = PreProducts::where('collections_type', ucfirst($collection))->get();
        //echo "<pre>"; print_r($products); die;
        return view('frontend.pages.collections_list')->with('slug',$slug)->with('products',$products);
    }

    public function collection(Request $request, $slug, $product_for)
    {   
        $product = PreProducts::where('product_slug', $request->slug)->where('product_for', ucfirst($product_for))->first();
        $product->front_image = fileToUrl($product->front_image);
        $product->back_image = fileToUrl($product->back_image);
        $product->left_image = fileToUrl($product->left_image);
        $product->right_image = fileToUrl($product->right_image);

        //echo "<pre>"; print_r(file_exists($product->front_image)); die;

        if (!auth()->check()) {
            //return redirect()->route('login')->with('message', 'Please login to access this page.');
        }

        return view('frontend.pages.collection_create')->with('product', $product);
    }
}