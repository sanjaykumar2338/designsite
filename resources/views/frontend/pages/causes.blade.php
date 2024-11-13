@extends('frontend.layout.homepagelayout')

@section('content')
<section class="Stand">
        <div class="container">
            <h2>From Activism to Enlightenment - A Change by Fashion</h2>
            <p>At Cause Stand, we harness the power of fashion to advocate for justice and stand against corruption. Our advocacy apparel not only highlights critical global issues but also shines a spotlight on deceitful and manipulative politicians. From supporting oppressed communities to demanding transparency and integrity, our collections are designed to empower you to make a difference. Explore our causes, wear your convictions, and join us in the fight for truth and justice.</p>
        </div>
    </section>



    <!-- ========== Start Shop-and-Donate ========== -->
    <section class="donate">
        <div class="container">
            <div class="row">
                <div class="col-md-6 ">
                    <div class="box-text">
                        <h4>Stand with israel</h4>
                        <p>Hamas brutally carried out an unprecedented terrorist attack on the Jewish state of Israel. Pro-Israel advocates around the world are fighting Antisemitism and supporting Israel.</p>
                        <button onclick="redirectTo('{{ url('/stand-with-israel/shop/men/shirts/stand-with-israel-shirt---advocate-for-peace') }}')" class="shop"> shop and donate</button>
                    </div>
                </div>

                <div class="col-md-6 ">
                    <div class="box-text">
                        <h4>Stand with Palestine</h4>
                        <p>Stand up for the rights of an oppressed people. Palestinians have been forcibly displaced from their territories by Israel.</p>
                        <button onclick="redirectTo('{{ url('/stand-with-palestine/shop/men/shirts/stand-with-palestine-shirt---advocate-for-justice') }}')" class="shop"> shop and donate</button>
                    </div>
                </div>

                <div class="col-md-6 ">
                    <div class="box-text">
                        <h4>Stand with Russia</h4>
                        <p>Russia has deep cultural, economic, and political bonds with Ukraine. The Russian Federation invaded and annexed Ukrainian territories under the pretense of denazification, seeking to keep Ukraine neutral and prevent it from joining the European Union.</p>
                        <button onclick="redirectTo('{{ url('/stand-with-russia/shop/men/shirts/stand-with-russia-shirt---wear-your-beliefs') }}')" class="shop"> shop and donate</button>
                    </div>
                </div>

                <div class="col-md-6 ">
                    <div class="box-text">
                        <h4>Stand with Ukraine</h4>
                        <p>After the collapse of the Soviet Union, Ukraine declared full independence on August 24, 1991. Russia annexed Crimea and supported pro-Russian separatists fighting the Ukrainian military. Ukraine continues to fight for its independence.</p>
                        <button onclick="redirectTo('{{ url('/stand-with-ukraine/shop/men/shirts/stand-with-ukraine-t-shirt---defend-sovereignty') }}')" class="shop"> shop and donate</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="container" style="">
        <div class="text">
            <h3>Empower Change with Advocacy Apparel</h3>
            <p>Stand with Cause Stand and make a bold statement against corruption and injustice. By choosing our advocacy apparel, you are not just wearing clothes; you are advocating for transparency, exposing deceit, and supporting those who fight for their rights. Personalize your apparel platform and shop our collections today, donate to impactful causes, and let your fashion be a beacon of integrity and activism. Together, we can challenge corruption and create a more just and equitable world.</p>
            <p>Stand with global causes - Your support matters!</p>
        </div>
    </div>

    <script>
        function redirectTo(url) {
            window.location.href = url;
        }
    </script>
@endsection