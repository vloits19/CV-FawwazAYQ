// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Adjust for navbar height

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');

            // Close mobile navbar after clicking
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');

            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.pageYOffset;
    const navbar = document.querySelector('.navbar');

    // Add scrolled class to navbar
    if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Show/hide scroll to top button
    const scrollToTop = document.getElementById('scrollToTop');
    if (scrollPosition > 300) {
        scrollToTop.classList.add('visible');
    } else {
        scrollToTop.classList.remove('visible');
    }

    // Update scroll progress bar
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollPercent = (scrollPosition / (docHeight - winHeight)) * 100;
    const scrollProgress = document.getElementById('myScrollBar');
    if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
    }

    // Animate elements on scroll
    animateOnScroll();
});

// Scroll to top functionality
document.getElementById('scrollToTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved theme preference or respect OS preference
if (localStorage.getItem('theme') === 'light' ||
    (window.matchMedia('(prefers-color-scheme: light)').matches && !localStorage.getItem('theme'))) {
    body.classList.add('light-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener('click', function() {
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

// Image gallery modal functionality
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');

const portfolioModal = document.getElementById('portfolioModal');
const portfolioModalImage = document.getElementById('portfolioModalImage');
const portfolioModalClose = document.getElementById('portfolioModalClose');
const prevButton = document.getElementById('prevImage');
const nextButton = document.getElementById('nextImage');

// Enhanced gallery functionality
let currentImageIndex = 0;
let portfolioImages = [];

function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    portfolioImages = [];

    // Collect all portfolio images
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        portfolioImages.push({
            src: img.getAttribute('data-full') || img.src,
            alt: img.alt,
            element: item
        });

        // Add click event to each gallery item
        item.addEventListener('click', () => {
            openPortfolioModal(index);
        });
    });

    return portfolioImages;
}

// Open portfolio modal
function openPortfolioModal(index) {
    currentImageIndex = index;

    portfolioModalImage.src = portfolioImages[index].src;
    portfolioModalImage.alt = portfolioImages[index].alt;
    portfolioModal.classList.add('active');

    document.body.style.overflow = 'hidden';
}

// Open profile modal
function openProfileModal() {
    modalImage.src = document.getElementById('profileImage').src;
    modalImage.alt = document.getElementById('profileImage').alt;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    portfolioModal.classList.remove('active');
    document.body.style.overflow = ''; // Enable scrolling
}

// Navigate to next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % portfolioImages.length;
    portfolioModalImage.src = portfolioImages[currentImageIndex].src;
    portfolioModalImage.alt = portfolioImages[currentImageIndex].alt;
}

// Navigate to previous image
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + portfolioImages.length) % portfolioImages.length;
    portfolioModalImage.src = portfolioImages[currentImageIndex].src;
    portfolioModalImage.alt = portfolioImages[currentImageIndex].alt;
}

// Initialize image gallery
initGallery();

// Add event listeners for image gallery
document.getElementById('profileImage').addEventListener('click', openProfileModal);

modalClose.addEventListener('click', closeModal);
portfolioModalClose.addEventListener('click', closeModal);
prevButton.addEventListener('click', prevImage);
nextButton.addEventListener('click', nextImage);

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

portfolioModal.addEventListener('click', (e) => {
    if (e.target === portfolioModal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modal.classList.contains('active') || portfolioModal.classList.contains('active')) {
            closeModal();
        }
    }

    // Navigate with arrow keys (only for portfolio modal)
    if (portfolioModal.classList.contains('active')) {
        if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    }
});

// Animate elements on scroll
function animateOnScroll() {
    const experienceItems = document.querySelectorAll('.experience-item');
    const homeContent = document.querySelector('.home-content');
    const progressBars = document.querySelectorAll('.progress-bar');
    const windowHeight = window.innerHeight;

    // Animate home content
    if (homeContent && homeContent.getBoundingClientRect().top < windowHeight * 0.75) {
        homeContent.classList.add('visible');
    }

    // Animate experience items
    experienceItems.forEach(item => {
        if (item.getBoundingClientRect().top < windowHeight * 0.75) {
            item.classList.add('visible');
        }
    });

    // Animate progress bars
    progressBars.forEach(bar => {
        const barContainer = bar.parentElement;
        if (barContainer.getBoundingClientRect().top < windowHeight * 0.85 && !bar.hasAttribute('data-animated')) {
            const targetWidth = bar.getAttribute('data-width') || bar.style.width;
            bar.setAttribute('data-width', targetWidth);
            bar.style.width = '0';

            // Use requestAnimationFrame for smoother animation
            let start = null;
            const duration = 1500; // 1.5 seconds

            function animateProgress(timestamp) {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                bar.style.width = progress * parseInt(targetWidth) + '%';

                if (progress < 1) {
                    requestAnimationFrame(animateProgress);
                } else {
                    bar.setAttribute('data-animated', 'true');
                }
            }

            requestAnimationFrame(animateProgress);
        }
    });
}

// Typewriter effect for name
function initTypewriter() {
    const textPart1 = "Fawwaz Anggita Yumna";
    const textPart2 = "Qotrunnada";
    const typingElement1 = document.getElementById('typing-text-1');
    const typingElement2 = document.getElementById('typing-text-2');

    let i = 0;
    const speed = 100;
    const delayBetweenParts = 500; // delay antara bagian pertama dan kedua

    function typeWriterPart1() {
        if (i < textPart1.length) {
            typingElement1.innerHTML += textPart1.charAt(i);
            i++;
            setTimeout(typeWriterPart1, speed);
        } else {
            // Setelah bagian pertama selesai, mulai bagian kedua setelah delay
            i = 0;
            setTimeout(typeWriterPart2, delayBetweenParts);
        }
    }

    function typeWriterPart2() {
        if (i < textPart2.length) {
            typingElement2.innerHTML += textPart2.charAt(i);
            i++;
            setTimeout(typeWriterPart2, speed);
        }
    }

    // Start typing after a short delay
    setTimeout(typeWriterPart1, 1000);
}

// Initialize animations on page load
window.addEventListener('load', () => {
    // Set initial width for progress bars and store it
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const width = bar.style.width;
        bar.setAttribute('data-width', width);
        bar.style.width = '0';
    });

    // Animate elements that are already in view
    setTimeout(animateOnScroll, 100);

    // Initialize typewriter effect
    initTypewriter();

    // Initialize particles
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#64ffda" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#64ffda",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
});

// Download CV button functionality
document.getElementById('downloadCV').addEventListener('click', function(e) {
    e.preventDefault();

    // Show a message since we don't have an actual file
    alert('Dalam implementasi nyata, ini akan mengunduh CV PDF. Untuk saat ini, silakan hubungi saya melalui email untuk mendapatkan CV lengkap.');
});

// Form validation for contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        showFormMessage('Harap isi semua field yang diperlukan.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showFormMessage('Harap masukkan alamat email yang valid.', 'error');
        return;
    }

    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';

    // Kirim form menggunakan Formspree
    const formData = new FormData(this);

    fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showFormMessage('Pesan berhasil dikirim! Saya akan membalasnya secepatnya.', 'success');
                document.getElementById('contactForm').reset();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch(error => {
            showFormMessage('Terjadi kesalahan. Silakan coba lagi atau hubungi saya langsung di fawwazayq@gmail.com', 'error');
        })
        .finally(() => {
            // Reset button state
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
        });
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = message;
    messageDiv.className = `mt-3 alert alert-${type}`;
    messageDiv.style.display = 'block';

    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Handle image loading errors
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'https://placehold.co/200x200/64ffda/0a192f?text=Image+Not+Found';
        this.alt = 'Gambar tidak ditemukan';
    });
});
