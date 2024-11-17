
    <input type="hidden" name="product_type" value="{{ $type }}">
    <div class="mb-3 mt-3">
        <label for="product_name">Title:</label>
        <input type="text" value="{{ $blog->title }}" class="form-control" id="title" placeholder="Enter Title" name="title">
    </div>
    <div class="mb-3 mt-3">
        <label for="meta_title">Design #No:</label>
        <input class="form-control" id="design_number" rows="6" placeholder="Enter Design Number" name="design_number" value="{{ $blog->design_number }}">
    </div>
    <div class="mb-3 mt-3">
        <label for="meta_title">Price:</label>
        <input type="number" class="form-control" id="price" rows="6" placeholder="Enter Price" name="price" value="{{ $blog->price }}">
    </div>
    <div class="mb-3 mt-3">
        <label for="product_name">Description:</label>
        <textarea name="description" cols="5" id="description" class="form-control">{{ $blog->description }}</textarea>
    </div>

    @include('admin.pages.boycott.upload_edit')
    
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