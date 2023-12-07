@extends('admin.layout.main')

@section('content')

    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Create New Product</h1>
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
        <div class="row">
          
          @if ($errors->any())
              <div class="alert alert-danger">
                  <ul>
                      @foreach ($errors->all() as $error)
                          <li>{{ $error }}</li>
                      @endforeach
                  </ul>
              </div>
          @endif


          <div class="col-md-12">
            <form method="post" enctype="multipart/form-data" action="{{ route('admin.products.store') }}">
                @csrf
                <div class="mb-3 mt-3">
                  <label for="product_name">Product Name:</label>
                  <input type="text" class="form-control" id="product_name" placeholder="Enter Product Name" name="product_name">
                </div>

                <div class="mb-3 mt-3">
                  <label for="product_name">Commission:</label>
                  <input type="number" class="form-control" id="commission" placeholder="Enter Commission" name="commission">
                </div>

                <div class="mb-3">
                  <label for="pwd">Supporting Country:</label>                  
                  <select class="form-control" id="supporting_country" name="supporting_country">
                    <option value="">Select</option>
                    <option value="Israel">Israel</option>
                    <option value="Palestine">Palestine</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Russia">Russia</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Kurdistan">Kurdistan</option>
                    <option value="India">India</option>
                    <option value="Pakistan">Pakistan</option>
                  </select>
                </div>

                <div class="mb-3 mt-3">
                  <label for="title">Product For:</label>
                  <select class="form-control" id="product_for" name="product_for">
                    <option value="">Select</option>
                    <option value="Men">Men</option>
                    <option value="Woman">Woman</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div class="mb-3 mt-3">
                  <label for="title">Product Type:</label>
                  <select class="form-control" id="product_type" name="product_type">
                    <option value="">Select</option>
                    <option value="Shirts">Shirts</option>
                    <option value="Hoodies">Hoodies</option>
                    <option value="Sweatshirts">Sweatshirts</option>
                    <option value="Bottoms">Bottoms</option>
                  </select>
                </div>

                <div class="mb-3 mt-3">
                  <label for="title">Product Sub Type:</label>
                  <select class="form-control" id="product_sub_type" name="product_sub_type">
                    <option value="">Select</option>
                    <option value="Oversized">Oversized</option>
                    <option value="Fitted">Fitted</option>
                    <option value="V-Neck">V-Neck</option>
                    <option value="Long Sleeve">Long Sleeve</option>
                    <option value="Polo">Polo</option>
                  </select>
                </div>

                <div class="mb-3 mt-3">
                  <label for="title">Front Image:</label>
                  <input type="file" class="form-control" name="front_image">
                </div>

                <div class="mb-3 mt-3">
                  <label for="title">Back Image:</label>
                  <input type="file" class="form-control" name="back_image">
                </div>

                <div class="mb-3 mt-3">
                  <label for="title">Right Image:</label>
                  <input type="file" class="form-control" name="right_image">
                </div>

                <div class="mb-3 mt-3">
                  <label for="title">Left Image:</label>
                  <input type="file" class="form-control" name="left_image">
                </div>

                <button type="submit" class="btn btn-primary">Create</button>
              </form>
          </div>
        </div>
        <br>
        <!-- /.row -->
      </div><!-- /.container-fluid -->
    </section>
@endsection