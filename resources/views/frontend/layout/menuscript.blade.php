<script>
    $(document).ready(function() {
        $('.navbar a.dropdown-toggle').on('click', function(e) {
            $('.dropdown-menu').children().removeClass('open');

            var $el = $(this);
            var $parent = $(this).offsetParent(".dropdown-menu");
            $(this).parent("li").toggleClass('open');

            if(!$parent.parent().hasClass('nav')) {
                $el.next().css({"top": $el[0].offsetTop+20, "left": $parent.outerWidth() - 60});
            }

            $('.nav li.open').not($(this).parents("li")).removeClass("open");

            return false;
        });
    });


</script>