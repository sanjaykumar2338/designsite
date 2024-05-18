@extends('frontend.layout.homepagelayout')

@section('content')

<section class="slider-Product">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12 p-0 affter">
                <div id="carouselExampleCaptions" class="carousel slide">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0"
                            class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                            aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                            aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3"
                            aria-label="Slide 4"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="asset/frontend/images/banner/stand-with-Israel.jpg" class="d-block w-100"
                                alt="...">
                            <div class="carousel-caption ">
                                <h5>DEFIANT TO <br>AGGRESSION!</h5>
                                <p>Stand to Defend against Aggression,<br> Demolish Terrorism,<br> and Claim Ownership
                                    to Peace.</p>
                                <button onclick='location.href ="{{route('donate_now')}}";' class=" donate"> shop and
                                    donate</button>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="asset/frontend/images/banner/stand-with-Palestine.jpg" class="d-block w-100"
                                alt="...">
                            <div class="carousel-caption ">
                                <h5>MOVED BY<br> IMAGES!</h5>
                                <p>Stand in the Face of Oppression,<br> Challenge False Narratives,<br> and Demand
                                    Accountability.</p>
                                <button onclick='location.href ="{{route('donate_now')}}";' class=" donate"> shop and
                                    donate</button>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="asset/frontend/images/banner/3.jpg" class="d-block w-100" alt="...">
                            <div class="carousel-caption ">
                                <h5>FUELED BY<br> RIGHTEOUSNESS!</h5>
                                <p>Stand for Unification,<br> Resist Unwanted Narratives,<br> and Demand Loyalty.</p>
                                <button onclick='location.href ="{{route('donate_now')}}";' class=" donate"> shop and
                                    donate</button>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="asset/frontend/images/banner/stand-with-Ukraine.jpg" class="d-block w-100"
                                alt="...">
                            <div class="carousel-caption ">
                                <h5>DRIVEN TO<br> BE FREE!</h5>
                                <p>Stand for Sovereignty,<br> Reject Foreign Influence,<br> and Seek Independence.</p>
                                <button onclick='location.href ="{{route('donate_now')}}";' class=" donate"> shop and
                                    donate</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="align-h">
    <div class="container">
        <div class="row add-flex">
            <div class="col-md-12 col-lg-3 z-3 ">
                <div class="main-vioce z-3 ">
                    <div class="vioce box-1" id="box-1">
                        <h4>Choose a Conflict</h4>
                        <ul>
                            <li class="israel-1 option-conflict">Israel & Palestine</li>
                            <li style="display:none" class="israel-1 option-conflict">Azerbaijan & Armenia</li>
                            <li class="option-conflict">Russia & Ukraine</li>
                            <li style="display:none" class="option-conflict">Turkey & Kurdistan </li>
                            <li style="display:none" class="option-conflict">India & Pakistan</li>
                        </ul>
                    </div>

                    <div class="vioce add-bg" id="box-2">
                        <h4>Stand for a Cause </h4>
                        <ul>
                            <li class="Israel-2 option-conflict-li1 standwith">Israel</li>
                            <li class="option-conflict-li2 standwith">Palestine</li>
                        </ul>
                    </div>

                    <div class="vioce add-bg" id="box-3">
                        <h4>Shop Subcategory</h4>
                        <ul>
                            <li class="men">Men's Apparel</li>
                            <li class="woman">Weman's Apparel</li>
                            <li class="accessories">Accessories</li>
                        </ul>
                    </div>

                    <div class="vioce add-bg" id="box-4">
                        <h4>Shop a Category </h4>
                        <ul>
                            <li class="typeofproduct4">Shirts</li>
                            <li class="typeofproduct4">Hoodies</a></li>
                            <li class="typeofproduct4">Sweatshirts</a></li>
                            <li class="typeofproduct4">Bottoms</a></li>
                        </ul>
                    </div>

                    <div class="vioce add-bg" id="box-5">
                        <h4>Shop a Category </h4>
                        <ul>
                            <li class="typeofproduct4">Bags</li>
                            <li class="typeofproduct4">Footwear</a></li>
                            <li class="typeofproduct4">Hats</a></li>
                            <li class="typeofproduct4">Phone Cases</a></li>
                        </ul>
                    </div>

                    <!--
                        <div class="vioce add-bg" id="box-5">
                            <h4>Shop a Subcategory</h4>
                            <ul>
                                <li class="typeofproduct4">Oversized</a></li>
                                <li class="typeofproduct4">Fitted</a></li>
                                <li class="typeofproduct4">V-Neck</a></li>
                                <li class="typeofproduct4">Long Sleeve</a></li>
                                <li class="typeofproduct4">Polo</a></li>
                            </ul>
                        </div>
                        -->
                </div>
            </div>
        </div>
    </div>
</section>

<section class="about-section">
    <div class="container">
        <!-- <div class="row">
            <div class="col-lg-12 col-md-12">
                <h2>Welcome to Cause Stand - Where Fashion Meets Activism</h2>
                <p>As a political fashion company, we are more than just a brand - we are a movement. As one of the leading activist clothing brands, we take pride in our commitment to social and political causes, offering a platform for individuals to express their beliefs through fashion.</p>
                
                <h3>Student Advocacy Apparel, Where Fashion Meets Passion</h3>
                <p>We're more than just a clothing and accessories brand—we're a community of change-makers dedicated to making a difference on college campuses across the nation. Our passion lies in crafting clothing that not only makes a statement but also sparks conversations and drives change.</p>
                
                <h4>At Cause Stand, we redefine political fashion by blending style with substance, creating clothing that resonates with progressive values and challenges the status quo. Our collection of leftist clothing brands showcases bold designs and powerful messages, empowering wearers to proudly stand for what they believe in.</h4>
                
                <h4>Controversial Political Shirts by a Progressive Clothing Brand</h4>
                <p>Each piece in our collection tells a story and serves as a symbol of resistance and resilience. With our extensive range of political merch, social justice clothing, and advocacy gear, we provide a platform for your voice to be heard loud and clear. Our awareness shirts are not just fabric; they're statements, rallying cries for a better tomorrow.</p>
                
                <h3>College Students Discount</h3>
                <p>Order trending demonstration clothing and accessories <span style="color: skyblue;">UP TO 30% OFF</span>. Shop tees, hoodies, bags, headwear, footwear, and phone cases that fit your cause.</p>
                
                <h4>Protest Clothing for the Advocate Student</h4>
                <p>Our mission for the advocate student is simple: to provide resources to empower college students to express their beliefs and champion the causes they care about, all while looking effortlessly stylish. At Cause Stand, we believe that what you wear should be trending and express a powerful statement.</p>
                
                <h4>Social Justice Clothing for the Advocate College Student</h4>
                <p>For students seeking ethical and political justice, finding the right apparel to express their beliefs can be a powerful tool to advocate for ethical reform and political justice. At Cause Stand, we specialize in creating clothing and accessories that resonate with the passion and values of college students.</p>
                
                <h3>Ready to wear your heart on your sleeve—literally!</h3>
                <p>Wear your conviction proudly and be ready to turn heads and spark change, one outfit at a time!</p>
                
                <h4>Shop a Fashion Collection and Join an Advocacy Movement</h4>
                <p><span style="color: skyblue;">Boycott Movement</span> - Shop the Oversight Collection - Hold institutions accountable for biased influence.</p>
                <p><span style="color: skyblue;">Integrity-reform Movement</span> - Shop the Traitor Collection - Hold lawmakers accountable for double-loyalty.</p>
                <p><span style="color: skyblue;">Ethic-reform Movement</span> - Shop the Trader Collection - Hold politicians accountable for insider trading.</p>
                <p><span style="color: skyblue;">Fact-check Movement</span> - Shop the Propaganda Collection - Hold the media accountable for misinformation.</p>
                
                <hr>
                
                <h2>We want to hear from you - What do you think?</h2>
                
                <h3>Notional Poll - Public Standpoint</h3>
                <p>Share your perspective and ideological stance on current issues that should prompt critical thinking.</p>
                
                <h4>Question 1</h4>
                <p>A. Answer 1</p>
                <p>B. Answer 2</p>
                <p>C. Answer 3</p>
                <p>D. Answer 4</p>
                <p>:::>>>[Submit] [Learn more]<<:::</p>
                
                <h3>Hall of Shame Poll - Political Ejection</h3>
                <p>Assert your discontent with the establishment, empower your influence, and proclaim your voice.</p>
                
                <h4>Question 1</h4>
                <p>A. Image 1</p>
                <p>B. Image 2</p>
                <p>C. Image 3</p>
                <p>D. Image 4</p>
                <p>:::>>>[Submit] [Learn more]<<:::</p>
            </div>
        </div> -->

        <div class="one_col">
            <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Welcome to Cause Stand - Where Fashion Meets Activism 
                        </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">

                            <div class="body-text">
                                <h5> <strong> Welcome to Cause Stand - Where Fashion Meets Activism</strong>
                                </h5>
                                <p>As a political fashion company, we are more than just a brand - we are a movement. As
                                    one of the leading activist clothing brand, we take
                                    pride in our commitment to social and political causes, offering a platform for
                                    individuals to express their beliefs through fashion</p>
                                <h5> <strong> Student Advocacy Apparel, Where Fashion Meets Passion </strong></h5>
                                <p>We're more than just a clothing and accessories brand—we're a community of
                                    change-makers dedicated to making a difference on college campuses
                                    across the nation.
                                    Our passion lies in crafting clothing that not only makes a statement but also
                                    sparks conversations and drive change.
                                    At Cause Stand, we redefine political fashion by blending style with substance,
                                    creating clothing that resonates with progressive values and
                                    challenges the status quo. Our collection of leftist clothing brands showcases bold
                                    designs and powerful messages, empowering wearers to
                                    proudly stand for what they believe in. </p>
                                <h5> <strong>Controversial Political Shirts by a Progressive Clothing Brand </strong>
                                </h5>
                                <p>Each piece in our collection tells a story and serves as a symbol of resistance and
                                    resilience.
                                    With our extensive range of political merch, social justice clothing, and advocacy
                                    gear, we provide a platform for your voice to be heard loud
                                    and clear. From liberal to progressive, from anarchy to activism, our collection
                                    caters to every shade of passion and belief. Our awareness
                                    shirts are not just fabric; they're statements, rallying cries for a better
                                    tomorrow.
                                    Join us in wearing your convictions proudly, as we march forward in solidarity,
                                    draped in the fabric of change.</p>
                            </div>







                            <!-- <div class="row mt-4">
                                <div class="col-lg-5 p-0">
                                    <div class="student_s">
                                        <h4>College Students Discount
                                        </h4>
                                        <p>Order trending demonstration clothing and accessories
                                        </p>
                                        <h6>UP TO 30% OFF
                                        </h6>
                                        <p>Shop tees, hoodies, bags, headwear, footwear and phone cases <br> that fit your
                                            cause.

                                        </p>
                                    </div>

                                </div>




                                <div class="col-lg-7 p-0">
                                    <div class="Adv_ocacy">
                                        <h4>Shop Advocacy Apparel for Students</h4>
                                        <div class="row">
                                            <div class="col-lg-6 p-0">
                                                <li>Shop Advocacy Tees<br>
                                                    for the Advocate Student</li>
                                                <li class="mt-3">Shop demonstration hoodies<br>
                                                    for students advocating for<br>
                                                    ethical reform and<br>
                                                    political justice</li>
                                            </div>
                                            <div class="col-lg-6 p-0 edit_ ">
                                                <select class="form-select" aria-label="Default select example">
                                                    <option selected>Stand With v
                                                    </option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                                <button>View Student Deals</button>

                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-lg-5 p-0">
                    <div class="student_s">
                        <h4>College Students Discount
                        </h4>
                        <p>Order trending demonstration clothing and accessories
                        </p>
                        <h6>UP TO 30% OFF
                        </h6>
                        <p>Shop tees, hoodies, bags, headwear, footwear and phone cases <br> that fit your
                            cause.

                        </p>
                    </div>

                </div>




                <div class="col-lg-7 p-0">
                    <div class="Adv_ocacy">
                        <h4>Shop Advocacy Apparel for Students</h4>
                        <div class="row">
                            <div class="col-lg-6 p-0">
                                <li>Shop Advocacy Tees<br>
                                    for the Advocate Student</li>
                                <li class="mt-3">Shop demonstration hoodies<br>
                                    for students advocating for<br>
                                    ethical reform and<br>
                                    political justice</li>
                            </div>
                            <div class="col-lg-6 p-0 edit_ ">
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Stand With v
                                    </option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <button>View Student Deals</button>

                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>













        <div class="one_col_2">
            <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingtwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapsetwo" aria-expanded="false" aria-controls="flush-collapsetwo">
                            Protest Clothing for the Advocate Student 
                        </button>
                    </h2>
                    <div id="flush-collapsetwo" class="accordion-collapse collapse" aria-labelledby="flush-headingtwo"
                        data-bs-parent="#accordionFlushExample">
                        <h5><strong>Protest Clothing for the Advocate Student
                            </strong></h5>
                        <p>Our mission for the advocate student is simple, to provide resources to empower college
                            students to express their beliefs and champion the causes they
                            care about, all while looking effortlessly stylish. At Cause Stand, we believe that what you
                            wear should be trending and express a powerful statement.
                            That's why we're offering a unique collection of apparel and accessories designed to inspire
                            action, ignite conversations, and promote advocacy.</p>
                        <h5> </strong> Social Justice Clothing for the Advocate College Student
                      </h5>  </h5>
                        <p>For students seeking ethical and political justice, finding the right apparel to express
                            their beliefs can be a powerful tool to advocate for ethical reform and political justice.
                            At Cause Stand, we specialize in creating clothing and accessories that resonate with the
                            passion and values of college students. From graphic advocacy
                            shirts, demonstration hoodies and ethnic scarves to fashion bags, stylish shoes and
                            awareness accessories with bold messages that
                            stand out in a crowd, our products are made with quality and humanity in mind. Plus, a
                            portion of every purchase goes directly to support non-profits and
                            initiatives that align with your core values.
                            Ready to wear your heart on your sleeve—literally!
                            Wear your conviction proudly and be ready to turn heads and spark change, one outfit at a
                            time!</p>

                        <!-- <div class="text_">
                            <h4>Shop a Fashion Collection and Join an Advocacy Movement</h4>

                            <div class="row mt-4">
                                <div class="col-lg-3 ">
                                    <div class="card_s">
                                        <button> Boycott
                                            Movement</button>
                                        <h3>Shop the
                                            Oversight Collection</h3>
                                        <p>Hold institutions accountable
                                            for biased influence. </p>

                                        <div class="p_pic">
                                            <img src="http://127.0.0.1:8000/storage/images/hjEdInOhTho7sjcTKq7TUSGLQAP47YHs8pSTb1mk.webp"
                                                alt="" class="img-fluid">

                                        </div>
                                        <a href="">Learn more</a>


                                    </div>
                                </div>
                                <div class="col-lg-3 ">
                                    <div class="card_s">
                                        <button> Boycott
                                            Movement</button>
                                        <h3>Shop the
                                            Oversight Collection</h3>
                                        <p>Hold institutions accountable
                                            for biased influence. </p>

                                        <div class="p_pic">
                                            <img src="http://127.0.0.1:8000/storage/images/hjEdInOhTho7sjcTKq7TUSGLQAP47YHs8pSTb1mk.webp"
                                                alt="" class="img-fluid">

                                        </div>
                                        <a href="">Learn more</a>


                                    </div>
                                </div>
                                <div class="col-lg-3 ">
                                    <div class="card_s">
                                        <button> Boycott
                                            Movement</button>
                                        <h3>Shop the
                                            Oversight Collection</h3>
                                        <p>Hold institutions accountable
                                            for biased influence. </p>

                                        <div class="p_pic">
                                            <img src="http://127.0.0.1:8000/storage/images/hjEdInOhTho7sjcTKq7TUSGLQAP47YHs8pSTb1mk.webp"
                                                alt="" class="img-fluid">

                                        </div>
                                        <a href="">Learn more</a>


                                    </div>
                                </div>
                                <div class="col-lg-3 ">
                                    <div class="card_s">
                                        <button> Boycott
                                            Movement</button>
                                        <h3>Shop the
                                            Oversight Collection</h3>
                                        <p>Hold institutions accountable
                                            for biased influence. </p>

                                        <div class="p_pic">
                                            <img src="http://127.0.0.1:8000/storage/images/hjEdInOhTho7sjcTKq7TUSGLQAP47YHs8pSTb1mk.webp"
                                                alt="" class="img-fluid">

                                        </div>
                                        <a href="">Learn more</a>


                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="text_2">
                            <h5>We Want to Hear from You - What do you Think?
                            </h5>
                            <p>Choose a cause and share your thoughts on today's most critical issues, from social
                                justice and <br>political biases to corrupt ethics and
                                manipulative perspectives</p>
                            <select class="form-select" aria-label="Default select example">
                                <option selected="">Stand With v
                                </option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>



                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="Question_s">
                                        <h4>Notional Poll - Public Standpoint</h4>
                                        <p>Share your perspective and ideological stance on current
                                            issues that should prompt critical thinking.</p>


                                        <h2>Question 1..........?</h2>



                                        <div class="input_s">
                                            <label class="container">A. Answer 1
                                                <input type="radio" checked="checked" name="radio">
                                                <span class="checkmark"></span>
                                            </label>
                                            <label class="container">A. Answer 2
                                                <input type="radio" name="radio">
                                                <span class="checkmark"></span>
                                            </label>
                                            <label class="container">A. Answer 3
                                                <input type="radio" name="radio">
                                                <span class="checkmark"></span>
                                            </label>
                                            <label class="container">A. Answer 4
                                                <input type="radio" name="radio">
                                                <span class="checkmark"></span>
                                            </label>

                                        </div>
                                        <div class="btn_s">
                                            <button>Submit </button>
                                            <button>Learn more</button>

                                        </div>





                                    </div>




                                </div>



                                <div class="col-lg-6">
                                    <div class="Question_2">
                                        <h4>Notional Poll - Public Standpoint Hall of Shame Poll - Political Ejection
                                        </h4>
                                        <p>Assert your discontent with the establishment, empower
                                            your influence, and proclaim your voice.</p>
                                        <h6>Question 1..........?</h6>


                                        <div class="btn_s">
                                            <button>Submit </button>
                                            <button>Learn more</button>

                                        </div>


                                    </div>

                                </div>

                            </div>




                        </div> -->

                    </div>
                </div>
            </div>
            <div class="text_">
                <h4>Shop a Fashion Collection and Join an Advocacy Movement</h4>

                <div class="row mt-4">
                    <div class="col-lg-3 ">
                        <div class="card_s">
                            <button> Boycott
                                Movement</button>
                            <h3>Shop the
                                Oversight Collection</h3>
                            <p>Hold institutions accountable
                                for biased influence. </p>

                            <div class="p_pic">
                                <img src="http://127.0.0.1:8000/storage/images/hjEdInOhTho7sjcTKq7TUSGLQAP47YHs8pSTb1mk.webp"
                                    alt="" class="img-fluid">

                            </div>
                            <a href="">Learn more</a>


                        </div>
                    </div>
                    <div class="col-lg-3 ">
                        <div class="card_s">
                            <button> Boycott
                                Movement</button>
                            <h3>Shop the
                                Oversight Collection</h3>
                            <p>Hold institutions accountable
                                for biased influence. </p>

                            <div class="p_pic">
                                <img src="http://127.0.0.1:8000/storage/images/hjEdInOhTho7sjcTKq7TUSGLQAP47YHs8pSTb1mk.webp"
                                    alt="" class="img-fluid">

                            </div>
                            <a href="">Learn more</a>


                        </div>
                    </div>
                    <div class="col-lg-3 ">
                        <div class="card_s">
                            <button> Boycott
                                Movement</button>
                            <h3>Shop the
                                Oversight Collection</h3>
                            <p>Hold institutions accountable
                                for biased influence. </p>

                            <div class="p_pic">
                                <img src="http://127.0.0.1:8000/storage/images/hjEdInOhTho7sjcTKq7TUSGLQAP47YHs8pSTb1mk.webp"
                                    alt="" class="img-fluid">

                            </div>
                            <a href="">Learn more</a>


                        </div>
                    </div>
                    <div class="col-lg-3 ">
                        <div class="card_s">
                            <button> Boycott
                                Movement</button>
                            <h3>Shop the
                                Oversight Collection</h3>
                            <p>Hold institutions accountable
                                for biased influence. </p>

                            <div class="p_pic">
                                <img src="http://127.0.0.1:8000/storage/images/hjEdInOhTho7sjcTKq7TUSGLQAP47YHs8pSTb1mk.webp"
                                    alt="" class="img-fluid">

                            </div>
                            <a href="">Learn more</a>


                        </div>
                    </div>

                </div>
            </div>
            <div class="text_2">
                <h5>We Want to Hear from You - What do you Think?
                </h5>
                <p>Choose a cause and share your thoughts on today's most critical issues, from social
                    justice and <br>political biases to corrupt ethics and
                    manipulative perspectives</p>
                <select class="form-select" aria-label="Default select example">
                    <option selected="">Stand With v
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>



                <div class="row">
                    <div class="col-lg-6">
                        <div class="Question_s">
                            <h4>Notional Poll - Public Standpoint</h4>
                            <p>Share your perspective and ideological stance on current
                                issues that should prompt critical thinking.</p>


                            <h2>Question 1..........?</h2>



                            <div class="input_s">
                                <label class="container">A. Answer 1
                                    <input type="radio" checked="checked" name="radio">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container">A. Answer 2
                                    <input type="radio" name="radio">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container">A. Answer 3
                                    <input type="radio" name="radio">
                                    <span class="checkmark"></span>
                                </label>
                                <label class="container">A. Answer 4
                                    <input type="radio" name="radio">
                                    <span class="checkmark"></span>
                                </label>

                            </div>
                            <div class="btn_s">
                                <button>Submit </button>
                                <button>Learn more</button>

                            </div>





                        </div>




                    </div>



                    <div class="col-lg-6">
                        <div class="Question_2">
                            <h4>Notional Poll - Public Standpoint Hall of Shame Poll - Political Ejection
                            </h4>
                            <p>Assert your discontent with the establishment, empower
                                your influence, and proclaim your voice.</p>
                            <h6>Question 1..........?</h6>


                            <div class="btn_s">
                                <button>Submit </button>
                                <button>Learn more</button>

                            </div>


                        </div>

                    </div>

                </div>




            </div>
        </div>










</section>




@if(count($products) > 0)
    <section class="Products">
        <div class="container">
            <h3> Apparel </h3>
            <p>Express your support for a cause and stand in the face of injustice by adding images that resonate with your
                values into your apparel. Shop to donate and make a difference.
            </p>

            <div class="row">
                @foreach($products as $product)
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="img aos-init aos-animate" data-aos="zoom-in">
                            <img src="{{fileToUrl($product->max_front_image)}}" alt="">
                            <div class="text-one" hidden>
                                <span></span>
                            </div>
                            <div class="text-two">
                                <h4>{{$product->product_type}}</h4>
                                <a class="buy_now"
                                    href="{{url('/country/product/')}}/{{strtolower($product->product_type)}}">View All</a>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>
@endif

<!-- ========== End Apparel ========== -->
<section class="Products-3 bg-img">
    <div class="container">
        <h3> Accessories </h3>
        <p>Demonstrate solidarity with a cause and oppose misinformation by accessorizing your fashion with images that
            reflect your voice. Shop to donate and effect positive change.
        </p>
        <div class="row">

            @foreach($accessories as $product)
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="img aos-init aos-animate" data-aos="zoom-in">
                        <img src="{{fileToUrl($product->max_front_image)}}" alt="">
                        <div class="text-one" style="display:none;">
                            <span></span>
                        </div>
                        <div class="text-two">
                            <h4>{{$product->product_type}}</h4>
                            <a class="buy_now"
                                href="{{url('/country/product/')}}/{{strtolower($product->product_type)}}">View All</a>
                        </div>
                    </div>
                </div>
            @endforeach

        </div>
    </div>
</section>


<!-- ========== Start Donations ========== -->
<section class="Donations">
    <div class="container">
        <h3 class="heading">Donations</h3>
        <p class="Upon">Upon incorporating an image into your purchase, a $10 contribution is donated to strengthen the
            associated
            cause.</p>
        <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-6 add-margin">
                <div class="Donations-box">
                    <h3>Donations</h3>


                    <div class="inner_text">
                        <span>How Does it Work?</span>
                        <p class="p">Customize your apparel to donate! *$10 contribution is added per image added
                        </p>
                        <p class="p">Contributions are donated instantly from the shoppers’ account *CauseStand pays the
                            fees
                        </p>
                    </div>

                </div>
            </div>

            <div class="col-lg-3 col-md-6 col-sm-6 add-margin">
                <div class="Donations-box">
                    <h3>Total</h3>

                    <div class="inner_text">
                        <p class="p">$3000
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-lg-3 col-md-6 col-sm-6 add-margin">
                <div class="Donations-box">
                    <h3>By Cause</h3>

                    <div class="inner_text">
                        <div class="algin-span">
                            <span>Israeli</span>
                            <span>$1000</span>
                        </div>

                        <div class="algin-span">
                            <span>Palestinian</span>
                            <span>$1211</span>
                        </div>



                        <div class="algin-span">
                            <span>Russiona</span>
                            <span>$591</span>
                        </div>
                        <div class="algin-span">
                            <span>Ukraine</span>
                            <span>$6000</span>
                        </div>
                        <div class="algin-span">
                            <span>Donate
                                Make a Difference </span>
                            <span>$6000</span>
                        </div>
                    </div>
                </div>


            </div>

            <div class="col-lg-3 col-md-6 col-sm-6 add-margin">


                <div class="Donations-box">
                    <h3 class="add-style">Donate
                        Make a Difference</h3>
                    <div class="inner_text">
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Choose your Cause
                            </option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- ========== End Donations ========== -->
<section class="Media">
    <div class="container">
        <h4 class="heading-two">media</h4>
        <p class="p">Explore trending media posts that shed light on current conflicts so you can support or oppose the
            narrative. Select a cause to view social posts from various media.
        </p>
        <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="add_video">
                    <iframe width="100%" height="315px"
                        src="https://www.youtube.com/embed/DK6wtYDVI-o?si=-UGlStGHhPtl8GR9" title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen></iframe>
                </div>
            </div>

            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="add_video">
                    <iframe width="100%" height="315px"
                        src="https://www.youtube.com/embed/iRYZjOuUnlU?si=vYHfsBWz3uDdmMzc" title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen></iframe>
                </div>
            </div>

            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="add_video">
                    <iframe width="100%" height="315px"
                        src="https://www.youtube.com/embed/yHz4bbgcT6c?si=WH0Z6AAez-ODuXgO" title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen></iframe>
                </div>
            </div>

            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="add_video">
                    <iframe width="100%" height="315px"
                        src="https://www.youtube.com/embed/RbtegdjvWYU?si=FViIXJp-Jw0QhS7P" title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen></iframe>
                </div>
            </div>

        </div>

    </div>
</section>












<section class="Justice">
    <div class="container">
        <h4 class="j_u">Justice</h4>
        <div class="row">
            <div class="col-md-12 col-lg-6">
                <div class="left-text">
                    <h4 class="text">Accountable to Truth</h4>
                    <p>Ensuring accountability for the aggressor demands a commitment to truth
                        and transparency. Holding those who perpetrate wrongdoing accountable is
                        necessary to peace.

                        Stand in the face of crime and advocate for justice, explore the Hall of Shame to prosecute
                        those who intentionally propagate bigoted narratives.</p>
                    <button onclick='location.href ="{{route('justice')}}";' class="Read"> Read more</button>

                </div>

            </div>

            <div class="col-md-12 col-lg-6">
                <div class="text">
                    <h5 class="Hall">Hall Of Shame
                        Advocate: Sign a List</h5>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Explore
                        and advocate for prosecution</p>
                </div>
            </div>
        </div>
    </div>

    </div>
</section>


<section class="blog">
    <div class="container">
        <h3 class="latest">General Blogs & News</h3>
        <div class="row">

            <div class="col-lg-6">
                <div class="card-one-1">
                    <h3 class="latest add">Trending Blogs:</h3>
                    <p>Join us on this journey as we navigate through the intricacies of global affairs, shedding light
                        on the why behind the what, and putting a spotlight on the injustices affecting our reality and
                        shaping our world.</p>
                    <p>Step into our General Blog, a space that offers insightful perspectives on current events and
                        conflicts. We venture beyond the headlines, we investigate the pivotal questions surrounding the
                        motivations propelling these conflicts.</p>
                </div>
            </div>


            <div class="col-lg-6">
                <div class="row">

                    @if($blogs)

                        @foreach($blogs as $blog)
                            <div class=" col-md-6">
                                <div class="card-one">
                                    <div class="img">
                                        <img src="{{$blog->feature_image}}" alt="">
                                    </div>
                                    <div class="text">
                                        <p class="mas" style="display:none;">MASONRY</p>
                                        <h3>{{$blog->title}}</h3>
                                        <p class="pp">{!! substr(strip_tags($blog->description), 0, 100) !!}...</p>
                                        <a href="blog/{{$blog->slug}}" style="text-decoration:none">
                                            Read More..
                                        </a>
                                    </div>
                                    <div class="date">
                                        <h4>{{date('d', strtotime($blog->created_at))}}</h4>
                                        <span class="mar">{{strtolower(date('M', strtotime($blog->created_at)))}}</span>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    @endif


                </div>
            </div>
        </div>

    </div>


</section>



<script>

</script>
@endsection