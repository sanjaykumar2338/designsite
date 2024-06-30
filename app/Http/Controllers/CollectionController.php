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
        $metaDescription = 'Explore Cause Stand`s activist streetwear and advocacy apparel shop; join a movement, shop our urban collections, and wear your convictions on your clothing.';
        $keywords = 'activist streetwear,  advocacy apparel shop, urban collections';
        $pageTitle = 'Advocacy Streetwear Collections - Shop Now and Join the Movement';
        $metaTitle = ' Shop Advocacy Apparel - Activist Streetwear with a Movement';

        return view('frontend.pages.collections')->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords)->with('metaTitle' , $metaTitle);
    }

    public function collections_list(Request $request, $slug)
    {
        $collection = explode('-',$slug)[0];
        $products = PreProducts::where('collections_type', ucfirst($collection))->get();
        $collection_desing = PreProducts::where('collection_design', 'yes')->where('collections_type', ucfirst($collection))->get();
        //echo "<pre>"; print_r($products); die;
        return view('frontend.pages.collections_list')->with('slug',$slug)->with('products',$products)->with('collection_desing',$collection_desing);
    }

    public function collections_design(Request $request){
        $collection = explode('-', $request->collection)[0];
        $design_type = PreProducts::where('collections_type', ucfirst($collection))->get();
        //echo $request->design_type;
        $design = PreProducts::where('collection_design','yes')->where('collection_design_name', $request->design_type)->first();
        //echo $design->id; die;
        $products = PreProducts::where('collection_design_id',$design->id)->get();
        
        $main_url = url('/');
        $front = $main_url."/collections/oversight/oversight-collection-boycott-bucks-front.png";
        if($collection=='oversight'){
            $front = $main_url."/collections/oversight/oversight-collection-boycott-bucks-front.png";
        }   

        if($collection=='traitor'){
            $front = $main_url."/collections/traitor/traitor-collection-reject-aipac.png";
        }

        return view('frontend.pages.pre_product_list')->with('products',$products)->with('collection',$collection)->with('front',$front)->with('design',$design);
        //echo "<pre>"; print_r($products); print_r($request->design_type); die;
    }

    public function collections_design_product_detail(Request $request){
        $collection = explode('-', $request->collection)[0];
        $design_type = PreProducts::where('collections_type', ucfirst($collection))->get();
        //echo $request->design_type;
        $design = PreProducts::where('collection_design','yes')->where('collection_design_name', $request->design_type)->first();
        //echo $design->id; die;
        $products = PreProducts::where('collection_design_id',$design->id)->get();
        
        $main_url = url('/');
        $front = $main_url."/collections/oversight/oversight-collection-boycott-bucks-front.png";
        if($collection=='oversight'){
            $front = $main_url."/collections/oversight/oversight-collection-boycott-bucks-front.png";
            $back = $main_url."/collections/oversight/oversight-collection-back.png";
        }   

        if($collection=='traitor'){
            $front = $main_url."/collections/traitor/traitor-collection-reject-aipac.png";
            $back = $main_url."/collections/traitor/traitor-collection-back.png";
        }

        $product = PreProducts::where('product_slug', $request->product_slug)->first();
        //echo "<pre>"; print_r($product->id); die;

        return view('frontend.pages.pre_create_product')->with('products',$products)->with('collection',$collection)->with('front',$front)->with('back',$back)->with('design',$design)->with('product',$product);
        //echo "<pre>"; print_r($products); print_r($request->design_type); die;
    }

    public function collection(Request $request, $collection, $slug)
    {   
        $collection = explode('-', $collection)[0];
        $product = PreProducts::where('product_slug', $slug)->where('collections_type', ucfirst($collection))->first();
        //echo "<pre>"; print_r($product); die;

        $product->front_image = fileToUrl($product->front_image);
        $product->back_image = fileToUrl($product->back_image);
        $product->left_image = fileToUrl($product->left_image);
        $product->right_image = fileToUrl($product->right_image);

        //echo "<pre>"; print_r(file_exists($product->front_image)); die;

        if (!auth()->check()) {
            //return redirect()->route('login')->with('message', 'Please login to access this page.');
        }
        
        $metaDescription = 'Explore Cause Stand`s activist streetwear and advocacy apparel shop; join a movement, shop our urban collections, and wear your convictions on your clothing.';
        $keywords = 'activist streetwear,  advocacy apparel shop, urban collections';
        $pageTitle = 'Advocacy Streetwear Collections - Shop Now and Join the Movement';
        $metaTitle = ' Shop Advocacy Apparel - Activist Streetwear with a Movement';

        return view('frontend.pages.collection_create')->with('product', $product)->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords)->with('metaTitle' , $metaTitle);
    }
}