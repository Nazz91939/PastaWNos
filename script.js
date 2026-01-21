// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
});

// Menu Category Switching
document.addEventListener('DOMContentLoaded', function() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menus = {
        pasta: document.getElementById('pasta-menu'),
        extras: document.getElementById('extras-menu'),
        appetizers: document.getElementById('appetizers-menu')
    };
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all menus first
            Object.values(menus).forEach(menu => {
                if (menu) {
                    menu.classList.add('hidden');
                }
            });

            // Show appropriate menu if it exists
            const targetMenu = menus[category];
            if (targetMenu) {
                targetMenu.classList.remove('hidden');
            }
        });
    });
});

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for Fade-in Animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animation
    const fadeElements = document.querySelectorAll('.menu-card, .feature, .contact-item');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Add loading animation to menu cards
document.addEventListener('DOMContentLoaded', function() {
    const menuCards = document.querySelectorAll('.menu-card');
    
    menuCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'fadeInUp 0.6s ease forwards';
    });
});

// Add CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .menu-card {
        opacity: 0;
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(26, 26, 26, 0.98);
        backdrop-filter: blur(10px);
        padding: 1rem;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        border-top: 1px solid #333;
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    /* Hero section enhanced animations */
    .hero-visual.animate-in {
        animation: visualRevealJS 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes visualRevealJS {
        0% {
            opacity: 0;
            transform: scale(0.8) rotate(-5deg);
        }
        100% {
            opacity: 1;
            transform: scale(1) rotate(0);
        }
    }

    .hero-content.animate-in .title-word {
        animation: titleWordReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes titleWordReveal {
        from {
            opacity: 0;
            transform: translateY(40px);
            filter: blur(8px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
        }
    }
`;
document.head.appendChild(style);

// Enhanced Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    const lightRays = document.querySelector('.hero-light-rays');

    if (hero && scrolled < window.innerHeight) {
        // Subtle parallax for content
        if (heroContent) {
            const contentRate = scrolled * -0.2;
            heroContent.style.transform = `translateY(${contentRate}px)`;
            heroContent.style.opacity = Math.max(0, 1 - scrolled * 0.002);
        }

        // Parallax for visual
        if (heroVisual) {
            const visualRate = scrolled * 0.15;
            heroVisual.style.transform = `translateY(${visualRate}px)`;
        }

        // Light rays intensity
        if (lightRays) {
            const rayOpacity = Math.max(0.2, 0.4 - scrolled * 0.001);
            lightRays.style.opacity = rayOpacity;
        }
    }
});

// Staggered reveal for hero title words
document.addEventListener('DOMContentLoaded', function() {
    const titleWords = document.querySelectorAll('.title-word');
    titleWords.forEach((word, index) => {
        word.style.opacity = '0';
        word.style.transform = 'translateY(60px)';
        word.style.filter = 'blur(10px)';

        setTimeout(() => {
            word.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
            word.style.opacity = '1';
            word.style.transform = 'translateY(0)';
            word.style.filter = 'blur(0)';
        }, 400 + (index * 200));
    });
});

// Add mouse movement effect to hero section
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    const logoShowcase = document.querySelector('.logo-showcase');
    const visualRings = document.querySelectorAll('.visual-ring');
    const floatingBadges = document.querySelectorAll('.floating-badge');

    if (hero && logoShowcase) {
        hero.addEventListener('mousemove', function(e) {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const moveX = (x - centerX) / centerX * 15;
            const moveY = (y - centerY) / centerY * 15;

            // Subtle logo movement
            logoShowcase.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;

            // Rings move in opposite direction for depth
            visualRings.forEach((ring, index) => {
                const factor = (index + 1) * 0.3;
                ring.style.transform = `translate(${-moveX * factor}px, ${-moveY * factor}px) rotate(${moveX}deg)`;
            });

            // Floating badges subtle movement
            floatingBadges.forEach((badge, index) => {
                const factor = index === 0 ? 0.4 : -0.4;
                badge.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
            });
        });

        hero.addEventListener('mouseleave', function() {
            logoShowcase.style.transform = 'translate(0, 0)';
            visualRings.forEach(ring => {
                ring.style.transform = 'translate(0, 0) rotate(0deg)';
            });
            floatingBadges.forEach(badge => {
                badge.style.transform = 'translate(0, 0)';
            });
        });
    }
});

// Add scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe hero elements for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const heroElements = document.querySelectorAll('.hero-content, .hero-visual');
    heroElements.forEach(el => {
        scrollObserver.observe(el);
    });
});

// Add hover effects to menu cards
document.addEventListener('DOMContentLoaded', function() {
    const menuCards = document.querySelectorAll('.menu-card');
    
    menuCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Contact form validation (if you add a form later)
function validateContactForm(form) {
    const email = form.querySelector('input[type="email"]');
    const phone = form.querySelector('input[type="tel"]');
    
    if (email && !isValidEmail(email.value)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (phone && !isValidPhone(phone.value)) {
        alert('Please enter a valid phone number');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Add scroll-to-top functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #d4af37;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});
