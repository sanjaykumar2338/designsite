<div class="mb-3 mt-3">
        <label for="image">Feature Image:</label>
        <input type="file" class="form-control" id="feature_image" name="feature_image">
        <a href="{{ fileToUrl($blog->feature_image) }}" target="_blank">View Feature Image</a>
</div>
<div class="mb-3 mt-3">
    <label for="image">Front Design Image:</label>
    <input type="file" class="form-control" id="blog_image" name="blog_image">
    <a href="{{ fileToUrl($blog->blog_image) }}" target="_blank">View Front Design Image</a>
</div>
<div class="mb-3 mt-3">
    <label for="image">Back Design Image:</label>
    <input type="file" class="form-control" id="back_design_image" name="back_design_image">
    <a href="{{ fileToUrl($blog->back_design_image) }}" target="_blank">View Back Design Image</a>
</div>