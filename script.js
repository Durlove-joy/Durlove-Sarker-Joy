// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const closeMenu = document.querySelector('.close-menu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    menuToggle.classList.toggle('open');
});

// Close button functionality
closeMenu.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuToggle.classList.remove('open');
});

// Header text change on scroll
const welcomeText = document.querySelector('.welcome-text');
let isScrolled = false;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 100 && !isScrolled) {
        isScrolled = true;
        welcomeText.style.opacity = '0';
        
        setTimeout(() => {
            welcomeText.textContent = 'Durlove Sarker Joy';
            welcomeText.style.opacity = '1';
            welcomeText.classList.add('scrolled');
        }, 200);
    } else if (scrollY <= 100 && isScrolled) {
        isScrolled = false;
        welcomeText.style.opacity = '0';
        
        setTimeout(() => {
            welcomeText.textContent = 'Welcome';
            welcomeText.style.opacity = '1';
            welcomeText.classList.remove('scrolled');
        }, 200);
    }
});

// Dynamic Pulse Rate System - Much slower heartbeat line
const pulseContainer = document.querySelector('.pulse-container');
const heartbeatPath = document.querySelector('.heartbeat-path');

let startTime = Date.now();
let currentBPM = 30; // Starting much slower BPM
const maxBPM = 50; // Maximum BPM (very slow)
const accelerationTime = 120000; // 120 seconds to reach max BPM (very slow progression)

function updatePulseRate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / accelerationTime, 1);
    
    // Calculate current BPM with very gradual acceleration
    currentBPM = 30 + (maxBPM - 30) * Math.pow(progress, 0.5);
    
    // Convert BPM to animation duration in milliseconds (much slower baseline)
    const animationDuration = (60 / currentBPM) * 3000; // Tripled duration for much slower effect
    
    // Update heartbeat line animation
    if (heartbeatPath) {
        heartbeatPath.style.animationDuration = animationDuration + 'ms';
        
        // Gradually increase line thickness and glow
        const intensity = progress;
        const strokeWidth = 4 + (intensity * 2); // From 4 to 6
        heartbeatPath.style.strokeWidth = strokeWidth;
        heartbeatPath.style.filter = `drop-shadow(0 0 ${8 + intensity * 6}px #ff4444)`;
        
        // Slightly intensify color
        if (intensity > 0.5) {
            heartbeatPath.style.stroke = intensity > 0.8 ? '#ff2222' : '#ff3333';
        }
    }
    
    // Update every 300ms for smooth transitions
    if (progress < 1) {
        setTimeout(updatePulseRate, 300);
    }
}

// Start the pulse rate acceleration when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        updatePulseRate();
    }, 1000); // Start after 1 second
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('open');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typing animation for hero subtitle
const typingText = document.querySelector('.typing-text');
const words = ['Entrepreneur', 'Cybersecurity Professional', 'Peace Advocate', 'Technology Enthusiast', 'Digital Rights Activist'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => isDeleting = true, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, typingSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .about-content, .contact-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    alert('Thank you for your message! I\'ll get back to you soon.');
    contactForm.reset();
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.type === 'submit') {
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
            }, 2000);
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Skills animation on scroll
const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        }
    });
}, { threshold: 0.5 });

skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px) scale(0.9)';
    item.style.transition = 'all 0.5s ease';
    skillObserver.observe(item);
});

// Project cards hover effect enhancement
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add scroll-to-top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #6c63ff;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    font-size: 1.2rem;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add CSS for active nav links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #64ffda !important;
        text-shadow: 0 0 10px rgba(100, 255, 218, 0.5) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
        background: #64ffda !important;
        box-shadow: 0 0 10px rgba(100, 255, 218, 0.5) !important;
    }
    .scroll-top-btn:hover {
        background: #64ffda !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 0 20px rgba(100, 255, 218, 0.5) !important;
    }
`;
document.head.appendChild(style);

// Night Sky Effects - Shooting Stars
function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    
    // Random starting position
    shootingStar.style.left = Math.random() * 100 + '%';
    shootingStar.style.top = Math.random() * 50 + '%';
    
    // Random animation duration
    shootingStar.style.animationDuration = (Math.random() * 3 + 2) + 's';
    
    document.body.appendChild(shootingStar);
    
    // Remove after animation
    setTimeout(() => {
        if (shootingStar.parentNode) {
            shootingStar.parentNode.removeChild(shootingStar);
        }
    }, 5000);
}

// Create shooting stars periodically
setInterval(createShootingStar, 3000);

// Create floating particles for space effect
function createSpaceParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = Math.random() * 3 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = `rgba(${Math.random() > 0.5 ? '100, 255, 218' : '167, 139, 250'}, ${Math.random() * 0.5 + 0.3})`;
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '100%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '-1';
    particle.style.animation = `floatUp ${Math.random() * 20 + 10}s linear infinite`;
    
    document.body.appendChild(particle);
    
    // Remove after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 30000);
}

// Add floating particle animation to CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Create particles periodically
setInterval(createSpaceParticle, 2000);

// Initialize night sky on page load
document.addEventListener('DOMContentLoaded', function() {
    // Create initial shooting stars
    for (let i = 0; i < 3; i++) {
        setTimeout(createShootingStar, i * 1000);
    }
    
    // Create initial particles
    for (let i = 0; i < 10; i++) {
        setTimeout(createSpaceParticle, i * 200);
    }
});