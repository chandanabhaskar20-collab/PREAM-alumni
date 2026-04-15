/* =========================================================================
   Presentation HSS Alumni Network - Main JS
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Navbar Scroll Effect & Smooth Scrolling --- */
    const navbar = document.querySelector('.navbar');

    // Add glass background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

    /* --- Intersection Observer for Scroll Animations --- */
    const faders = document.querySelectorAll('.fade-in-on-scroll');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    /* --- Modal Functionality --- */
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeButtons = document.querySelectorAll('[data-modal-close]');

    openModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetModalId = button.getAttribute('data-modal-target');
            const targetModal = document.querySelector(targetModalId);
            if (targetModal) {
                targetModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal-backdrop').classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close on background click
    const modals = document.querySelectorAll('.modal-backdrop');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    /* --- Form Simulations --- */
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Just simulate success
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Success!';
            btn.style.background = '#10b981'; // Green

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                form.reset();
                // Close modal if form is in one
                const modal = form.closest('.modal-backdrop');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }, 2000);
        });
    });

});
