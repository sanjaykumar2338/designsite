<div class="mb-3 mt-3">
    <label for="product_name">Title:</label>
    <input type="text" class="form-control" id="title" placeholder="Enter Title" name="title">
</div>

<div class="mb-3 mt-3">
    <label for="meta_title">Design #No:</label>
    <input class="form-control" id="design_number" rows="6" placeholder="Enter Design Number" name="design_number">
</div>

<div class="mb-3 mt-3">
    <label for="meta_title">Price:</label>
    <input type="number" class="form-control" id="price" rows="6" placeholder="Enter Price" name="price">
</div>

<div class="mb-3 mt-3">
    <label for="product_name">Description:</label>
    <textarea name="description" cols="2" id="description" class="form-control"></textarea>
</div>

@include('admin.pages.boycott.upload')

<div class="mb-3 mt-3" style="display:none;">
    <label for="meta_title">Text as Design:</label>
    <input class="form-control" value="" id="design_text" rows="6" placeholder="Enter Text as Design" name="design_text">
</div>

<div class="mb-3 mt-3">
    <label for="meta_title">Meta Title:</label>
    <input class="form-control" id="meta_title" rows="6" placeholder="Enter Meta Title" name="meta_title">
</div>

<div class="mb-3 mt-3">
    <label for="meta_title">Meta Keywords:</label>
    <input class="form-control" id="meta_keywords" rows="6" placeholder="Enter Meta Keywords" name="meta_keywords">
</div>

<div class="mb-3 mt-3">
    <label for="meta_title">Meta Description:</label>
    <textarea name="meta_description" class="form-control"></textarea>
</div>
