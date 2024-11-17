@extends('admin.layout.main')

@section('content')

<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>Create New Boycott</h1>
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
                <ul class="nav nav-tabs" id="productTabs">
                    <li class="nav-item">
                        <a class="nav-link active" id="tshirt-tab" data-bs-toggle="tab" href="#tshirt" role="tab"
                            aria-controls="tshirt" aria-selected="true">T-Shirts</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="hoodie-tab" data-bs-toggle="tab" href="#hoodie" role="tab"
                            aria-controls="hoodie" aria-selected="false">Hoodies</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="sweatshirt-tab" data-bs-toggle="tab" href="#sweatshirt" role="tab"
                            aria-controls="sweatshirt" aria-selected="false">Sweatshirts</a>
                    </li>
                </ul>

                <form id="unifiedForm" method="post" enctype="multipart/form-data"
                    action="{{ route('admin.boycott.store', $data_collection->id) }}">
                    @csrf
                    <div class="tab-content mt-4" id="productTabContent">
                        <!-- Tab 1: T-Shirts -->
                        <div class="tab-pane fade show active" id="tshirt" role="tabpanel" aria-labelledby="tshirt-tab">
                            @include('admin.pages.boycott.product_form')
                        </div>

                        <!-- Tab 2: Hoodies -->
                        <div class="tab-pane fade" id="hoodie" role="tabpanel" aria-labelledby="hoodie-tab">
                            @include('admin.pages.boycott.product_form_2')
                            <input type="hidden" name="product_types[]" value="hoodies">
                        </div>

                        <!-- Tab 3: Sweatshirts -->
                        <div class="tab-pane fade" id="sweatshirt" role="tabpanel" aria-labelledby="sweatshirt-tab">
                            @include('admin.pages.boycott.product_form_2')
                            <input type="hidden" name="product_types[]" value="sweatshirts">
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary mt-3">Create</button>
                </form>
            </div>
        </div>
    </div>
</section>

<script>
    
</script>

<script>
    document.querySelectorAll('#productTabs .nav-link').forEach(tab => {
        tab.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default link behavior

            // Remove active class from all tabs
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(tabPane => tabPane.classList.remove('show', 'active'));

            // Add active class to the clicked tab and its content
            const target = this.getAttribute('href');
            this.classList.add('active');
            document.querySelector(target).classList.add('show', 'active');
        });
    });
</script>

@endsection
