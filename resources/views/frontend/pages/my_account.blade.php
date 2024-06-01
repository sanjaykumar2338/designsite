@extends('frontend.layout.dashboard')
@section('content')
@if(session('success'))
    <div class="alert alert-success">
        {{ session('success') }}
    </div>
@endif

<style>
    .container {
        padding: 2rem 0rem;
    }

    h4 {
        margin: 2rem 0rem 1rem;
    }

    .table-image {
        td, th {
            vertical-align: middle;
        }
    }
</style>


<!-- ========== Start about-us-section ========== -->
<div class="container">
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
        <span class="navbar-brand mb-0 h1"><i class="nav-icon fas fa-shopping-bag"></i> My Orders</span>
    </div>
  </nav>
  <div class="row">
    <div class="col-12">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Printful #ID</th>
            <th scope="col">Product Name</th>
            <th scope="col">Status</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Donation</th>
            <th scope="col">Country</th>
            <th scope="col">Payment ID</th>
            <th scope="col">Product</th>
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
                    @endphp

                    <th scope="row">{{$data['id']}}</th>
                    <td>{{$order->website_product_name}}</td>
                    <td>{{$order->print_order_status}}</td>
                    <td>${{$data['retail_costs']['total']}}</td>
                    <td>${{$order->total_amount - $order->product_price}}</td>
                    <td>{{$order->supporting_country}}</td>
                    <td>{{$order->payment_intent_id}}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick="window.open('{{ $url }}', '_blank')"><i class="far fa-eye"></i></button>
                        <button style="display:none;" type="button" class="btn btn-success"><i class="fas fa-edit"></i></button>
                        <button style="display:none;" type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick="window.open('{{ url('/invoice/' . $order->id) }}', '_blank')" style="cursor: pointer;"><i class="far fa-eye"></i></button>
                    </td>
                </tr>
            @endforeach
          @endif  
        </tbody>
      </table>
    </div>
  </div>
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
</div>
@endsection