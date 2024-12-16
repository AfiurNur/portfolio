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




//Typing animation
var typed = new Typed('#typing-animation', {
    strings: ['Web Developer.', 'Graphic Designer.', 'Video Editor.', 'Motion Designer.'],
    typeSpeed: 100,
    startDelay: 700,
    backSpeed: 35,
    loop: true,
});