<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Cloudinary\Configuration\Configuration;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

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
        $uploadedFileUrl = Cloudinary::upload($request->file('file')->getRealPath())->getSecurePath();
        return $uploadedFileUrl;
    }
    public function createProduct(Request $request)
    {


        $curl = curl_init();
        $body = '{ "sync_product": {"name": "test","thumbnail":  "' . $request->imageUrl . '" }, "sync_variants": [{  "files": [ {"url": "' . $request->imageUrl . '","thumbnail_url": "' . $request->imageUrl . '" }  ],  "variant_id": 1, "retail_price": "20", "currency": "USD"} ]}';

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
                CURLOPT_POSTFIELDS => $body,
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

        $curl = curl_init();

        curl_setopt_array(
            $curl,
            array(
                CURLOPT_URL => 'https://api.printful.com/shipping/rates',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS => '{
                        "recipient": {
                            "address1": "Mr John Smith. 132, My Street, Kingston, New York 12401",
                            "city": "New York",
                            "country_code": "US",
                            "state_code": "NY"
                        },
                        "items": [
                            {
                            "quantity": 1,
                            "variant_id": 1
                            }
                        ]
                        }',
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