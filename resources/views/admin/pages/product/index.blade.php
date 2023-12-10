@extends('admin.layout.main')

@section('content')

    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Products List</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Products</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
    
        <!-- /.row -->
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title"><a href="{{url('admin/products/create')}}">Add New Product</a></h3>
                <div class="card-tools">
                  <div class="input-group input-group-sm" style="width: 150px;">
                    <input type="text" name="table_search" class="form-control float-right" placeholder="Search">

                    <div class="input-group-append">
                      <button type="submit" class="btn btn-default"><i class="fas fa-search"></i></button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /.card-header -->

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif
                @if(count($products)>0)
                    @foreach($products as $product)

                            <div class="row">

                                    <table class="table table-hover">
                                        <thead>
                                        <tr>
                                            <th class="col-sm-4 col-md-4">Product</th>

                                            <th class="col-sm-4 col-md-4">Commission</th>

                                            <th class="col-sm-4 col-md-4"  style="text-align: center">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        <tr>

                                            <td class="col-sm-4 col-md-4">

                                                <div class="media">
                                                    <div class="media-body">
                                                        <h4  class="product-title" ><a  href="/products/{{$product->id}} ">{{$product->product_name}}</a></h4>

                                                        <span>Created at :  </span><span class="text-success"><strong>{{$product->created_at}}</strong></span>
                                                    </div>

                                                </div>
                                            </td>
                                            <td class="col-sm-4 col-md-4"><strong>  {{$product->commission}}$</strong></td>
                                            <td class="col-sm-4 col-md-4" style="text-align: right">
                                              <a href="/admin/products/remove/{{$product->id}}" class="btn btn-danger">Remove</a>
                                              <a href="/admin/products/{{$product->id}}/edit" class="btn btn-primary">EDIT</a>
                                              <a href="/admin/products/create_template/{{$product->id}}" class="btn btn-primary">Design Templates</a>
                                            </td>
                                        </tr>
                                        </tbody>
                                      </table>
                            </div>
                        @endforeach
                    @else
                        <h6 class="display-8">THERE'S NO PRODUCT<BR><a href="/admin/products/create">ADD PRODUCT </a>  </h6>

                @endif
                </div>


              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
      </div>
    </section>
@endsection