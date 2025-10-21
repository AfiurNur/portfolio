// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Three.js Scene Setup
let scene, camera, renderer, particles, particleSystem;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function initThreeJS() {
    // Scene
    scene = new THREE.Scene();
    
    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 500;
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimize performance
    document.getElementById('three-container').appendChild(renderer.domElement);
    
    // Create particles with optimized count
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800; // Reduced for better performance
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    // Color palette based on new theme
    const colors = [
        new THREE.Color(0x6C63FF), // --color-accent
        new THREE.Color(0x8A84FF), // --color-accent-light
        new THREE.Color(0x0A0B1D), // --color-primary
        new THREE.Color(0x1A1B38), // --color-secondary
        new THREE.Color(0xB8B8D0)  // --color-text-secondary
    ];
    
    for(let i = 0; i < particlesCount * 3; i += 3) {
        // Position particles in a sphere with better distribution
        const radius = Math.random() * 800 + 200;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i + 2] = radius * Math.cos(phi);
        
        // Assign random colors from palette
        const color = colors[Math.floor(Math.random() * colors.length)];
        colorArray[i] = color.r;
        colorArray[i + 1] = color.g;
        colorArray[i + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    // Particle material with optimized settings
    const particlesMaterial = new THREE.PointsMaterial({
        size: 6,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });
    
    // Particle system
    particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Mouse move listener for parallax effect
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Start animation
    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.0005;
    mouseY = (event.clientY - windowHalfY) * 0.0005;
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate particle system smoothly
    particleSystem.rotation.x += 0.001;
    particleSystem.rotation.y += 0.002;
    
    // Add subtle parallax effect based on mouse position
    particleSystem.rotation.x += mouseY * 0.3;
    particleSystem.rotation.y += mouseX * 0.3;
    
    // Animate particles for floating effect - optimized performance
    const positions = particleSystem.geometry.attributes.position.array;
    const time = Date.now() * 0.0005;
    
    for (let i = 0; i < positions.length; i += 9) { // Process every 3rd particle for performance
        positions[i] += Math.sin(time + positions[i] * 0.01) * 0.2;
        positions[i + 1] += Math.cos(time + positions[i + 1] * 0.01) * 0.2;
    }
    
    particleSystem.geometry.attributes.position.needsUpdate = true;
    
    renderer.render(scene, camera);
}

// Initialize Three.js when page loads
window.addEventListener('load', initThreeJS);

// Smooth scrolling with GSAP
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            gsap.to(window, {
                duration: 1.2,
                scrollTo: {
                    y: targetElement,
                    offsetY: 70
                },
                ease: "power2.inOut"
            });
        }
    });
});

// Navigation scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Hero section animations
const heroTl = gsap.timeline();
heroTl
    .from('.text-reveal h1', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    })
    .from('.text-reveal h2', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    }, "-=0.8")
    .from('.text-reveal p', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=0.5")
    .from('.cta-buttons', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=0.3");

// About section animations
gsap.from('.about-text', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    x: -100,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out"
});

gsap.from('.visual-card', {
    scrollTrigger: {
        trigger: '.about-visual',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out"
});

// Skills section animations
gsap.from('.skill-category', {
    scrollTrigger: {
        trigger: '.skills',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1.2,
    stagger: 0.3,
    ease: "power2.out"
});

// Animate skill bars when in view
const skillBars = document.querySelectorAll('.skill-progress');
skillBars.forEach(bar => {
    gsap.to(bar, {
        scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        width: bar.getAttribute('data-width') + '%',
        duration: 2,
        ease: "power2.out"
    });
});

// Projects section animations
gsap.from('.project-card', {
    scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    y: 80,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power2.out"
});

// Contact section animations
gsap.from('.contact-info', {
    scrollTrigger: {
        trigger: '.contact-container',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    x: -80,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out"
});

gsap.from('.contact-form', {
    scrollTrigger: {
        trigger: '.contact-container',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    x: 80,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out"
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple form validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (name && email && subject && message) {
        // Create a success animation
        const submitBtn = this.querySelector('.btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = '#4CAF50';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            this.reset();
        }, 3000);
    } else {
        alert('Please fill in all fields.');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            gsap.to(navLinks, {
                height: 'auto',
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            });
            
            // Animate hamburger to X
            gsap.to(this.querySelector('span:nth-child(1)'), {
                rotation: 45,
                y: 8,
                duration: 0.3
            });
            gsap.to(this.querySelector('span:nth-child(2)'), {
                opacity: 0,
                duration: 0.3
            });
            gsap.to(this.querySelector('span:nth-child(3)'), {
                rotation: -45,
                y: -8,
                duration: 0.3
            });
        } else {
            gsap.to(navLinks, {
                height: 0,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            });
            
            // Animate X back to hamburger
            gsap.to(this.querySelectorAll('span'), {
                rotation: 0,
                y: 0,
                opacity: 1,
                duration: 0.3
            });
        }
    });
}

// Text animation on scroll
gsap.utils.toArray('.text-reveal').forEach(text => {
    gsap.from(text, {
        scrollTrigger: {
            trigger: text,
            start: 'top 90%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
});

// Add floating animation to all cards
gsap.utils.toArray('.visual-card, .project-card, .highlight-item').forEach(card => {
    gsap.to(card, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
});

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--color-accent);
    z-index: 1001;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Performance optimization: Use transform and opacity for animations :cite[3]
// This ensures animations run on the compositor thread for better performance