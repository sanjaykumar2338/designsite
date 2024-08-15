<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Blogs;
use App\Models\Collections;
use App\Models\Contacts;
use App\Models\PrintfulOrder;
use App\Models\Payment;
use App\Models\BlogReview;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;
use Illuminate\Support\Facades\Redirect;

class StudentController extends Controller
{
    public function index()
    {
        // Logic for displaying the default student deals page
        $metaDescription = 'At Cause Stand, we empower student voices with custom-designed apparel that advocates for global causes, enabling students to protest through fashion activism.';
        $keywords = 'student protest clothing, student activism apparel, advocacy clothing for students, clothing stores with student discounts, custom college apparel, college protest apparel';
        $pageTitle = 'Empowerment Clothing for Students - Wearable Learning Articles';
        $metaTitle = 'Empowerment Clothing for Students with Voices - College Protest Fashion';
        $page_content = $this->page_content('all'); 

        $background_image = url('/').'/students/students-stand-with-a-cause.png';
        
        Storage::put('coupon_code', 'commitment');
        $tag_line = 'Enabling student to, stand in solidarity, with a cause.';

        return view('frontend.student.all')->with('pageTitle' , $pageTitle)->with('metaDescription' , $metaDescription)->with('keywords' , $keywords)->with('metaTitle' , $metaTitle)->with('page_content', $page_content)->with('background_image', $background_image)->with('click_index', '')
        ->with('click_index1', '')->with('tag_line', $tag_line)->with('country','all');
    }

    public function show($country)
    {
        // Logic for displaying deals for a specific country

        Storage::put('coupon_code', 'commitment');
        if($country=='stand-with-israel'){

            $metaDescription = 'Support Israel with custom student clothing advocating for freedom and anti-terrorism. Stand with Israel in style and purpose.';
            $keywords = 'Stand with Israel apparel, Israel advocacy clothing, anti terror clothing';
            $pageTitle = 'Stand with Israel - Student Clothing to Free Land';
            $metaTitle = 'Stand with Israel Clothing - Anti Terror Brands for Freedom Fighters';
            $page_content = $this->page_content($country);
            $background_image = url('/').'/students/students-stand-with-israel.png';
            $tag_line = 'Enabling student to stand and support the people of Israel.';

            return view('frontend.student.all')
                ->with('pageTitle', $pageTitle)
                ->with('metaDescription', $metaDescription)
                ->with('keywords', $keywords)
                ->with('metaTitle', $metaTitle)
                ->with('page_content', $page_content)
                ->with('background_image', $background_image)
                ->with('click_index', 0)
                ->with('click_index1', 0)
                ->with('tag_line', $tag_line)
                ->with('country','israel');
        }

        if($country=='stand-with-palestine'){

            $metaDescription = 'Advocate for Palestine with stylish student clothing that lets you wear your support boldly; personalize your apparel to show facts and stand for accountability.';
            $keywords = 'Stand with Palestine clothing, Palestine advocacy clothing, students for Palestine, advocacy student clothing';
            $pageTitle = 'Students Stand with Palestine - Advocacy Empowered Clothing';
            $metaTitle = 'Stand with Palestine - Advocacy Clothing for Students of History';
            $page_content = $this->page_content($country);
            $background_image = url('/').'/students/students-stand-with-palestine.png';
            $tag_line = 'Enabling student to stand in solidarity with the people of Palestine.';

            return view('frontend.student.all')
                ->with('pageTitle', $pageTitle)
                ->with('metaDescription', $metaDescription)
                ->with('keywords', $keywords)
                ->with('metaTitle', $metaTitle)
                ->with('page_content', $page_content)
                ->with('background_image', $background_image)
                ->with('click_index', 0)
                ->with('click_index1', 1)
                ->with('tag_line', $tag_line)
                ->with('country','palestine');
        }

        if($country=='stand-with-russia'){

            $metaDescription = 'Express your views on Russia\'s global role with custom student apparel; advocate for dialogue and understanding through personalized clothing that speaks for peace.';
            $keywords = 'Stand with Russia Clothing, Russian advocacy apparel, student support Russia';
            $pageTitle = 'Stand with Russia - Student Voices on Urban Wear';
            $metaTitle = 'Stand with Russia Clothing - Student Advocacy College Apparel';
            $page_content = $this->page_content($country);
            $background_image = url('/').'/students/students-stand-with-russia.png';
            $tag_line = 'Elevating student fashion to express the views of the Russian people.';

            return view('frontend.student.all')
                ->with('pageTitle', $pageTitle)
                ->with('metaDescription', $metaDescription)
                ->with('keywords', $keywords)
                ->with('metaTitle', $metaTitle)
                ->with('page_content', $page_content)
                ->with('background_image', $background_image)
                ->with('click_index', 1)
                ->with('click_index1', 0)
                ->with('tag_line', $tag_line)
                ->with('country','russia');
        }

        if($country=='stand-with-ukraine'){

            $metaDescription = 'Support Ukraine\'s sovereignty with custom student apparel; advocate for democracy and freedom by wearing personalized clothing that champions a just cause.';
            $keywords = 'stand with Ukraine clothing, Ukraine advocacy apparel, support Ukraine merchandise';
            $pageTitle = 'Stand with Ukraine - Custom Fashion by Student Advocates';
            $metaTitle = 'Stand with Ukraine - Power Fashion for Students';
            $page_content = $this->page_content($country);
            $background_image = url('/').'/students/students-stand-with-ukraine.png';
            $tag_line = 'Enabling student to stand and advocate for Ukraine’s Sovereignty.';

            return view('frontend.student.all')
                ->with('pageTitle', $pageTitle)
                ->with('metaDescription', $metaDescription)
                ->with('keywords', $keywords)
                ->with('metaTitle', $metaTitle)
                ->with('page_content', $page_content)
                ->with('background_image', $background_image)
                ->with('click_index', 1)
                ->with('click_index1', 1)
                ->with('tag_line', $tag_line)
                ->with('country','ukraine');
        }
    }

    public function page_content($country){
        
        if($country == 'all'){
            return "<h3>Empowerment Clothing for Students - Wearable Learning Articles</h3>
                <p>Welcome to Cause Stand’s student empowerment hub, where activism utilizes fashion. Here, you can transform your apparel into powerful statements, advocating for crucial global causes. Our wearable articles are designed for students who need to make a difference, and want to peacefully protest, by using trendy college clothing to amplify their voices and drive change.</p>
    
                <h3>How to Receive Your Commitment Coupon as a Student</h3>
                <p>After making your first purchase with Cause Stand, you'll be prompted to create an account if you haven't already. During the account setup, navigate to your user dashboard settings and select the 'I am a student' option. Once you confirm your student status, a 30% Commitment Coupon will be automatically placed in your dashboard.</p>
    
                <p>You will also receive an email notification confirming that the coupon has been activated. This coupon can be applied to all future purchases, allowing you to continue supporting your chosen cause at a discounted rate. Your activism is important, and this coupon is our way of recognizing and supporting your commitment to making a difference. Your activism doesn’t stop at the checkout—your voice continues to be heard as you get rewarded for standing up for what you believe in.</p>
    
                <h3>When Students Advocate, The Impact is Real</h3>
                <p>Supporting a cause is more than just wearing your beliefs; it’s about making a tangible impact. For every addition you customize on your garment, $10 is directly donated to a non-profit dedicated to the cause. By personalizing your apparel, you’re not just advocating for change—you’re funding it, ensuring that your contribution reaches the communities and causes that need it most.</p>
    
                <h3>Advocate for a Cause and Protest as a Student</h3>
                <p>Advocating for a cause doesn’t have to be confrontational; it can be peaceful, creative, and impactful. Customize your clothing with messages that reflect your values, encouraging dialogue and understanding. Wear your activism with pride, and inspire others to join the conversation for justice, freedom, and democracy. Your apparel becomes a canvas for peaceful protest, fostering awareness and change without ever raising your voice.</p>
    
                <h3>Ways to Donate and Advocate for Students</h3>
                <p>1. Customize your protest wardrobe to endorse and fund a cause.<br>
                2. Shop our collections to promote changes in US political policies.</p>
    
                <h3>Powerful College Outfits for the Classroom and the Protest</h3>
                <p>At Cause Stand, we offer a range of customizable student clothing, including t-shirts, hoodies, sweatshirts. Each piece is a canvas for your message, allowing you to personalize it with graphics and text that reflect your stance on important issues. Whether you're passionate about social justice, political reform, or human rights, our platform enables you to wear your beliefs proudly and protest peacefully.</p>
    
                <h3>The Power of Student Activism and Wearable Voices</h3>
                <p>By wearing our brand of advocacy clothing, you become a part of a humanitarian movement, challenging the grassroots of the establishment and fashionably advocating for justice. Our commitment coupon provides a 30% discount, for students, on all orders after the first, encouraging ongoing engagement and support for the chosen causes.</p>
    
                <h3>Join the Community of Student Advocates Today</h3>
                <p>Stand with the people, and use your fashion to make a statement. Don't stand by, stand up and be a history maker, voice your ideology, and let your apparel be a testament to the times.</p>";
        }
    
        if($country == 'stand-with-israel'){
            return "<h3>Stand with Israel - Student Clothing to Free Land</h3>
                <p>At Cause Stand, we offer a platform for you to design and wear clothing that advocates for Israel’s right to peace and security. Our anti-terrorism clothing brand is crafted for freedom fighters who want to make their voices heard on campus and beyond.</p>
                
                <div class=\"donation-box\">
                    [Donation Box] 
                </div>
                
                <h3>Advocacy Movements for Students</h3>
                <p>1. Personalize your protest apparel to champion and contribute to a cause.</p>
                <p>2. Browse our collections to push for reforms in US political policies.</p>
                
                <h3>Express Your Support Through Personalized Student Apparel</h3>
                <p>Personalize your t-shirts, hoodies, and sweatshirts with powerful graphics, images, and text that represent your stance. By wearing our Stand with Israel collection, you join a community dedicated to advocating for justice and countering all forms of terror and oppression. Let your fashion speak volumes about your commitment to Israel’s cause.</p>
                
                <h3>Enlightened Students Advocate Through Fashion</h3>
                <p>With our commitment coupon, you receive a 30% discount on all subsequent purchases, making it easier to continuously support the cause. Every piece of clothing you wear is a step towards enlightening fellow students with evidence that brings accountability and justice to the people of Israel.</p>
                
                <h3>Shop the Israel Accountability Clothing Brand</h3>
                <p>Use your apparel to challenge misconceptions, spread awareness, and show solidarity for the people in the land of Israel. Claim the brand of hope and strength, and let your fashion make a statement for accountability, justice, and peace.</p>";
        }
    
        if($country == 'stand-with-palestine'){
            return "<h3>Students Stand with Palestine - Advocacy Empowered Clothing</h3>
                <p>Cause Stand provides a platform for you to design and wear clothing that supports Palestinian rights and calls for equality and justice. Our advocacy clothing line empowers students to make a courageous statement on behalf of the Palestinian people.</p>
                
                <div class=\"donation-box\">
                    [Donation Box] 
                </div>
                
                <h3>Protestor Clothing for Students Standing with Palestine</h3>
                <p>1. Personalize your protest fashion to support and contribute to a cause you care about.</p>
                <p>2. Discover our collections to champion changes in US political policies.</p>
                
                <h3>Powerful Student Voices Advocating for Palestine</h3>
                <p>Personalize your t-shirts, hoodies, and sweatshirts with graphics and text that highlight the Palestinian cause. Wearing a Stand-with-Palestine clothing signifies a dedication to promoting human rights and challenging injustices in the land of Palestine and all over the world. Let your fashion be a voice for the marginalized, educating and inspiring others to evaluate the evidence.</p>
                
                <h3>Student Activism for Palestine Driving Political Change</h3>
                <p>With our commitment coupon, enjoy a 30% discount on all future purchases, ensuring you can continue supporting the cause. Each piece of apparel you wear contributes to a broader effort to achieve recognition, liberty, and justice for Palestinian people.</p>
                
                <h3>Join our community of advocate Students and Stand for Palestine</h3>
                <p>Use your clothing to spread awareness, challenge oppression, and stand up for what is right. Be a force for political change and let your fashion speak out about the atrocities committed in the land of Palestine.</p>";
        }
    
        if($country == 'stand-with-russia'){
            return "<h3>Stand with Russia - Student Voices on Urban Wear</h3>
                <p>Stand with Russia and express your perspective through customized student apparel. Cause Stand offers a platform for you to design and wear clothing that advocates for a balanced view of Russia’s global role. Our advocacy apparel empowers students to engage in meaningful dialogue and promote understanding.</p>
                
                <div class=\"donation-box\">
                    [Donation Box] 
                </div>
                
                <h3>Action with Fashion by Students Standing for a Cause</h3>
                <p>1. Tailor your protest gear to support and donate to the cause you believe in.</p>
                <p>2. Explore our collections to advocate for transformation in US political policies.</p>
                
                <h3>The Fashion Tool for Education and Advocacy</h3>
                <p>Customize your college outfit with graphics and text that reflect your stance on Russia's global activities. Wearing the Stand-with-Russia branded clothing signals your commitment to fostering informed discussions and challenging stereotypes.</p>
                
                <h3>Wearable Student Activism - The Catalyst for Learning</h3>
                <p>Our commitment coupon offers a 30% discount on all future purchases, making it easier for you to continue supporting the cause. Each piece of apparel you wear contributes to a more informed conversation about Russia.</p>
                
                <h3>Join the Community of Fashionable Student Advocates</h3>
                <p>Use your clothing to promote dialogue, encourage critical thinking, and stand for a comprehensive understanding of Russia’s role in the world. Be a voice for balanced perspectives and let your fashion make a difference.</p>";
        }
    
        if($country == 'stand-with-ukraine'){
            return "<h3>Stand with Ukraine - Custom Fashion by Student Advocates</h3>
                <p>Stand with Ukraine and support its sovereignty through customized student fashion. At Cause Stand, we offer a platform for you to design and wear clothing that champions Ukraine’s fight for democracy and freedom. Our advocacy apparel empowers students to stand up for Ukraine’s right to self-determination.</p>
                
                <div class=\"donation-box\">
                    [Donation Box] 
                </div>
                
                <h3>Fashion for the Protestor Student Standing with Ukraine</h3>
                <p>1. Design your protest outfits to back and donate to a meaningful cause.</p>
                <p>2. Purchase from our collections to drive advocacy for changes in US political policies.</p>
                
                <h3>Symbols of Peace for Ukraine on Student Apparel</h3>
                <p>Personalize your t-shirts, hoodies, and sweatpants with images and text that convey your support for Ukraine. Wearing our Stand with Ukraine collection showcases your commitment to justice and freedom. Let your fashion be a symbol of solidarity and hope for a free Ukraine.</p>
                
                <h3>Make an Impact with Wearable Student Activism</h3>
                <p>Our commitment coupon provides a 30% discount on all future purchases, encouraging you to continuously support the cause. Each piece of apparel you wear is a statement of your dedication to Ukraine’s sovereignty and democratic principles.</p>
                
                <h3>Students Advocate for Peace - Wearable Advocacy Trends</h3>
                <p>Use your trendy clothing to raise awareness, inspire action, and stand with Ukraine in its pursuit of freedom and justice. Be a part of the student movement and let your fashion speak out for Ukraine’s future.</p>";
        }
    }
}