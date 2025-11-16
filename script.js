// I-M-POSSIBLE Website JavaScript
// Mobile menu toggle and form handling

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== Mobile Menu Toggle ========== 
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navList.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
        });
    }
    
    // ========== Smooth Scroll Enhancement ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerOffset = 80; // Account for sticky header
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== Form Handling ==========
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Basic validation
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // TODO: Integrate with your email service (Mailchimp, ConvertKit, etc.)
            // For now, just show success message
            alert('Thank you for subscribing! Check your email for confirmation.');
            emailInput.value = '';
        });
    }
    
    // Contact Form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            // Basic validation
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const email = formData.get('email');
            const message = formData.get('message');
            const human = formData.get('human');
            
            if (!firstName || !lastName || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            if (!human) {
                alert('Please confirm you are not a bot.');
                return;
            }
            
            // TODO: Integrate with your email service or backend
            // For now, show success message and construct mailto link
            const subject = formData.get('subject') || 'Contact Form Submission';
            const body = `Name: ${firstName} ${lastName}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
            
            window.location.href = `mailto:jamieldn77@proton.me?subject=${encodeURIComponent(subject)}&body=${body}`;
            
            // Show confirmation
            alert('Thank you for your message! Your email client will open to send the message.');
            
            // Reset form
            this.reset();
        });
    }
    
    // ========== Utility Functions ==========
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ========== Active Navigation Highlight ==========
    
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // ========== Back to Top Button (Optional) ==========
    // Uncomment if you want a back-to-top button
    /*
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    */
    
    console.log('I-M-POSSIBLE website loaded successfully!');
});

// ========== Form Integration Notes ==========
/*
TO INTEGRATE WITH EMAIL SERVICES:

1. MAILCHIMP:
   - Replace newsletter form action with your Mailchimp form URL
   - Or use Mailchimp's JavaScript API

2. CONVERTKIT:
   - Add ConvertKit form embed code
   - Or use their API

3. FORMSPREE (Simple Solution):
   - Sign up at formspree.io
   - Change form action to: https://formspree.io/f/YOUR_FORM_ID
   - Set method="POST"

4. CUSTOM BACKEND:
   - Create a backend endpoint (Node.js, PHP, etc.)
   - Send form data via fetch() API
   - Example:
     
     fetch('/api/contact', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(formData)
     })
     .then(response => response.json())
     .then(data => {
         alert('Message sent successfully!');
     })
     .catch(error => {
         alert('Error sending message. Please try again.');
     });
*/