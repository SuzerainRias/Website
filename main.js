/**
 * Eastern Veil - Core JS
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
});

/**
 * Scroll Reveal Animation
 * Uses IntersectionObserver to trigger fade-up classes on elements entering the viewport
 */
function initScrollReveal() {
    const fadeElements = document.querySelectorAll('.fade-up');
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        fadeElements.forEach(el => el.classList.add('visible'));
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        // Trigger immediately if already visible
        if (element.getBoundingClientRect().top < window.innerHeight) {
             element.classList.add('visible');
        } else {
             observer.observe(element);
        }
    });
}



