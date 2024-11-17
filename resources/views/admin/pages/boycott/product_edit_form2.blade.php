@php
    $data = $data ?? [];
@endphp

<input type="hidden" name="product_types[]" value="{{ $type }}">

<div class="mb-3 mt-3">
    <label for="product_name">Title:</label>
    <input type="text" value="{{ $data['title'] }}" class="form-control" id="title" placeholder="Enter Title" name="title2[]">
</div>

<div class="mb-3 mt-3">
    <label for="meta_title">Design #No:</label>
    <input class="form-control" id="design_number" rows="6" placeholder="Enter Design Number" name="design_number2[]" value="{{ $data['design_number'] }}">
</div>

<div class="mb-3 mt-3">
    <label for="meta_title">Price:</label>
    <input type="number" class="form-control" id="price" rows="6" placeholder="Enter Price" name="price2[]" value="{{ $data['price'] }}">
</div>

<div class="mb-3 mt-3">
    <label for="product_name">Description:</label>
    <textarea name="description2[]" cols="5" id="description" class="form-control">{{ $data['description'] }}</textarea>
</div>

<div class="mb-3 mt-3">
    <label for="meta_title">Meta Title:</label>
    <input class="form-control" value="{{ $data['meta_title'] }}" id="meta_title" rows="6" placeholder="Enter Meta Title" name="meta_title2[]">
</div>

<div class="mb-3 mt-3">
    <label for="meta_title">Meta Keywords:</label>
    <input class="form-control" value="{{ $data['meta_keywords'] }}" id="meta_keywords" rows="6" placeholder="Enter Meta Keywords" name="meta_keywords2[]">
</div>

<div class="mb-3 mt-3">
    <label for="meta_title">Meta Description:</label>
    <textarea name="meta_description2[]" class="form-control">{{ $data['meta_description'] }}</textarea>
</div>
