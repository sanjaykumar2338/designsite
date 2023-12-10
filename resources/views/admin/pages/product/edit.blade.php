@extends('admin.layout.main')

@section('content')

    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Edit Product</h1>
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
            <form method="post" enctype="multipart/form-data" action="{{ url('/admin/products/update/'.$product->id) }}">
                @csrf
                <div class="mb-3 mt-3">
                  <label for="product_name">Product Name:</label>
                  <input type="text" value="{{$product->product_name}}" class="form-control" id="product_name" placeholder="Enter Product Name" name="product_name">
                </div>

                <div class="mb-3 mt-3">
                  <label for="product_name">Product Description:</label>
                  <textarea class="form-control" id="product_description" rows="6" placeholder="Enter Product Description" name="product_description">{{$product->product_description}}</textarea>
                </div>

                <div class="mb-3 mt-3">
                  <label for="product_name">Commission:</label>
                  <input type="number" value="{{$product->commission}}" class="form-control" id="commission" placeholder="Enter Commission" name="commission">
                </div>

                <div class="mb-3">
                  <label for="pwd">Supporting Country:</label>                  
                  <select class="form-control" id="supporting_country" name="supporting_country">
                    <option value="">Select</option>
                    <option {{$product->supporting_country=='Israel'?'selected':''}} value="Israel">Israel</option>
                    <option {{$product->supporting_country=='Palestine'?'selected':''}}  value="Palestine">Palestine</option>
                    <option {{$product->supporting_country=='Azerbaijan'?'selected':''}}  value="Azerbaijan">Azerbaijan</option>
                    <option {{$product->supporting_country=='Armenia'?'selected':''}}  value="Armenia">Armenia</option>
                    <option {{$product->supporting_country=='Russia'?'selected':''}}  value="Russia">Russia</option>
                    <option {{$product->supporting_country=='Ukraine'?'selected':''}}  value="Ukraine">Ukraine</option>
                    <option {{$product->supporting_country=='Turkey'?'selected':''}}  value="Turkey">Turkey</option>
                    <option {{$product->supporting_country=='Kurdistan'?'selected':''}}  value="Kurdistan">Kurdistan</option>
                    <option {{$product->supporting_country=='India'?'selected':''}}  value="India">India</option>
                    <option {{$product->supporting_country=='Pakistan'?'selected':''}}  value="Pakistan">Pakistan</option>
                  </select>
                </div>

                <div class="mb-3 mt-3">
                  <label for="title">Product For:</label>
                  <select class="form-control" id="product_for" name="product_for">
                    <option value="">Select</option>
                    <option {{$product->product_for=='Men'?'selected':''}}  value="Men">Men</option>
                    <option {{$product->product_for=='Woman'?'selected':''}}  value="Woman">Woman</option>
                    <option {{$product->product_for=='Accessories'?'selected':''}}  value="Accessories">Accessories</option>
                  </select>
                </div>

                <div class="mb-3 mt-3">
                  <label for="title">Product Type:</label>
                  <select class="form-control" id="product_type" name="product_type">
                    <option value="">Select</option>
                    <option {{$product->product_type=='Shirts'?'selected':''}}  value="Shirts">Shirts</option>
                    <option {{$product->product_type=='Hoodies'?'selected':''}}  value="Hoodies">Hoodies</option>
                    <option {{$product->product_type=='Sweatshirts'?'selected':''}}  value="Sweatshirts">Sweatshirts</option>
                    <option {{$product->product_type=='Bottoms'?'selected':''}}  value="Bottoms">Bottoms</option>
                  </select>
                </div>

                <div class="mb-3 mt-3">
                  <label for="title">Product Sub Type:</label>
                  <select class="form-control" id="product_sub_type" name="product_sub_type">
                    <option value="">Select</option>
                    <option {{$product->product_sub_type=='Oversized'?'selected':''}}  value="Oversized">Oversized</option>
                    <option {{$product->product_sub_type=='Fitted'?'selected':''}}  value="Fitted">Fitted</option>
                    <option {{$product->product_sub_type=='V-Neck'?'selected':''}}  value="V-Neck">V-Neck</option>
                    <option {{$product->product_sub_type=='Long Sleeve'?'selected':''}}  value="Long Sleeve">Long Sleeve</option>
                    <option {{$product->product_sub_type=='Polo'?'selected':''}}  value="Polo">Polo</option>
                  </select>
                </div>

                <div class="mb-3 mt-3">
                  <label for="title">Front Image:</label>
                  <input type="file" class="form-control" name="front_image">
                </div>

                <div class="mb-3 mt-3">
                  <label for="title">Front Image Price:</label>
                  <input type="text" value="{{$product->front_image_price}}" class="form-control" name="front_image_price">
                </div>

                <div class="mb-3 mt-3">
                  <label for="title">Front Image Donation Description:</label>
                  <textarea class="form-control" name="front_image_donation">{{$product->front_image_donation}}</textarea>
                </div>

                <div class="mb-3 mt-3">
                  <label for="title">Back Image:</label>
                  <input type="file" class="form-control" name="back_image">
                </div>
                
                <div class="mb-3 mt-3">
                  <label for="title">Back Image Price:</label>
                  <input type="text" value="{{$product->back_image_price}}" class="form-control" name="back_image_price">
                </div>

                <div class="mb-3 mt-3">
                  <label for="title">Back Image Donation:</label>
                  <textarea class="form-control" name="back_image_donation">{{$product->back_image_price}}</textarea>
                </div>

                <div class="mb-3 mt-3">
                  <label for="title">Right Image:</label>
                  <input type="file" class="form-control" name="right_image">
                </div>

                <div class="mb-3 mt-3">
                  <label for="title">Left Image:</label>
                  <input type="file" class="form-control" name="left_image">
                </div>

                <div class="mb-3 mt-3">
                  <label for="title">Seo Title:</label>
                  <input type="text" value="{{$product->seo_title}}" class="form-control" name="seo_title">
                </div>

                <div class="mb-3 mt-3">
                  <label for="title">Meta Description:</label>
                  <textarea class="form-control" name="meta_description">{{$product->meta_description}}</textarea>
                </div>

                <div class="mb-3 mt-3">
                  <label for="title">Meta Keyword:</label>
                  <textarea class="form-control" name="meta_keyword">{{$product->meta_keyword}}</textarea>
                </div>

                <button type="submit" class="btn btn-primary">UPDATE</button>
              </form>
          </div>
        </div>
        <br>
        <!-- /.row -->
      </div><!-- /.container-fluid -->
    </section>
@endsection