@extends('admin.layout.main')

@section('content')

    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Edit Boycott</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Boycott</li>
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
            <form method="post" enctype="multipart/form-data" action="{{ url('/admin/boycott/update/'.$blog->id).'/'.$data_collection->id }}">
                
                @csrf
                <div class="mb-3 mt-3">
                  <label for="product_name">Title:</label>
                  <input type="text" value="{{$blog->title}}" class="form-control" id="title" placeholder="Enter Title" name="title">
                </div>

                <div class="mb-3 mt-3">
                  <label for="product_name">Description:</label>
                  <textarea name="description" cols="5" id="description" class="form-control">{{$blog->description}}</textarea>
                </div>

                <div class="mb-3 mt-3">
                  <label for="image">Feature Image:</label>
                  <input type="file" class="form-control" id="feature_image" name="feature_image">
                  <a href="{{fileToUrl($blog->feature_image)}}" target="_blank">View Feature Image</a>
                </div>

                <div class="mb-3 mt-3">
                  <label for="image">Front Design Image:</label>
                  <input type="file" class="form-control" id="blog_image" name="blog_image">
                  <a href="{{fileToUrl($blog->blog_image)}}" target="_blank">View Front Design Image</a>
                </div>

                <div class="mb-3 mt-3">
                  <label for="image">Back Design Image:</label>
                  <input type="file" class="form-control" id="back_design_image" name="back_design_image">
                  <a href="{{fileToUrl($blog->back_design_image)}}" target="_blank">View Back Design Image</a>
                </div>

                <div class="mb-3 mt-3">
                  <label for="meta_title">Text as Design:</label>
                  <input class="form-control" value="{{$blog->design_text}}" id="design_text" rows="6" placeholder="Enter Text as Design" name="design_text"></textarea>
                </div>

                <div class="mb-3 mt-3">
                  <label for="meta_title">Meta Title:</label>
                  <input class="form-control" value="{{$blog->meta_title}}" id="meta_title" rows="6" placeholder="Enter Meta Title" name="meta_title"></textarea>
                </div>

                <div class="mb-3 mt-3">
                  <label for="meta_title">Meta Keywords:</label>
                  <input class="form-control" value="{{$blog->meta_keywords}}" id="meta_keywords" rows="6" placeholder="Enter Meta Keywords" name="meta_keywords"></textarea>
                </div>

                <div class="mb-3 mt-3">
                  <label for="meta_title">Meta Description:</label>
                  <textarea name="meta_description" class="form-control">{{$blog->meta_description}}</textarea>
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