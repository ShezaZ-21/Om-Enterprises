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

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Button click animations
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

// Add scroll animation for elements
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

// Observe all cards and sections
document.querySelectorAll('.feature-card, .service-card, .product-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Contact form submission to WhatsApp
// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {


contactForm.addEventListener('submit', async function (e) {

    e.preventDefault();

    // Prevent double submission
    const submitBtn = this.querySelector('button[type="submit"]');
    if (submitBtn.disabled) return;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const formData = new FormData(this);

    try {

        // Send data to PHP backend
        const response = await fetch('backend/contact-form.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        // Show backend response
        alert(result.message);

        // If database save successful
        if (result.success) {

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            // Create WhatsApp message
            const whatsappMessage =
                `*New Inquiry from Website*%0A%0A` +
                `*Name:* ${name}%0A` +
                `*Email:* ${email}%0A` +
                `*Service:* ${service}%0A` +
                `*Message:* ${message}%0A%0A` +
                `_Sent from OM Enterprises Website_`;

            // WhatsApp number
            const whatsappNumber = '917066181875';

            // Open WhatsApp
            const whatsappUrl =
                `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

            window.open(whatsappUrl, '_blank');

            // Reset form
            this.reset();
        }

    } catch (error) {

        console.error(error);

        alert('Something went wrong.');

    } finally {

        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';

    }

});


}
