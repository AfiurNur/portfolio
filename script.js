
// Initialize Three.js background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#three-canvas'),
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x0A0A14, 1);

// Create starfield
const starGeometry = new THREE.BufferGeometry();
const starCount = 5000;
const posArray = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 2000;
}

starGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.7,
    transparent: true,
    opacity: 0.8
});
const starMesh = new THREE.Points(starGeometry, starMaterial);
scene.add(starMesh);

// Animate stars
function animateStars() {
    requestAnimationFrame(animateStars);
    starMesh.rotation.y += 0.0002;
    starMesh.rotation.x += 0.0001;
    renderer.render(scene, camera);
}
animateStars();

// Mobile menu functionality
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = notification.querySelector('.notification-text');

    notificationText.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.width = `${width}%`;
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(bar);
    });
}

// Custom cursor
function setupCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Add hover effects
    document.querySelectorAll('a, button, .project-card, .contact-method, .skill-category').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.2)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// Enhanced email system
function setupEmailSystem() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Create mailto link with pre-filled information
        const subject = `Message from ${name} - Portfolio Contact`;
        const body = `Hello Afiur,%0D%0A%0D%0AMy name is ${name} and I'm reaching out from your portfolio website.%0D%0A%0D%0A${message}%0D%0A%0D%0AYou can reach me at: ${email}%0D%0A%0D%0ABest regards,%0D%0A${name}`;

        // Create a more sophisticated mailto link
        const mailtoLink = `mailto:afiurnur@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

        // Show sending animation
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Open email client after a short delay for better UX
        setTimeout(() => {
            window.location.href = mailtoLink;

            // Reset button after a moment
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                // Show success message
                showNotification('Email client opened! Please send your message.');

                // Reset form
                contactForm.reset();
            }, 1000);
        }, 1500);
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function () {
    setupMobileMenu();
    setupCustomCursor();
    setupEmailSystem();

    // GSAP Text Animations
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Hero section animations
    gsap.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    });

    gsap.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out"
    });

    gsap.to('.cta-buttons', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.6,
        ease: "power2.out"
    });

    // Section title animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Section subtitle animations
    gsap.utils.toArray('.section-subtitle').forEach(subtitle => {
        gsap.fromTo(subtitle, {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: subtitle,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Project card animations
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Skill category animations
    gsap.utils.toArray('.skill-category').forEach((category, i) => {
        gsap.fromTo(category, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: category,
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Contact method animations
    gsap.utils.toArray('.contact-method').forEach((method, i) => {
        gsap.fromTo(method, {
            opacity: 0,
            x: -50
        }, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: i * 0.2,
            scrollTrigger: {
                trigger: method,
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Contact form animation
    gsap.fromTo('.contact-form-container', {
        opacity: 0,
        x: 50
    }, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.contact-form-container',
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });

    // Email copy functionality
    document.getElementById('email-copy').addEventListener('click', function () {
        const email = 'afiurnur@gmail.com';
        navigator.clipboard.writeText(email).then(() => {
            showNotification('Email copied to clipboard!');
        });
    });

    // GitHub link
    document.getElementById('github-link').addEventListener('click', function () {
        showNotification('Redirecting to GitHub...');
        setTimeout(() => {
            window.open('https://github.com/afiurnur', '_blank');
        }, 1000);
    });

    // LinkedIn link
    document.getElementById('linkedin-link').addEventListener('click', function () {
        showNotification('Redirecting to LinkedIn...');
        setTimeout(() => {
            window.open('https://linkedin.com/in/afiur-nur', '_blank');
        }, 1000);
    });

    // Trigger animations on page load
    animateSkillBars();

    // Handle window resize for Three.js
    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const mobileMenuBtn = document.getElementById('mobile-menu-btn');
                const navLinks = document.querySelector('.nav-links');
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';

                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active navigation link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        let currentSection = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
});