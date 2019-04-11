var modal = document.getElementById('loginModal');

if (modal !== null) {
    // Get the button that opens the modal
    var btn = document.getElementById("loginPopupBtn");

    btn.onclick = function() {
        modal.style.display = "block";
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
