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
        $boycott = Boycotts::where('collection', $collection->id)->get();

        $design_type = $design_type ?? 'tshirts';
        if (in_array($design_type, ['hoodies', 'sweatshirts'])) {
            $boycott = $boycott->map(function ($item) use ($design_type) {
                $allData = json_decode($item->all_data, true); // Decode JSON from all_data field

                // Check if all_data and product_types exist
                if (!empty($allData['product_types']) && in_array($design_type, $allData['product_types'])) {
                    // Get the index of the design_type in product_types
                    $index = array_search($design_type, $allData['product_types']);
                    
                    // Update fields based on index
                    $item->title = $allData['titles'][$index] ?? $item->title;
                    $item->price = $allData['prices'][$index] ?? $item->price;
                    $item->design_number = $allData['design_numbers'][$index] ?? $item->design_number;
                    $item->description = $allData['descriptions'][$index] ?? $item->description;
                    $item->meta_title = $allData['meta_titles'][$index] ?? $item->meta_title;
                    $item->meta_keywords = $allData['meta_keywords'][$index] ?? $item->meta_keywords;
                    $item->meta_description = $allData['meta_descriptions'][$index] ?? $item->meta_description;
                }

                return $item;
            });
        }

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

        if ($slug == 'oversight') {
            if ($design_type == 'tshirts') {
                $metaDescription = 'Stand up for transparency with Oversight Collection T-Shirts. Wear your advocacy, challenge the status quo, and join the movement to hold the powerful accountable.';
                $keywords = 'Oversight Collection t-shirts, activism apparel, boycott injustice shirts, accountability clothing, transparency activism';
                $pageTitle = 'Oversight Collection T-Shirts: Wear Your Advocacy, Challenge Injustice';
                $metaTitle = 'Oversight Collection T-Shirts - Stand Against Corruption, Wear Accountability';
            } elseif ($design_type == 'hoodies') {
                $metaDescription = 'Stand for justice and accountability with the Oversight Collection Hoodies. Wear your advocacy on your sleeve, challenge corruption, and become a part of the movement for transparency.';
                $keywords = 'Oversight Collection hoodies, activism apparel, hoodie for accountability, protest hoodies, justice clothing, transparency activism';
                $pageTitle = 'Oversight Collection Hoodies: Wear the Movement for Justice and Transparency';
                $metaTitle = 'Oversight Collection Hoodies – Stand for Accountability, Wear Your Cause';
            } elseif ($design_type == 'sweatshirts') {
                $metaDescription = 'Empower your activism with the Oversight Collection Sweatshirts. Wear your support for transparency and justice on your sleeve, challenge corruption, and join the movement for real change.';
                $keywords = 'Oversight Collection sweatshirts, accountability sweatshirts, justice apparel, activism sweatshirt, fight corruption clothing, protest gear';
                $pageTitle = 'Oversight Collection Sweatshirts: Speak Out for Justice and Transparency';
                $metaTitle = 'Oversight Collection Sweatshirts – Stand for Accountability, Fight for Transparency';
            }
        }
        
        if ($slug == 'traitor') {
            if ($design_type == 'tshirts') {
                $metaDescription = 'Demand justice and accountability with the Traitor Collection T-Shirts. Stand against betrayal, speak out for integrity, and make your voice heard with powerful, thought-provoking designs.';
                $keywords = 'Traitor Collection t-shirts, justice t-shirt, betrayal protest apparel, accountability t-shirt, stand against corruption, political protest gear';
                $pageTitle = 'Traitor Collection T-Shirts: Speak Out Against Betrayal and Stand for Justice';
                $metaTitle = 'Traitor Collection T-Shirts – Speak Out Against Betrayal, Demand Accountability';
            } elseif ($design_type == 'hoodies') {
                $metaDescription = 'Speak out against betrayal and stand for justice with the Traitor Collection Hoodies. Designed for comfort and impact, these hoodies will amplify your activism and make your message clear.';
                $keywords = 'Traitor Collection hoodie, justice hoodie, anti-betrayal hoodie, political protest hoodie, activism apparel, betrayal protest hoodie';
                $pageTitle = 'Traitor Collection Hoodies: Demand Justice, Stand Against Betrayal';
                $metaTitle = 'Traitor Collection Hoodies – Wear Your Stand for Justice and Accountability';
            } elseif ($design_type == 'sweatshirts') {
                $metaDescription = 'Show your stance against betrayal with the Traitor Collection Sweatshirts. Stylish, bold, and powerful, these sweatshirts empower your activism and call for justice.';
                $keywords = 'Traitor Collection sweatshirt, betrayal protest sweatshirt, political justice apparel, accountability sweatshirt, activism sweatshirt';
                $pageTitle = 'Traitor Collection Sweatshirts: Wear Your Values, Demand Accountability';
                $metaTitle = 'Traitor Collection Sweatshirts – Demand Integrity and Justice in Style';
            }
        }
        
        if ($slug == 'trader') {
            if ($design_type == 'tshirts') {
                $metaDescription = 'Wear your values with the Trader Collection T-Shirt. Bold, powerful designs for those who demand integrity from lawmakers and stand for accountability.';
                $keywords = 'Trader Collection t-shirt, political integrity shirt, protest t-shirt, activist t-shirt, accountability in politics';
                $pageTitle = 'Trader Collection T-Shirts: Speak Up, Stand Out, and Demand Justice';
                $metaTitle = 'Trader Collection T-Shirts – Demand Integrity in Politics with Bold Fashion';
            } elseif ($design_type == 'hoodies') {
                $metaDescription = 'Fight corruption in politics with the Trader Collection Hoodie. Bold designs exposing insider trading practices and demanding accountability from corrupt lawmakers.';
                $keywords = 'Trader Collection hoodie, insider trading hoodie, corrupt politics hoodie, accountability in politics, political activist hoodie';
                $pageTitle = 'Trader Collection Hoodies: Expose Corruption, Demand Integrity';
                $metaTitle = 'Trader Collection Hoodies – Expose Corruption in Politics with Powerful Statements';
            } elseif ($design_type == 'sweatshirts') {
                $metaDescription = 'The Trader Collection Sweatshirts demand justice and transparency. Bold, stylish, and empowering, these sweatshirts support your stand against corruption.';
                $keywords = 'Trader Collection sweatshirt, political accountability apparel, integrity sweatshirt, corruption protest sweatshirt, activist sweatshirt';
                $pageTitle = 'Trader Collection Sweatshirts: Wear Your Voice, Demand Action';
                $metaTitle = 'Trader Collection Sweatshirts – Hold Lawmakers Accountable in Style';
            }
        }
        
        if ($slug == 'propaganda') {
            if ($design_type == 'tshirts') {
                $metaDescription = 'Wear the Propaganda Collection T-Shirt to expose media lies and demand accountability. Bold designs fighting misinformation and advocating for transparency in media.';
                $keywords = 'Propaganda Collection t-shirt, expose media lies, fight misinformation, media accountability, activist t-shirt';
                $pageTitle = 'Propaganda Collection T-Shirts: Fight Misinformation, Demand the Truth';
                $metaTitle = 'Propaganda Collection T-Shirts – Expose Media Misinformation and Demand Truth';
            } elseif ($design_type == 'hoodies') {
                $metaDescription = 'Wear the Propaganda Collection Hoodie to challenge media manipulation, demand accountability, and fight misinformation. Bold designs for truth-seekers and activists.';
                $keywords = 'Propaganda Collection hoodie, media accountability, expose lies, fight misinformation, activist hoodie';
                $pageTitle = 'Propaganda Collection Hoodies: Stand Against Misinformation, Demand Accountability';
                $metaTitle = 'Propaganda Collection Hoodies – Demand Media Transparency and Expose Misinformation';
            } elseif ($design_type == 'sweatshirts') {
                $metaDescription = 'The Propaganda Collection Sweatshirt is your statement against media manipulation. Demand accountability, fight misinformation, and make your voice heard for truth.';
                $keywords = 'Propaganda Collection sweatshirt, fight misinformation, expose media lies, media transparency, activist sweatshirt';
                $pageTitle = 'Propaganda Collection Sweatshirts: Expose Misinformation, Stand for Truth';
                $metaTitle = 'Propaganda Collection Sweatshirts – Take a Stand Against Media Lies, Demand Transparency';
            }
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

        if ($boycott && in_array($request->route('product_type'), ['hoodies', 'sweatshirts'])) {
            $productType = $request->route('product_type'); // Extract the product type from the route
            $allData = json_decode($boycott->all_data, true); // Decode JSON from all_data field

            // Check if product_types exist and contain the current product type
            if (!empty($allData['product_types']) && in_array($productType, $allData['product_types'])) {
                $index = array_search($productType, $allData['product_types']); // Find the index of the product type

                // Update boycott fields based on the index
                $boycott->title = $allData['titles'][$index] ?? $boycott->title;
                $boycott->price = $allData['prices'][$index] ?? $boycott->price;
                $boycott->design_number = $allData['design_numbers'][$index] ?? $boycott->design_number;
                $boycott->description = $allData['descriptions'][$index] ?? $boycott->description;
                $boycott->meta_title = $allData['meta_titles'][$index] ?? $boycott->meta_title;
                $boycott->meta_keywords = $allData['meta_keywords'][$index] ?? $boycott->meta_keywords;
                $boycott->meta_description = $allData['meta_descriptions'][$index] ?? $boycott->meta_description;
            }
        }

        $productType = $request->route('product_type') == 'tshirts' ? 'Shirts' : ucfirst(strtolower($request->route('product_type')));

        $product = PreProducts::where('product_type', $productType)->where('main_template','yes')->first();
        //echo "<pre>"; print_r($product); die;
        
        // Redirect back if any of the resources are not found
        if (!$collection || !$boycott || !$product) {
            return redirect()->back()->with('error', 'Requested resource not found.');
        }
        
        if ($product) {
            // Clone the product
            $clonedProduct = $product->replicate();
        
            // Set the clone as a non-main template if needed
            $clonedProduct->main_template = 'no';
        
            // Update cloned product's fields based on $boycott data
            $clonedProduct->website_product_name = $boycott->title;
            $clonedProduct->product_description = $boycott->description;
            $clonedProduct->product_price = $boycott->price;
            $clonedProduct->meta_keyword = $boycott->meta_keywords;
            $clonedProduct->meta_description = $boycott->meta_description;
            $clonedProduct->seo_title = $boycott->meta_title;
            $clonedProduct->front_image = $boycott->blog_image;
            $clonedProduct->commission = 0;
            $clonedProduct->front_image_price = 0;
            $clonedProduct->back_image_price = 0;
            $clonedProduct->back_image_donation = 0;
        
            // Save the cloned product in the database
            $clonedProduct->save();
        
            // Reassign $product to refer to the cloned product
            $product = $clonedProduct;
            //echo "Cloned Product ID: " . $product->id . " created and attributes updated successfully!";
        } else {
            //echo "Original product not found!";
        }

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

        $metaDescription = $product->meta_description;
        $keywords = $product->meta_keyword;
        $pageTitle = $product->seo_title;
        $metaTitle = $product->seo_title;

        $commissionAmount = 0;
        //$commissionAmount = $product->product_price * ($product->commission / 100);
        $product->product_price = $product->product_price;// + $commissionAmount + 20;

        //echo "<pre>"; print_r($product); die;

        return view('frontend.pages.pre_create_product')->with('collection',$collection)->with('front',$front)->with('back',$back)->with('design',$collection)->with('product',$product)->with('boycott',$boycott)->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords)->with('metaTitle' , $metaTitle);
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