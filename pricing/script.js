//animation for the text and images
//animation parameters are set within the html tags
AOS.init({ offset: 0 });


// Home and Cancel Button for smaller screens..
function hamburg() {
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(0px)"
}

function cancel() {
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(-400px)"
}
