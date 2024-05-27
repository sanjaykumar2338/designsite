@extends('admin.layout.main')
@section('content')
<style>
        /* Example styles for pagination */
        .pagination {
          font-size: 21px;
          /* padding: 43px; */
          float: inline-end;
          padding-right: 18px;
        }

        .pagination ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
        }

        .pagination ul li {
            display: inline;
            margin-right: 5px;
        }

        .pagination ul li a {
            text-decoration: none;
            padding: 5px 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        .pagination ul li a.active {
            background-color: #007bff;
            color: white;
        }
</style>

<section class="content-header">
   <div class="container-fluid">
      <div class="row mb-2">
         <div class="col-sm-6">
            <h1>Orders List</h1>
         </div>
         <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
               <li class="breadcrumb-item"><a href="{{url('/admin')}}">Home</a></li>
               <li class="breadcrumb-item active">Orders</li>
            </ol>
         </div>
      </div>
   </div>
   <!-- /.container-fluid -->
</section>
<!-- Main content -->
<section class="content">
   <div class="container-fluid">
   <!-- /.row -->
   <div class="row">
      <div class="col-12">
         <div class="card">
            <!-- /.card-header -->
            <div class="card-body">
               @if (session('status'))
               <div class="alert alert-success">
                  {{ session('status') }}
               </div>
               @endif

               @if (session('success'))
                  <div class="alert alert-success">
                     {{ session('success') }}
                  </div>
               @endif

               @if (session('error'))
                  <div class="alert alert-danger">
                     {{ session('error') }}
                  </div>
               @endif

               @if(count($orders)>0)
               
               <div class="row">
                  <table class="table table-hover">
                     <thead>
                     <tr>
                        <th scope="col">Printful #ID</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Total Amount</th>
                        <th scope="col">Country</th>
                        <th style="display:none;" scope="col">Payment ID</th>

                        <th scope="col">Donation</th>
                        
                        
                        <th scope="col">Invoice</th>
                        
                     </tr>
                     </thead>
                     <tbody>

                     @if($orders) 
                           @foreach($orders as $order) 
                           
                              <tr>
                                 @php
                                       $data = json_decode($order->printful_order_data, true);
                                       $url = url('/').'/stand-with-'.strtolower($order->supporting_country).'/shop/'.strtolower($order->product_type).'/'.$order->product_slug;

                                       $curl = curl_init();

                                       curl_setopt_array(
                                          $curl,
                                          array(
                                             CURLOPT_URL => 'https://api.printful.com/orders/' . $data['id'],
                                             CURLOPT_RETURNTRANSFER => true,
                                             CURLOPT_ENCODING => '',
                                             CURLOPT_MAXREDIRS => 10,
                                             CURLOPT_TIMEOUT => 0,
                                             CURLOPT_FOLLOWLOCATION => true,
                                             CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                                             CURLOPT_CUSTOMREQUEST => 'GET',
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
                                       $info = json_decode($response, true);
                                 @endphp

                                 <th scope="row">{{$data['id']}}</th>
                                 <td>{{$order->customer_name}}</td>

                                 <td>
                                    @php
                                       $words = explode(' ', $order->website_product_name);
                                       $firstThreeWords = implode(' ', array_slice($words, 0, 3));
                                    @endphp
                                    <a href="{{ $url }}" href="_blank">View {{ $firstThreeWords }}...</a>
                                 </td>
                                 
                                 <td>{{$info['result']['status']}}</td>
                                 <td>${{$data['retail_costs']['total']}}</td>
                                 
                                 <td>{{$order->supporting_country}}</td>
                                 <td style="display:none;">{{$order->payment_intent_id}}</td>
                                 
                                 @php $donation = $order->total_amount - $order->product_price; @endphp

                                 @if($donation && $donation!=0)
                                    @if($order->donation_status=='paid')
                                       <td><a style="color: white;background-color: green;" type="button" class="btn btn-primary" href="#">Sent ${{$donation}}</a></td>
                                    @else
                                       <td><a style="color: white;" onclick="return confirm('Are you sure?')" type="button" class="btn btn-primary" href="{{url('admin/sendpayment')}}/{{$donation}}/{{$order->supporting_country}}/{{$order->id}}">Send ${{$donation}}</a></td>
                                    @endif
                                 @else
                                    <td><a style="color: white;" type="button" class="btn btn-primary" href="#">Send ${{$donation}}</a></td>
                                 @endif

                               
                                 <td>
                                       <button type="button" class="btn btn-primary" onclick="window.open('{{ url('/invoice/' . $order->id) }}', '_blank')" style="cursor: pointer;"><i class="far fa-eye"></i></button>
                                 </td>

                                 
                              </tr>
                           @endforeach
                        @endif  

                     </tbody>
                  </table>
               </div>
               @else
               <h6 class="display-8">THERE'S NO ORDER</h6>
               @endif
            </div>
            <!-- /.card-body -->
         </div>
         <!-- /.card -->
      </div>
   </div>
</section>
<nav>
    <ul class="pagination justify-content-center">
        @if ($orders->onFirstPage())
            <li class="page-item disabled"><span class="page-link"><< Previous</span></li>
        @else
            <li class="page-item"><a class="page-link" href="{{ $orders->previousPageUrl() }}" rel="prev"><< Previous</a></li>
        @endif

        @for ($i = 1; $i <= $orders->lastPage(); $i++)
            @if ($i == $orders->currentPage())
                <li class="page-item active"><span class="page-link">{{ $i }}</span></li>
            @else
                <li class="page-item"><a class="page-link" href="{{ $orders->url($i) }}">{{ $i }}</a></li>
            @endif
        @endfor

        @if ($orders->hasMorePages())
            <li class="page-item"><a class="page-link" href="{{ $orders->nextPageUrl() }}" rel="next">Next >></a></li>
        @else
            <li class="page-item disabled"><span class="page-link">Next >></span></li>
        @endif
    </ul>
</nav>

@endsection