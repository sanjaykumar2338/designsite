@extends('admin.layout.main')
@section('content')
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
               @if(count($orders)>0)
               
               <div class="row">
                  <table class="table table-hover">
                     <thead>
                        <tr>
                           <th>#ID</th>
                           <th>Customer</th>
                           <th>Amount</th>
                           <th>Stripe Payment ID</th>
                           <th>Purchased On</th>
                        </tr>
                     </thead>
                     <tbody>

                        @foreach($orders as $order)
                            <tr>
                                <td>{{$order->id}}</td>
                                <td>{{$order->name}}</td>
                                <td>{{$order->amount}}</td>
                                <td>{{$order->payment_intent_id}}</td>
                                <td>{{$order->created_at}}</td>
                            </tr>
                        @endforeach

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
@endsection