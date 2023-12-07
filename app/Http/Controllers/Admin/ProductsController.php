<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Products;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Form;
use Validator;
use Auth;


class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Products::paginate(5);
        return view('admin.pages.product.index')->with('products', $products)->with('activeLink', 'product');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.pages.product.create')->with('activeLink', 'product');
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
            'product_name' => 'required|min:3|max:50',
            'commission' => 'required',
            'supporting_country' => 'required',
            'product_for' => 'required',
            'product_type' => 'required',
            'product_sub_type' => 'required',
            'front_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'back_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'right_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'left_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle image uploads
        $frontImage = $request->file('front_image')->store('public/images');
        $backImage = $request->file('back_image')->store('public/images');
        $rightImage = $request->file('right_image')->store('public/images');
        $leftImage = $request->file('left_image')->store('public/images');

        // Save data to the database
        $product = new Products();
        $product->product_name = $request->input('product_name');
        $product->commission = $request->input('commission');
        $product->supporting_country = $request->input('supporting_country');
        $product->product_for = $request->input('product_for');
        $product->product_type = $request->input('product_type');
        $product->product_sub_type = $request->input('product_sub_type');
        $product->front_image = $frontImage;
        $product->back_image = $backImage;
        $product->right_image = $rightImage;
        $product->left_image = $leftImage;

        // Save the product
        $product->save();
        return redirect('/admin/products')->with('success');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Products $product)
    {

        return view('products.show')->with('products', $product);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Products $product)
    {

        //echo "<pre>"; print_r($product); die;
        return view('admin.pages.product.edit')->with('product', $product)->with('activeLink', 'product');


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

        $product = Products::find($id);
        $this->validate($request, [
            'product_name' => 'required|min:3|max:50',
            'commission' => 'required',
            'supporting_country' => 'required',
            'product_for' => 'required',
            'product_type' => 'required',
            'product_sub_type' => 'required',
            'front_image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'back_image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'right_image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'left_image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
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
        $product->commission = $request->input('commission');
        $product->supporting_country = $request->input('supporting_country');
        $product->product_for = $request->input('product_for');
        $product->product_type = $request->input('product_type');
        $product->product_sub_type = $request->input('product_sub_type');

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

        // Save the product
        $product->update();
        return redirect('/admin/products')->with('success');
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  Products $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {


        //delete image from local folder "/photo/"
        //Storage::delete($product->product_image);

        //delete product title, description, amount and image from MySQL
        $product = Products::find($id);
        $product->delete();



        return redirect('/admin/products')->with('delete', ' ');



    }

    //FRONTEND CONTROL -  ANY PRODUCT SHOW LIST, AND  INDIVIDUAL PRODUCT VIEW
    public function product_show()
    {

        $products = Products::paginate(4);

        return view('products.product_show')->with('products', $products);

    }
    public function product_view(Products $product)
    {


        return view('products.product_view')->with('products', $product);
    }
    public function create_template()
    {
        return view('admin.pages.product.createTemplate');
    }
    public function store_template(Request $request)
    {

        // simulate store template

        return
            response($request)
                ->header('Content-Type', 'text/json');

        $this->validate($request, [
            'product_name' => 'required|min:3|max:50',
            'commission' => 'required',
            'supporting_country' => 'required',
            'product_for' => 'required',
            'product_type' => 'required',
            'product_sub_type' => 'required',
            'front_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'back_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'right_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'left_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);



        // Save data to the database
        $product = new Products();
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
            response($request)
                ->header('Content-Type', 'text/json');
    }

    public function get_template(Request $request)
    {

        // simulate get template 
        $product = '{
            "product_name": "Test",
            "commission": "10",
            "supporting_country": "Isreal",
            "product_for": "Isreal",
            "product_type": "Shirt",
            "product_sub_type": "Shirt",
            "frontImage": "https://res.cloudinary.com/dvjz9gnxu/image/upload/v1701966170/d5bdjv0xydifx2kbwulc.png",
            "backImage": "https://res.cloudinary.com/dvjz9gnxu/image/upload/v1701966172/hort99ok9ni5sthopzf9.png",
            "leftImage": "https://res.cloudinary.com/dvjz9gnxu/image/upload/v1701966174/y5ptvhe3ks8wolutlcla.png",
            "rightImage": "https://res.cloudinary.com/dvjz9gnxu/image/upload/v1701966177/k0pykhdwhp5a4qaejb0h.png"
        }';
        return
            response($product)
                ->header('Content-Type', 'text/json');
    }

}