<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Cloudinary\Configuration\Configuration;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $uploadedFileUrl = Cloudinary::upload($request->file('file')->getRealPath())->getSecurePath();
        // return $uploadedFileUrl;

        $file = $request->file('file')->store('public/images');
        if ($request->getDbUrl == "true") {
            return $file;
        }
        return fileToUrl($file);
        // $uploadedFile = $request->file('file');

        // if ($uploadedFile) {
        //     // Store the file in a storage disk (e.g., public, s3, etc.)
        //     $path = $uploadedFile->store('uploads', 'public');

        //     // Get the URL for the stored file
        //     $url = asset('storage/' . $path); // Assuming the file is stored in the 'public' disk

        //     // You can return this URL or do something else with it
        //     //return response()->json(['url' => $url], 200);
        //     return $url;
        // }

        // return false;
        // // Handle the case where no file was uploaded
        // return response()->json(['error' => 'No file uploaded'], 400);

    }
    public function createProduct(Request $request)
    {


        $curl = curl_init();

        // dd($request->jsonString);

        curl_setopt_array(
            $curl,
            array(
                CURLOPT_URL => 'https://api.printful.com/store/products',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS => $request->jsonString,
                CURLOPT_HTTPHEADER => array(
                    'X-PF-Store-Id: 12631976',
                    'Content-Type: application/json',
                    'Accept: application/json',
                    'Authorization: Bearer te6lqpl4ju9anm3y0TWtWTLaAVDiQz6ddtAspwJc'
                ),
            )
        );

        $response = curl_exec($curl);

        curl_close($curl);

        return $response;
    }
    public function getProduct(Request $request)
    {
        $curl = curl_init();

        curl_setopt_array(
            $curl,
            array(
                CURLOPT_URL => 'https://api.printful.com/store/products/' . $request->id,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'GET',
                CURLOPT_HTTPHEADER => array(
                    'X-PF-Store-Id: 12631976',
                    'Accept: application/json',
                    'Authorization: Bearer te6lqpl4ju9anm3y0TWtWTLaAVDiQz6ddtAspwJc',
                ),
            )
        );

        $response = curl_exec($curl);

        curl_close($curl);
        return $response;
    }

    public function calculateShippingRate(Request $request)
    {
        // Extract the recipient data from the request
        $recipient = $request->input('recipient');
        $email = $recipient['email'];
        $password = $recipient['password'];
        $firstName = $recipient['name'];
        $user = User::where('email', $email)->first();

        // If the user doesn't exist, create a new one and log them in
        if (!$user) {
            $user = User::create([
                'first_name' => $firstName,
                'email' => $email,
                'password' => Hash::make($password),
            ]);

            if (!Auth::check()) {
                Auth::login($user);
            }
        } else {
            // If the user exists, check the password and login
            if (!Auth::check()) {
                Auth::login($user);
            }
        }

        // Prepare the data for the Printful API request
        $postData = json_encode([
            'recipient' => [
                'address1' => $recipient['address1'],
                'city' => $recipient['city'],
                'country_code' => $recipient['country_code'],
                'state_code' => $recipient['state_code'],
            ],
            'items' => $request->input('items')
        ]);

        // Initialize cURL
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.printful.com/shipping/rates',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => $postData,
            CURLOPT_HTTPHEADER => array(
                'X-PF-Store-Id: 12631976',
                'Content-Type: application/json',
                'Accept: application/json',
                'Authorization: Bearer te6lqpl4ju9anm3y0TWtWTLaAVDiQz6ddtAspwJc',
            ),
        ));

        // Execute cURL request and get the response
        $response = curl_exec($curl);

        // Close cURL session
        curl_close($curl);

        // Return the response
        return $response;
    }

    public function createOrder(Request $request)
    {

        $curl = curl_init();

        curl_setopt_array(
            $curl,
            array(
                CURLOPT_URL => 'https://api.printful.com/orders',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS => $request->jsonString,
                CURLOPT_HTTPHEADER => array(
                    'X-PF-Store-Id: 12631976',
                    'Content-Type: application/json',
                    'Accept: application/json',
                    'Authorization: Bearer te6lqpl4ju9anm3y0TWtWTLaAVDiQz6ddtAspwJc',
                ),
            )
        );

        $response = curl_exec($curl);

        curl_close($curl);
        return $response;
    }

    public function updateOrder(Request $request, string $id)
    {

        $curl = curl_init();

        curl_setopt_array(
            $curl,
            array(
                CURLOPT_URL => 'https://api.printful.com/orders/' . $id,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'PUT',
                CURLOPT_POSTFIELDS => $request->jsonString,
                CURLOPT_HTTPHEADER => array(
                    'X-PF-Store-Id: 12631976',
                    'Content-Type: application/json',
                    'Accept: application/json',
                    'Authorization: Bearer te6lqpl4ju9anm3y0TWtWTLaAVDiQz6ddtAspwJc',
                    'Cookie: __cf_bm=b_KF_QLD5hwAjdrI5D..II41J0suVQ6rDItqE3fGpiU-1700675108-0-AWJ8qrjc2rORqrGTIYe7pXKj/XaMG6zJ3iQM8WjXiDaVgUvKW48NY6wf3+kjlL/tafcmaYGux6DA4EnogAZEYC8=; dsr_setting=%7B%22region%22%3A1%2C%22requirement%22%3Anull%7D'
                ),
            )
        );

        $response = curl_exec($curl);

        curl_close($curl);
        return $response;
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
