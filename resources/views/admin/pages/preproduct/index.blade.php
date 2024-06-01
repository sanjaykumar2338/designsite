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
            <h1>Pre-Design Products List</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="{{url('/admin')}}">Home</a></li>
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
                <h3 class="card-title"><a href="{{url('admin/preproducts/create')}}">Add New Product</a></h3>
                <div class="card-tools">
                  <form name="search_frm" method="get" action="{{ url('/admin/preproducts') }}">
                      <div class="input-group input-group-sm" style="gap: 7px;width:600px;">
                          <select class="form-control float-right" name="search_by_country">
                              <option value="">Filter By Country</option>
                              <option value="Israel" {{ old('search_by_country', request()->search_by_country) == 'Israel' ? 'selected' : '' }}>Israel</option>
                              <option value="Palestine" {{ old('search_by_country', request()->search_by_country) == 'Palestine' ? 'selected' : '' }}>Palestine</option>
                              <option value="Russia" {{ old('search_by_country', request()->search_by_country) == 'Russia' ? 'selected' : '' }}>Russia</option>
                              <option value="Ukraine" {{ old('search_by_country', request()->search_by_country) == 'Ukraine' ? 'selected' : '' }}>Ukraine</option>
                          </select>

                          <select class="form-control float-right" name="search_by_product_for">
                              <option value="">Filter By Product For</option>
                              <option value="Men" {{ old('search_by_product_for', request()->search_by_product_for) == 'Men' ? 'selected' : '' }}>Men</option>
                              <option value="Woman" {{ old('search_by_product_for', request()->search_by_product_for) == 'Woman' ? 'selected' : '' }}>Woman</option>
                          </select>

                          <select class="form-control float-right" name="search_by_product_type">
                                <option value="">Filter By Product Type</option>
                                <option value="Shirts" {{ old('search_by_product_type', request()->search_by_product_type) == 'Shirts' ? 'selected' : '' }}>Shirts</option>
                                <option value="Hoodies" {{ old('search_by_product_type', request()->search_by_product_type) == 'Hoodies' ? 'selected' : '' }}>Hoodies</option>
                                <option value="Sweatshirts" {{ old('search_by_product_type', request()->search_by_product_type) == 'Sweatshirts' ? 'selected' : '' }}>Sweatshirts</option>
                                <option value="Bottoms" {{ old('search_by_product_type', request()->search_by_product_type) == 'Bottoms' ? 'selected' : '' }}>Bottoms</option>
                                <option value="Bags" {{ old('search_by_product_type', request()->search_by_product_type) == 'Bags' ? 'selected' : '' }}>Bags</option>
                                <option value="Footwear" {{ old('search_by_product_type', request()->search_by_product_type) == 'Footwear' ? 'selected' : '' }}>Footwear</option>
                                <option value="Hats" {{ old('search_by_product_type', request()->search_by_product_type) == 'Hats' ? 'selected' : '' }}>Hats</option>
                                <option value="Phone Cases" {{ old('search_by_product_type', request()->search_by_product_type) == 'Phone Cases' ? 'selected' : '' }}>Phone Cases</option>
                          </select>

                          <div class="input-group-append">
                              <button type="submit" class="btn btn-default"><i class="fas fa-search"></i></button>
                          </div>
                      </div>
                  </form>
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
                                            <th class="col-sm-2 col-md-2">Product</th>

                                            <th class="col-sm-2 col-md-1">Commission</th>

                                            <th class="col-sm-1 col-md-1">Price</th>

                                            <th class="col-sm-1 col-md-1">Country</th>

                                            <th class="col-sm-1 col-md-1">Product For</th>

                                            <th class="col-sm-1 col-md-1">Product Type</th>

                                            <th class="col-sm-3 col-md-3"  style="text-align: right;">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        <tr>

                                            <td class="col-sm-2 col-md-2">

                                                <div class="media">
                                                    <div class="media-body">
                                                        <h4  class="product-title" ><a  href="/preproducts/{{$product->id}} ">{{$product->product_name}}</a></h4>

                                                        <span>Created at :  </span><span class="text-success"><strong>{{$product->created_at}}</strong></span>
                                                    </div>

                                                </div>
                                            </td>

                                            <th class="col-sm-2 col-md-1"> {{$product->commission}}$</th>
                                            <td class="col-sm-1 col-md-1"><strong>  ${{$product->product_price}}</strong></td>
                                            <td class="col-sm-1 col-md-1"><strong>  {{$product->supporting_country}}</strong></td>
                                            <td class="col-sm-1 col-md-1"><strong>  {{$product->product_for}}</strong></td>
                                            <td class="col-sm-1 col-md-1"><strong>  {{$product->product_type}}</strong></td>
                                            <td class="col-sm-3 col-md-3" style="text-align: right">
                                              <a href="/admin/preproducts/remove/{{$product->id}}" class="btn btn-danger">Remove</a>
                                              <a href="/admin/preproducts/{{$product->id}}/edit" class="btn btn-primary">EDIT</a>
                                              <a href="/admin/preproducts/create_template/{{$product->id}}" class="btn btn-primary">Design Template</a>
                                            </td>
                                        </tr>
                                        </tbody>
                                      </table>
                            </div>
                        @endforeach
                    @else
                        <h6 class="display-8">THERE'S NO PRODUCT<BR><a href="/admin/preproducts/create">ADD PRODUCT </a>  </h6>

                @endif
                </div>

              


              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
      </div>
    </section>
    
    <!-- Previous and Next buttons -->
    <nav>
    <ul class="pagination justify-content-center">
        @if ($products->onFirstPage())
            <li class="page-item disabled"><span class="page-link"><< Previous</span></li>
        @else
            <li class="page-item"><a class="page-link" href="{{ $products->previousPageUrl() }}" rel="prev"><< Previous</a></li>
        @endif

        @php
            $total_pages = $products->lastPage();
            $current_page = $products->currentPage();
            $max_links = 5; // Max number of links to show
            $start = max(1, $current_page - intval($max_links / 2));
            $end = min($total_pages, $current_page + intval($max_links / 2));
            if ($current_page < intval($max_links / 2)) {
                $end = min($total_pages, $max_links);
            }
            if ($current_page > ($total_pages - intval($max_links / 2))) {
                $start = max(1, $total_pages - $max_links + 1);
            }
        @endphp

        @if ($start > 1)
            <li class="page-item"><a class="page-link" href="{{ $products->url(1) }}">1</a></li>
            @if ($start > 2)
                <li class="page-item disabled"><span class="page-link">...</span></li>
            @endif
        @endif

        @for ($i = $start; $i <= $end; $i++)
            @if ($i == $current_page)
                <li class="page-item active"><span class="page-link">{{ $i }}</span></li>
            @else
                <li class="page-item"><a class="page-link" href="{{ $products->url($i) }}">{{ $i }}</a></li>
            @endif
        @endfor

        @if ($end < $total_pages)
            @if ($end < $total_pages - 1)
                <li class="page-item disabled"><span class="page-link">...</span></li>
            @endif
            <li class="page-item"><a class="page-link" href="{{ $products->url($total_pages) }}">{{ $total_pages }}</a></li>
        @endif

        @if ($products->hasMorePages())
            <li class="page-item"><a class="page-link" href="{{ $products->nextPageUrl() }}" rel="next">Next >></a></li>
        @else
            <li class="page-item disabled"><span class="page-link">Next >></span></li>
        @endif
    </ul>
</nav>

@endsection