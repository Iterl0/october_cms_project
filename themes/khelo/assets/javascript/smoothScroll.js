$(document).ready(function(){
    // Add smooth scrolling to all links
    $("header li").on('click', function(event) {

        var target = this.querySelector('a');

        // Make sure this.hash has a value before overriding default behavior
        if (target.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = target.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 100, function(){

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
});