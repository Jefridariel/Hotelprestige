document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       CUSTOM CURSOR
       ========================================================= */
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    
    document.addEventListener('mousemove', (e) => {
        // Move dot instantly
        dot.style.top = e.clientY + 'px';
        dot.style.left = e.clientX + 'px';
        
        // Move outline with a slight delay using GSAP if available
        if (typeof gsap !== 'undefined') {
            gsap.to(outline, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15,
                ease: 'power2.out'
            });
        }
    });

    // Hover effects for cursor
    const hoverElements = document.querySelectorAll('a, button, .service-row, .magnetic-element');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });

    /* =========================================================
       MAGNETIC ELEMENTS (Buttons, Nav items)
       ========================================================= */
    const magneticElements = document.querySelectorAll('.magnetic-element');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const strength = el.getAttribute('data-strength') || 20;
            
            // Calculate distance to center
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * strength;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * strength;
            
            gsap.to(el, {
                x: x,
                y: y,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    /* =========================================================
       NAVBAR SCROLL
       ========================================================= */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =========================================================
       GSAP ANIMATIONS & SCROLLTRIGGER
       ========================================================= */
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // 1. Hero 3D Title Parallax Mouse Move
        const heroTitle = document.querySelectorAll('.hero-title');
        const hero = document.querySelector('.hero');
        
        hero.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            gsap.to(heroTitle, {
                rotationY: xAxis,
                rotationX: yAxis,
                duration: 1,
                ease: 'power2.out'
            });
        });
        
        // Reset 3d transform on leave
        hero.addEventListener('mouseleave', () => {
            gsap.to(heroTitle, {
                rotationY: 0,
                rotationX: 0,
                duration: 1,
                ease: 'power2.out'
            });
        });

        // 2. Initial Page Load Animations
        const tlLoad = gsap.timeline();
        
        tlLoad.fromTo('.hero-badge', 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        )
        .fromTo('.hero-title', 
            { y: 100, opacity: 0, rotationX: 20 },
            { y: 0, opacity: 1, rotationX: 0, duration: 1, stagger: 0.1, ease: 'power4.out' }, "-=0.4"
        )
        .fromTo('.hero-subtitle', 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, "-=0.6"
        )
        .fromTo('.hero-actions', 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, "-=0.6"
        );

        // 3. Scroll Reveal Elements
        const revealElements = document.querySelectorAll('.reveal-up');
        
        revealElements.forEach(el => {
            gsap.fromTo(el, 
                { y: 60, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out"
                }
            );
        });

        // 4. Image Parallax Elements
        const parallaxElements = document.querySelectorAll('.parallax-element');
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-speed') || 1;
            gsap.to(el, {
                scrollTrigger: {
                    trigger: el.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                },
                y: 100 * speed,
                ease: "none"
            });
        });

        // 5. Hero Background Parallax
        gsap.to('.hero-bg', {
            scrollTrigger: {
                trigger: '.hero',
                start: "top top",
                end: "bottom top",
                scrub: true
            },
            y: "30%",
            ease: "none"
        });
    }

    /* =========================================================
       FAQ ACCORDION
       ========================================================= */
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    /* =========================================================
       MOBILE MENU TOGGLE
       ========================================================= */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate hamburger if needed (here we just toggle class)
            mobileToggle.classList.toggle('is-active');
        });
    }

    // Close menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('is-active');
        });
    });

    /* =========================================================
       RE-APPLY CURSOR HOVER
       ========================================================= */
    const updateCursorHover = () => {
        const interactive = document.querySelectorAll('a, button, .service-row, .magnetic-element, .faq-question, .menu-card, .process-step');
        interactive.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    };
    updateCursorHover();
});
