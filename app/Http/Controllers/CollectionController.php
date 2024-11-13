<?php

namespace App\Http\Controllers;

use App\Models\Products;
use App\Models\PreProducts;
use App\Models\Collections;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Blogs;
use App\Models\Contacts;
use App\Models\PrintfulOrder;
use App\Models\Payment;
use App\Models\Boycotts;
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

        $collections = Collections::all();
        return view('frontend.pages.collections')->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords)->with('metaTitle' , $metaTitle)->with('collections' , $collections);
    }

    public function collections_list(Request $request, $slug)
    {
        $slug = explode('-',$slug)[0];
        $collection = Collections::where('slug', $slug)->first();
        $collection_design = Boycotts::where('collection', $collection->id)->get();

        $metaDescription = $collection->meta_description;
        $keywords = $collection->meta_keywords;
        $pageTitle = $collection->page_title;
        $metaTitle = $collection->meta_title;
        $page_content = $collection->description;

        //echo "<pre>"; print_r($collection); die;
        return view('frontend.pages.collections_list')->with('slug',$slug)->with('collection',$collection)->with('collection_design',$collection_design)->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords)->with('metaTitle' , $metaTitle)->with('page_content' , $page_content);
    }

    public function collections_list_all_design(Request $request)
    {
        $collection = Collections::all()->shuffle()->first();
        $collection_design = Boycotts::where('collection', $collection->id)->get();

        $metaDescription = $collection->meta_description;
        $keywords = $collection->meta_keywords;
        $pageTitle = $collection->page_title;
        $metaTitle = $collection->meta_title;
        $page_content = $collection->description;

        //echo "<pre>"; print_r($products); die;
        return view('frontend.pages.collections_list_all_design')->with('slug',$collection->slug)->with('collection',$collection)->with('collection_design',$collection_design)->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords)->with('metaTitle' , $metaTitle)->with('page_content' , $page_content);
    }

    public function collections_design(Request $request){
        $slug = explode('-', $request->collection)[0];
        $collection = Collections::where('slug', $slug)->first();        
        $design_type = $request->design_type;
        $boycott = Boycotts::where('collection',$collection->id)->get();
        $boycottf = Boycotts::where('collection',$collection->id)->first();

        //$boycott = Boycotts::where('slug',$design_type)->where('collection',$collection->id)->first();
        //echo "<pre>"; print_r($design_type); die;
        //echo "<pre>"; print_r($boycott); die;

        $front = '';
        if ($boycottf && $boycottf->blog_image != "") {
            $front = @fileToUrl($boycottf->blog_image);
        }
        
        //echo $front; die;

        //echo $slug; die;
        $metaDescription = 'Shop the Boycott design from the Oversight Collection by the Cause Stand brand. Choose from t-shirts, hoodies, or sweatshirts and stand against unethical corporate practices.';
        $keywords = 'boycott apparel, boycott corporate practices, boycott bucks';
        $pageTitle = 'Boycott Bucks Protest Wear - Stand against Unethical Corporations';
        $metaTitle = 'Boycott Bucks Apparel | T-Shirts, Hoodies and Sweatshirts';

        if($slug=='oversight'){
            $metaDescription = 'Shop the Boycott design from the Oversight Collection by the Cause Stand brand. Choose from t-shirts, hoodies, or sweatshirts and stand against unethical corporate practices.';
            $keywords = 'boycott apparel, boycott corporate practices, boycott bucks';
            $pageTitle = 'Boycott Bucks Protest Wear - Stand against Unethical Corporations';
            $metaTitle = 'Boycott Bucks Apparel | T-Shirts, Hoodies and Sweatshirts';
        }

        if($slug=='traitor'){
            $metaDescription = 'Explore Cause Stand`s activist streetwear and advocacy apparel shop; join a movement, shop our urban collections, and wear your convictions on your clothing.';
            $keywords = 'activist streetwear,  advocacy apparel shop, urban collections';
            $pageTitle = 'Advocacy Streetwear Collections - Shop Now and Join the Movement';
            $metaTitle = ' Shop Advocacy Apparel - Activist Streetwear with a Movement';
        }

        if($slug=='trader'){
            $metaDescription = 'Explore Cause Stand`s activist streetwear and advocacy apparel shop; join a movement, shop our urban collections, and wear your convictions on your clothing.';
            $keywords = 'activist streetwear,  advocacy apparel shop, urban collections';
            $pageTitle = 'Advocacy Streetwear Collections - Shop Now and Join the Movement';
            $metaTitle = ' Shop Advocacy Apparel - Activist Streetwear with a Movement';
        }

        if($slug=='propaganda'){
            $metaDescription = 'Explore Cause Stand`s activist streetwear and advocacy apparel shop; join a movement, shop our urban collections, and wear your convictions on your clothing.';
            $keywords = 'activist streetwear,  advocacy apparel shop, urban collections';
            $pageTitle = 'Advocacy Streetwear Collections - Shop Now and Join the Movement';
            $metaTitle = ' Shop Advocacy Apparel - Activist Streetwear with a Movement';
        }

        $collectionId = $collection->id;
        if($request->type){
            $products = PreProducts::whereRaw('FIND_IN_SET(?, REPLACE(collection_design_id, " ", ""))', [$collectionId])->where('product_type',ucfirst($request->type))->get();
        }else{
            $products = PreProducts::whereRaw('FIND_IN_SET(?, REPLACE(collection_design_id, " ", ""))', [$collectionId])->get();
        }
        
        //echo "<pre>"; print_r($boycott); die;
        $background_image = '';
        if($design_type=='hoodies'){
            $background_image = 'https://files.cdn.printful.com/m/g18500/medium/ghost/front/05_gildan18500_ghost_front_base_whitebg.png?v=1700731048';
        }

        if($design_type=='tshirts'){
            $background_image = 'https://files.cdn.printful.com/m/56-bella-canvas-3413/medium/ghost/front/05_BC_3413_XL_Ghost_base_whitebg.png?v=1702297406';
        }

        if($design_type=='sweatshirts'){
            $background_image = 'https://files.cdn.printful.com/m/fleece_pullover/medium/ghost/front/05_ghost_front_base_whitebg.png?v=1702459598';
        }

        $product = PreProducts::where('product_type', $design_type)->first();
        return view('frontend.pages.pre_product_list')->with('products',$products)->with('collection',$collection)->with('front',$front)->with('boycott',$boycott)->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords)->with('metaTitle' , $metaTitle)->with('slug' , $slug)->with('design_type', $design_type)->with('background_image',$background_image )->with('product',$product );
    }

    public function collections_design_type(Request $request){
        $slug = explode('-', $request->collection)[0];
        $collection = Collections::where('slug', $slug)->first();        
        $design_type = $request->design_type;
        $boycott = Boycotts::where('slug',$design_type)->where('collection',$collection->id)->first();
        //echo "<pre>"; print_r($design_type); die;
        $front = '';
        if ($boycott && $boycott->blog_image != "") {
            $front = @fileToUrl($boycott->blog_image);
        }
        
        //echo $front; die;

        //echo $slug; die;
        $metaDescription = 'Shop the Boycott design from the Oversight Collection by the Cause Stand brand. Choose from t-shirts, hoodies, or sweatshirts and stand against unethical corporate practices.';
        $keywords = 'boycott apparel, boycott corporate practices, boycott bucks';
        $pageTitle = 'Boycott Bucks Protest Wear - Stand against Unethical Corporations';
        $metaTitle = 'Boycott Bucks Apparel | T-Shirts, Hoodies and Sweatshirts';

        if($slug=='oversight'){
            $metaDescription = 'Shop the Boycott design from the Oversight Collection by the Cause Stand brand. Choose from t-shirts, hoodies, or sweatshirts and stand against unethical corporate practices.';
            $keywords = 'boycott apparel, boycott corporate practices, boycott bucks';
            $pageTitle = 'Boycott Bucks Protest Wear - Stand against Unethical Corporations';
            $metaTitle = 'Boycott Bucks Apparel | T-Shirts, Hoodies and Sweatshirts';
        }

        if($slug=='traitor'){
            $metaDescription = 'Explore Cause Stand`s activist streetwear and advocacy apparel shop; join a movement, shop our urban collections, and wear your convictions on your clothing.';
            $keywords = 'activist streetwear,  advocacy apparel shop, urban collections';
            $pageTitle = 'Advocacy Streetwear Collections - Shop Now and Join the Movement';
            $metaTitle = ' Shop Advocacy Apparel - Activist Streetwear with a Movement';
        }

        if($slug=='trader'){
            $metaDescription = 'Explore Cause Stand`s activist streetwear and advocacy apparel shop; join a movement, shop our urban collections, and wear your convictions on your clothing.';
            $keywords = 'activist streetwear,  advocacy apparel shop, urban collections';
            $pageTitle = 'Advocacy Streetwear Collections - Shop Now and Join the Movement';
            $metaTitle = ' Shop Advocacy Apparel - Activist Streetwear with a Movement';
        }

        if($slug=='propaganda'){
            $metaDescription = 'Explore Cause Stand`s activist streetwear and advocacy apparel shop; join a movement, shop our urban collections, and wear your convictions on your clothing.';
            $keywords = 'activist streetwear,  advocacy apparel shop, urban collections';
            $pageTitle = 'Advocacy Streetwear Collections - Shop Now and Join the Movement';
            $metaTitle = ' Shop Advocacy Apparel - Activist Streetwear with a Movement';
        }

        $collectionId = $collection->id;
        if($request->type){
            $products = PreProducts::whereRaw('FIND_IN_SET(?, REPLACE(collection_design_id, " ", ""))', [$collectionId])->where('product_type',ucfirst($request->type))->get();
        }else{
            $products = PreProducts::whereRaw('FIND_IN_SET(?, REPLACE(collection_design_id, " ", ""))', [$collectionId])->get();
        }
        
        //echo "<pre>"; print_r($boycott); die;
        return view('frontend.pages.pre_product_list')->with('products',$products)->with('collection',$collection)->with('front',$front)->with('boycott',$boycott)->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords)->with('metaTitle' , $metaTitle)->with('slug' , $slug);
    }

    public function collections_design_product_detail(Request $request){
        $slug = $request->collection;
        $collection = Collections::where('slug', $slug)->first();     

        $design_type = $request->design_type;
        $boycott = Boycotts::where('slug',$design_type)->where('collection',$collection->id)->first();       
        
        $front = '';
        $back = '';
        
        if (isset($boycott)) {
            if (!empty($boycott->blog_image)) {
                $front = fileToUrl($boycott->blog_image);
            }
        
            if (!empty($boycott->back_design_image)) {
                $back = fileToUrl($boycott->back_design_image);
            }
        }
        

        $product = PreProducts::where('product_slug', $request->product_slug)->first();
        $commissionAmount = $product->product_price * ($product->commission / 100);
        $product->product_price = $product->product_price + $commissionAmount + 20;
        

        return view('frontend.pages.pre_create_product')->with('collection',$collection)->with('front',$front)->with('back',$back)->with('design',$collection)->with('product',$product)->with('boycott',$boycott);
        //echo "<pre>"; print_r($products); print_r($request->design_type); die;
    }

    public function collections_design_boycott_slug(Request $request){
        //echo "working..."; die;
        //echo "<pre>"; print_r($request->collection); die;
        //Validate required parameters
        $requiredParams = ['collection', 'product_type', 'boycott_slug'];
        foreach ($requiredParams as $param) {
            if (!$request->route($param)) {
                return redirect()->back()->with('error', ucfirst($param) . ' is required.');
            }
        }

        // Fetch the collection, boycott, and product
        $collection = Collections::where('slug', $request->route('collection'))->first();
        $boycott = Boycotts::where('slug', $request->route('boycott_slug'))->first();
        $productType = $request->route('product_type') == 'tshirts' ? 'Shirts' : ucfirst(strtolower($request->route('product_type')));
        $product = PreProducts::where('product_type', $productType)->first();

        // Redirect back if any of the resources are not found
        if (!$collection || !$boycott || !$product) {
            return redirect()->back()->with('error', 'Requested resource not found.');
        }
        
        /*
            $product->product_name = $boycott->title;
            $product->product_description = $boycott->description;
            $product->product_price = $boycott->price;
            $product->meta_keyword = $boycott->meta_keywords;
            $product->meta_description = $boycott->meta_description;
            $product->seo_title = $boycott->meta_title;
            $product->front_image = $boycott->blog_image;
            $product->save();
        */

        //echo "<pre>"; print_r($product); die;
        $slug = $request->collection;
        $collection = Collections::where('slug', $slug)->first();     

        $design_type = $request->design_type;
        $front = '';
        $back = '';
        
        if (isset($boycott)) {
            if (!empty($boycott->blog_image)) {
                $front = fileToUrl($boycott->blog_image);
            }
        }

        $back = '';
        // Determine the back image based on the collection slug
        if ($collection->slug === 'oversight') {
            $back = asset('collectionback/oversight.png');
        } elseif ($collection->slug === 'traitor') {
            $back = asset('collectionback/traitor.png');
        } elseif ($collection->slug === 'trader') {
            $back = asset('collectionback/traitor.png');
        } elseif ($collection->slug === 'propaganda') {
            $back = asset('collectionback/propaganda.png');
        }

        // Swap images if the design type is 'hoodies'
        if (strtolower($request->route('product_type')) == 'hoodies') {
            // Define the front image if not already defined
            $frontImage = isset($front) ? $front : '';

            // Swap frontImage and backImage
            $temp = $frontImage;
            $front = $back;
            $back = $temp;
        }
        
        //echo $front; die;

        $commissionAmount = $product->product_price * ($product->commission / 100);
        $product->product_price = $product->product_price + $commissionAmount + 20;
        return view('frontend.pages.pre_create_product')->with('collection',$collection)->with('front',$front)->with('back',$back)->with('design',$collection)->with('product',$product)->with('boycott',$boycott);
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

    public function shop_by_product_type_tshirts(Request $request){
        $slug = 'oversight';
        $collection = Collections::where('slug', $slug)->first();
        $collection_design = Boycotts::where('collection', $collection->id)->get();

        $metaDescription = $collection->meta_description;
        $keywords = $collection->meta_keywords;
        $pageTitle = $collection->page_title;
        $metaTitle = $collection->meta_title;
        $page_content = $collection->description;

        //echo "<pre>"; print_r($products); die;
        return view('frontend.pages.pre_product_list_product_type')->with('slug',$slug)->with('collection',$collection)->with('collection_design',$collection_design)->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords)->with('metaTitle' , $metaTitle)->with('page_content' , $page_content)->with('product_type' , $request->type);
    }
}