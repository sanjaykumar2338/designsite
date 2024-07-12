<?php

namespace App\Http\Controllers\Admin;


use App\Models\PrintfulOrder;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\PreProducts;
use App\Models\Collections;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Form;
use Validator;
use Auth;
use Illuminate\Support\Str;

class PreProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct()
    {
        //if(auth()->user()->email!='admin@gmail.com'){
        //return redirect('/');
        //}
    }

    public function index(Request $request)
    {
        // Initialize query on PreProducts
        $query = PreProducts::query();

        // Check if 'search_by_collection' parameter exists and is not empty
        if ($request->has('search_by_collection') && !empty($request->search_by_collection)) {
            // Filter by collection_design_id containing the specific value
            $searchValue = $request->search_by_collection;
            $query->where('collection_design_id', 'LIKE', "%$searchValue%");
        }

        // Paginate the results, 5 items per page
        $products = $query->paginate(5);

        // Get all collections
        $collections = Collections::all();

        // Return the view with products and activeLink
        return view('admin.pages.preproduct.index')
            ->with('products', $products)
            ->with('activeLink', 'preproducts')
            ->with('collections', $collections);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $preproducts_type = PreProducts::where('collection_design', 'yes')->get();
        $collections = Collections::all();
        return view('admin.pages.preproduct.create')->with('activeLink', 'preproducts')->with('collections', $collections);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    public function store(Request $request)
    {

        $this->validate($request, [
            'product_name' => 'required',
            'product_price' => 'required',
            'product_description' => '',
            'commission' => 'required',
            'supporting_country' => '',
            'product_for' => 'required',
            'product_type' => 'required',
            'product_sub_type' => '',
            'front_image' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'front_image_price' => 'required',
            'front_image_donation' => '',
            'back_image' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'back_image_price' => 'required',
            'back_image_donation' => '',
            'right_image' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'left_image' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'seo_title' => '',
            'meta_description' => '',
            'meta_keyword' => '',
            'product_x_axis' => '',
            'product_y_axis' => '',
            'product_width' => '',
            'product_height' => ''
        ]);

        // Handle image uploads
        $frontImage = $request->file('front_image')->store('public/images');
        $backImage = $request->file('back_image')->store('public/images');
        $rightImage = $request->file('right_image')->store('public/images');
        $leftImage = $request->file('left_image')->store('public/images');

        // Save data to the database
        $product = new PreProducts();
        $product->product_name = $request->input('product_name');
        $product->website_product_name = $request->input('website_product_name') ? $request->input('website_product_name') : $request->input('product_name');
        $product->product_price = $request->input('product_price');
        $product->product_description = $request->input('product_description');
        $product->commission = $request->input('commission');
        $product->supporting_country = $request->input('supporting_country');
        $product->product_for = $request->input('product_for');
        $product->product_type = $request->input('product_type');
        $product->product_sub_type = $request->input('product_sub_type');
        $product->front_image = $frontImage;
        $product->front_image_price = $request->input('front_image_price');
        $product->front_image_donation = $request->input('front_image_donation');
        $product->back_image = $backImage;
        $product->back_image_price = $request->input('back_image_price');
        $product->back_image_donation = $request->input('back_image_donation');
        $product->right_image = $rightImage;
        $product->left_image = $leftImage;
        $product->seo_title = $request->input('seo_title');
        $product->meta_description = $request->input('meta_description');
        $product->meta_keyword = $request->input('meta_keyword');
        $product->product_x_axis = $request->input('product_x_axis');
        $product->product_y_axis = $request->input('product_y_axis');
        $product->product_width = $request->input('product_width');
        $product->product_height = $request->input('product_height');

        if($request->input('collections_type')){
            $collectionsTypeArray = $request->input('collections_type');
            $collectionsTypeString = implode(', ', $collectionsTypeArray);
            $product->collections_type = $collectionsTypeString;
        }
        
        if($request->input('collection_design_id')){
            $collectionDesignIdArray = $request->input('collection_design_id');
            $collectionDesignIdString = implode(', ', $collectionDesignIdArray);
            $product->collection_design_id = $collectionDesignIdString;
        }

        $slug = Str::slug($request->input('product_name'));
        $existingSlug = PreProducts::where('product_slug', $slug)->exists();

        if ($existingSlug) {
            $counter = 1;
            do {
                $newSlug = $slug . '-' . $counter;
                $existingSlug = PreProducts::where('product_slug', $newSlug)->exists();
                $counter++;
            } while ($existingSlug);
            $slug = $newSlug;
        }

        // Save the product
        $product->product_slug = $slug;
        $product->save();
        return redirect('/admin/preproduct')->with('success');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(PreProducts $preproduct)
    {

        return view('preproduct.show')->with('products', $preproduct);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(PreProducts $preproduct)
    {   

        //echo "<pre>"; print_r($preproduct); die;
        $collections = Collections::all();
        return view('admin.pages.preproduct.edit')->with('product', $preproduct)->with('activeLink', 'preproducts')->with('collections',$collections);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //echo "<pre>"; print_r($request->all()); die;
        $product = PreProducts::find($id);
        $this->validate($request, [
            'product_name' => 'required',
            'product_price' => 'required',
            'product_description' => '',
            'commission' => 'required',
            'supporting_country' => '',
            'product_for' => 'required',
            'product_type' => 'required',
            'product_sub_type' => '',
            'front_image' => 'mimes:jpeg,png,jpg,gif,webp|max:2048',
            'front_image_price' => 'required',
            'front_image_donation' => '',
            'back_image' => 'mimes:jpeg,png,jpg,gif,webp|max:2048',
            'back_image_price' => 'required',
            'back_image_donation' => '',
            'right_image' => 'mimes:jpeg,png,jpg,gif,webp|max:2048',
            'left_image' => 'mimes:jpeg,png,jpg,gif,webp|max:2048',
            'seo_title' => '',
            'meta_description' => '',
            'meta_keyword' => '',
            'product_x_axis' => '',
            'product_y_axis' => '',
            'product_width' => '',
            'product_height' => ''
        ]);

        // Handle image uploads

        if ($request->file('front_image')) {
            $frontImage = $request->file('front_image')->store('public/images');
        }

        if ($request->file('back_image')) {
            $backImage = $request->file('back_image')->store('public/images');
        }

        if ($request->file('right_image')) {
            $rightImage = $request->file('right_image')->store('public/images');
        }

        if ($request->file('left_image')) {
            $leftImage = $request->file('left_image')->store('public/images');
        }

        // Save data to the database          
        $product->product_name = $request->input('product_name');
        $product->website_product_name = $request->input('website_product_name') ? $request->input('website_product_name') : $request->input('product_name');
        $product->product_price = $request->input('product_price');
        $product->product_description = $request->input('product_description');
        $product->commission = $request->input('commission');
        $product->supporting_country = $request->input('supporting_country');
        $product->product_for = $request->input('product_for');
        $product->product_type = $request->input('product_type');
        $product->product_sub_type = $request->input('product_sub_type');
        $product->seo_title = $request->input('seo_title');
        $product->meta_description = $request->input('meta_description');
        $product->meta_keyword = $request->input('meta_keyword');
        $product->front_image_price = $request->input('front_image_price');
        $product->front_image_donation = $request->input('front_image_donation');
        $product->back_image_price = $request->input('back_image_price');
        $product->back_image_donation = $request->input('back_image_donation');
        $product->product_x_axis = $request->input('product_x_axis');
        $product->product_y_axis = $request->input('product_y_axis');
        $product->product_width = $request->input('product_width');
        $product->product_height = $request->input('product_height');

        if($request->input('collections_type')){
            $collectionsTypeArray = $request->input('collections_type');
            $collectionsTypeString = implode(', ', $collectionsTypeArray);
            $product->collections_type = $collectionsTypeString;
        }
        
        if($request->input('collection_design_id')){
            $collectionDesignIdArray = $request->input('collection_design_id');
            $collectionDesignIdString = implode(', ', $collectionDesignIdArray);
            $product->collection_design_id = $collectionDesignIdString;
        }

        if ($request->file('front_image')) {
            $product->front_image = $frontImage;
        }

        if ($request->file('back_image')) {
            $product->back_image = $backImage;
        }

        if ($request->file('right_image')) {
            $product->right_image = $rightImage;
        }

        if ($request->file('left_image')) {
            $product->left_image = $leftImage;
        }

        $slug = Str::slug($request->input('product_name'));
        $originalSlug = $product->product_slug;

        if ($originalSlug !== $slug) {
            $existingSlug = PreProducts::where('product_slug', $slug)->exists();

            if ($existingSlug) {
                $counter = 1;
                do {
                    $newSlug = $slug . '-' . $counter;
                    $existingSlug = PreProducts::where('product_slug', $newSlug)->exists();
                    $counter++;
                } while ($existingSlug);
                $slug = $newSlug;
            }
        }

        // Save the product
        $product->product_slug = $slug;
        $product->update();
        return redirect('/admin/preproducts')->with('success');
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  PreProducts $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {


        //delete image from local folder "/photo/"
        //Storage::delete($product->product_image);

        //delete product title, description, amount and image from MySQL
        $product = PreProducts::find($id);
        $product->delete();



        return redirect('/admin/preproducts')->with('delete', ' ');
    }

    //FRONTEND CONTROL -  ANY PRODUCT SHOW LIST, AND  INDIVIDUAL PRODUCT VIEW
    public function product_show()
    {

        $products = PreProducts::paginate(4);

        return view('preproduct.product_show')->with('products', $products);
    }
    public function product_view(PreProducts $product)
    {


        return view('preproduct.product_view')->with('products', $product);
    }
    public function create_template(Request $request, $id)
    {
        $product = PreProducts::find($id);

        $product->front_image = fileToUrl($product->front_image);
        $product->back_image = fileToUrl($product->back_image);
        $product->left_image = fileToUrl($product->left_image);
        $product->right_image = fileToUrl($product->right_image);
        return view('admin.pages.preproduct.createTemplate')->with('product', $product);
    }

    public function store_template(Request $request)
    {

        // simulate store template

        // return
        //     response($request)
        //         ->header('Content-Type', 'text/json');

        // $this->validate($request, [
        //     'product_name' => 'required|min:3|max:50',
        //     'commission' => 'required',
        //     'supporting_country' => 'required',
        //     'product_for' => 'required',
        //     'product_type' => 'required',
        //     'product_sub_type' => 'required',
        //     'front_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        //     'back_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        //     'right_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        //     'left_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        // ]);



        // Save data to the database
        $product = new PreProducts();
        $product->product_name = $request->product_name;
        $product->commission = $request->commission;
        $product->supporting_country = $request->supporting_country;
        $product->product_for = $request->product_for;
        $product->product_type = $request->product_type;
        $product->product_sub_type = $request->product_sub_type;
        $product->front_image = $request->frontImage;
        $product->back_image = $request->backImage;
        $product->right_image = $request->rightImage;
        $product->left_image = $request->leftImage;

        // Save the product
        $product->save();

        // return $product;
        return
            response($product)
            ->header('Content-Type', 'text/json');
    }

    public function get_template(Request $request)
    {
        $product = PreProducts::latest()->first();
        $product->front_image = fileToUrl($product->front_image);
        $product->back_image = fileToUrl($product->back_image);
        $product->left_image = fileToUrl($product->left_image);
        $product->right_image = fileToUrl($product->right_image);
        return
            response($product)
            ->header('Content-Type', 'text/json');
    }

    public function updateApi(Request $request, $id)
    {

        $product = PreProducts::find($id);
        $this->validate($request, [
            'front_image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'back_image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'right_image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'left_image' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Handle image uploads

        if ($request->file('front_image')) {
            $frontImage = $request->file('front_image')->store('public/images');
            $product->front_image = $frontImage;
        }

        if ($request->file('back_image')) {
            $backImage = $request->file('back_image')->store('public/images');
            $product->back_image = $backImage;
        }

        if ($request->file('right_image')) {
            $rightImage = $request->file('right_image')->store('public/images');
            $product->right_image = $rightImage;
        }

        if ($request->file('left_image')) {
            $leftImage = $request->file('left_image')->store('public/images');
            $product->left_image = $leftImage;
        }
        $product->imageData = $request->input('imageData');
        // Save the product
        $product->update();
        return
            response($product)
            ->header('Content-Type', 'text/json');
    }

    public function storeViaApi(Request $request)
    {

        try {
            $_request = json_decode($request->getContent());

            // $this->validate($request, [
            //     'product_name' => 'required',
            //     'product_price' => 'required',
            //     'product_description' => '',
            //     'commission' => 'required',
            //     'supporting_country' => '',
            //     'product_for' => 'required',
            //     'product_type' => 'required',
            //     'product_sub_type' => '',
            //     'front_image' => '',
            //     'front_image_price' => 'required',
            //     'front_image_donation' => '',
            //     'back_image' => '',
            //     'back_image_price' => 'required',
            //     'back_image_donation' => '',
            //     'right_image' => '',
            //     'left_image' => '',
            //     'seo_title' => '',
            //     'meta_description' => '',
            //     'meta_keyword' => '',
            //     'product_x_axis' => '',
            //     'product_y_axis' => '',
            //     'product_width' => '',
            //     'product_height' => ''
            // ]);

            // Handle image uploads
            // $frontImage = $request->file('front_image')->store('public/images');
            // $backImage = $request->file('back_image')->store('public/images');
            // $rightImage = $request->file('right_image')->store('public/images');
            // $leftImage = $request->file('left_image')->store('public/images');

            // Save data to the database
            $product = new PreProducts();
            $product->product_name = $_request->product_name;
            $product->product_price = $_request->product_price;
            $product->product_description = $_request->product_description;
            $product->commission = $_request->commission;
            $product->supporting_country = $_request->supporting_country;
            $product->product_for = $_request->product_for;
            $product->product_type = $_request->product_type;
            $product->product_sub_type = $_request->product_sub_type;
            $product->front_image = $_request->front_image;
            $product->front_image_price = $_request->front_image_price;
            $product->front_image_donation = $_request->front_image_donation;
            $product->back_image = $_request->back_image;
            $product->back_image_price = $_request->back_image_price;
            $product->back_image_donation = $_request->back_image_donation;
            $product->right_image = $_request->right_image;
            $product->left_image = $_request->left_image;
            $product->seo_title = $_request->seo_title;
            $product->meta_description = $_request->meta_description;
            $product->meta_keyword = $_request->meta_keyword;
            $product->product_x_axis = $_request->product_x_axis;
            $product->product_y_axis = $_request->product_y_axis;
            $product->product_width = $_request->product_width;
            $product->product_height = $_request->product_height;
            $slug = Str::slug($_request->product_name);
            $existingSlug = PreProducts::where('product_slug', $slug)->exists();

            if ($existingSlug) {
                $counter = 1;
                do {
                    $newSlug = $slug . '-' . $counter;
                    $existingSlug = PreProducts::where('product_slug', $newSlug)->exists();
                    $counter++;
                } while ($existingSlug);
                $slug = $newSlug;
            }

            // Save the product
            $product->product_slug = $slug;
            $product->save();
            return response($product)
                ->header('Content-Type', 'text/json');
        } catch (\Exception $e) {
            // Handling the exception
            return response()->json([
                'error' => [
                    'message' => $e->getMessage(), // Retrieve the error message
                    'code' => $e->getCode(), // Retrieve the error code
                ]
            ], 500); // Internal Server Error status code
        }
    }
}
