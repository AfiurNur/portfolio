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
var typed = new Typed('#Number', {
    strings: ['+8801777000107'],
    typeSpeed: 100,
    startDelay: 700,
    loop: false,
    showCursor: false,
});


//Typing animation
var typed = new Typed('#Gmail', {
    strings: ['afiurnur@gmail.com'],
    typeSpeed: 100,
    startDelay: 2000,
    backSpeed: 35,
    loop: false,
    showCursor: false,
});

//Typing animation
var typed = new Typed('#works', {
    strings: ['Web Developing.', 'Graphic Designing.', 'Video Editing.', 'Motion Designing.'],
    typeSpeed: 100,
    startDelay: 700,
    backSpeed: 35,
    loop: true,
});