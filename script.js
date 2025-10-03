// Ensure dark mode is active by default
document.addEventListener('DOMContentLoaded', function() {
    // Remove any light-mode class if present and ensure dark mode
    document.body.classList.remove('light-mode');
    // Store preference for dark mode
    localStorage.setItem('theme', 'dark');
});

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
    const skillCards = document.querySelectorAll('.skill-card');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const contactElements = document.querySelectorAll('.contact-info, .contact-form');
    const socialLinks = document.querySelectorAll('.social-link');
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

    // Animate skill cards
    skillCards.forEach((card, index) => {
        if (card.getBoundingClientRect().top < windowHeight * 0.85) {
            setTimeout(() => {
                card.classList.add('animated', 'fadeInUp');
            }, index * 100); // Delay each animation
        }
    });

    // Animate portfolio items
    portfolioItems.forEach((item, index) => {
        if (item.getBoundingClientRect().top < windowHeight * 0.85) {
            setTimeout(() => {
                item.classList.add('animated', 'fadeIn');
            }, index * 150); // Delay each animation
        }
    });

    // Animate contact elements
    contactElements.forEach((el, index) => {
        if (el.getBoundingClientRect().top < windowHeight * 0.85) {
            setTimeout(() => {
                el.classList.add('animated', 'fadeInUp');
            }, index * 200);
        }
    });

    // Animate social links
    socialLinks.forEach((link, index) => {
        if (link.getBoundingClientRect().top < windowHeight * 0.85) {
            setTimeout(() => {
                link.classList.add('animated', 'bounceIn');
            }, index * 100);
        }
    });

    // Animate progress bars
    progressBars.forEach(bar => {
        const barContainer = bar.parentElement;
        if (barContainer.getBoundingClientRect().top < windowHeight * 0.85 && !bar.hasAttribute('data-animated')) {
            const targetWidth = bar.getAttribute('data-width') || bar.style.width;
            bar.setAttribute('data-width', targetWidth);
            bar.style.width = '0';

            // Add animated class for CSS animation
            bar.classList.add('animated');

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
                    bar.classList.remove('animated');
                }
            }

            requestAnimationFrame(animateProgress);
        }
    });
}

// Typewriter effect for name and description
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

    // Efek ketik untuk deskripsi
    const descriptionText = "Saya seorang siswa SMK jurusan Pengembangan Perangkat Lunak dan Gim yang bersemangat dalam dunia pengembangan game. Saat ini sedang mempelajari berbagai aspek pembuatan game sambil mengerjakan proyek-proyek kecil untuk mengasah kemampuan.";
    const descriptionElement = document.querySelector('.description');
    let j = 0;

    function typeWriterDescription() {
        if (j < descriptionText.length) {
            descriptionElement.innerHTML += descriptionText.charAt(j);
            j++;
            setTimeout(typeWriterDescription, 30);
        }
    }

    // Mulai setelah nama selesai
    setTimeout(typeWriterDescription, 3000);

    // Start typing after a short delay
    setTimeout(typeWriterPart1, 1000);
}

// Download CV button functionality - PERBAIKAN
document.getElementById('downloadCV').addEventListener('click', function(e) {
    // Buat elemen link sementara untuk memicu download
    const link = document.createElement('a');
    link.href = 'CV/CuricullumVitae-FawwazAYQ.pdf';
    link.download = 'CuricullumVitae-FawwazAYQ.pdf'; // Nama file yang akan didownload
    
    // Cek apakah browser mendukung download attribute
    if (link.download !== undefined) {
        // Jika mendukung, gunakan metode download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        // Jika tidak mendukung, buka di tab baru
        window.open('CV/CuricullumVitae-FawwazAYQ.pdf', '_blank');
    }
});

// Fungsi notifikasi
function showNotification(message, type) {
    // Hapus notifikasi sebelumnya jika ada
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;

    // Tambahkan ke body
    document.body.appendChild(notification);

    // Hapus otomatis setelah 5 detik
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Form validation for contact form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!email || !message) {
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
                response.json().then(data => {
                    if (data.errors) {
                        showFormMessage(data.errors.map(error => error.message).join(', '), 'error');
                    } else {
                        showFormMessage('Terjadi kesalahan saat mengirim pesan.', 'error');
                    }
                });
            }
        })
        .catch(error => {
            showFormMessage('Terjadi kesalahan jaringan. Silakan coba lagi atau hubungi saya langsung di fawwazayq@gmail.com', 'error');
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
                shape: { 
                    type: "circle",
                    stroke: { width: 0, color: "#000000" }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 0.3, sync: false }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#64ffda",
                    opacity: 0.4,
                    width: 1,
                    shadow: {
                        enable: true,
                        blur: 5,
                        color: "#64ffda"
                    }
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "bubble"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: { opacity: 1 }
                    },
                    bubble: {
                        distance: 250,
                        size: 5,
                        duration: 2,
                        opacity: 1,
                        speed: 3
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // Generate QR Code
    if (typeof QRCode !== 'undefined') {
        const qrcode = new QRCode(document.getElementById("qrcode"), {
            text: window.location.href,
            width: 120,
            height: 120,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    // Initialize 3D effects
    init3DEffects();

    // Initialize terminal effect
    initTerminalEffect();

    // Initialize game-inspired UI
    initGameUI();
});

// Improved event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips if any
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    // Skip navigation for inputs and textareas
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        return;
    }

    // Navigate sections with number keys
    if (e.key >= '1' && e.key <= '5') {
        const sections = ['home', 'profile', 'about', 'experience', 'contact'];
        const index = parseInt(e.key) - 1;

        if (sections[index]) {
            const targetSection = document.getElementById(sections[index]);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });

                // Update URL hash without scrolling
                history.replaceState(null, null, '#' + sections[index]);
            }
        }
    }
});

// Performance optimization - lazy load images
if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                lazyImageObserver.unobserve(lazyImage);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
    });
}

// 3D effect for cards
function init3DEffects() {
    const cards = document.querySelectorAll('.main-content, .sidebar');

    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth < 768) return; // Disable on mobile

            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Terminal effect for skills section
function initTerminalEffect() {
    const terminal = document.createElement('div');
    terminal.className = 'terminal mt-4';
    terminal.innerHTML = `
        <div class="terminal-content">
            <p><span class="terminal-command">$ fawwaz --skills</span></p>
            <p class="terminal-result">Loading skills...</p>
        </div>
    `;

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillsSection.parentNode.insertBefore(terminal, skillsSection.nextSibling);

        // Animate terminal text
        setTimeout(() => {
            const terminalResult = terminal.querySelector('.terminal-result');
            terminalResult.textContent = 'C#: 75% [█████████ ]';

            setTimeout(() => {
                terminalResult.innerHTML += '<br>Unity: 70% [████████  ]';

                setTimeout(() => {
                    terminalResult.innerHTML += '<br>Web Dev: 65% [███████   ]';

                    setTimeout(() => {
                        terminalResult.innerHTML += '<br>Content: 60% [██████    ]';

                        setTimeout(() => {
                            terminalResult.innerHTML += '<br>Video: 55% [█████     ]';
                        }, 500);
                    }, 500);
                }, 500);
            }, 500);
        }, 1000);
    }
}

// Game-inspired UI elements
function initGameUI() {
    // Add game-like progress bars
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        bar.classList.add('game-ui', 'glow-on-hover');
    });

    // Add achievement system
    const achievements = [
        { id: 'cv-download', name: 'CV Collector', desc: 'Unduh CV untuk pertama kali' },
        { id: 'contact-sent', name: 'Social Butterfly', desc: 'Kirim pesan melalui formulir kontak' },
        { id: 'dark-mode', name: 'Night Owl', desc: 'Aktifkan mode gelap' },
        { id: 'all-sections', name: 'Explorer', desc: 'Kunjungi semua bagian CV' }
    ];

    // Create achievements section
    const achievementsSection = document.createElement('section');
    achievementsSection.className = 'main-content mt-4';
    achievementsSection.innerHTML = `
        <h3 class="section-title">Pencapaian</h3>
        <p>Buka kunci pencapaian dengan berinteraksi dengan CV ini!</p>
        <div class="row mt-3" id="achievements-container"></div>
    `;

    document.querySelector('#contact').insertAdjacentElement('afterend', achievementsSection);

    // Render achievements
    const achievementsContainer = document.getElementById('achievements-container');
    achievements.forEach(ach => {
        const achievementEl = document.createElement('div');
        achievementEl.className = 'col-md-6 mb-3';
        achievementEl.innerHTML = `
            <div class="d-flex align-items-center p-3 game-ui">
                <div class="achievement-icon me-3">
                    <i class="fas fa-lock text-muted"></i>
                </div>
                <div>
                    <h6 class="mb-0 text-muted">${ach.name}</h6>
                    <small class="text-muted">${ach.desc}</small>
                </div>
            </div>
        `;
        achievementsContainer.appendChild(achievementEl);
    });
}

// Add interactive background with Three.js if available
function initInteractiveBackground() {
    if (typeof THREE !== 'undefined') {
        // Simple Three.js background effect
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.style.position = 'fixed';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.zIndex = '-3';
        renderer.domElement.style.opacity = '0.5';
        document.body.appendChild(renderer.domElement);

        // Add particles
        const particles = new THREE.BufferGeometry();
        const particleCount = 500;
        const posArray = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.05,
            color: 0x64ffda
        });

        const particleMesh = new THREE.Points(particles, particleMaterial);
        scene.add(particleMesh);

        camera.position.z = 2;

        function animate() {
            requestAnimationFrame(animate);
            particleMesh.rotation.x += 0.001;
            particleMesh.rotation.y += 0.001;
            renderer.render(scene, camera);
        }

        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

// Initialize interactive background
setTimeout(initInteractiveBackground, 2000);

// Ripple effect for buttons and interactive elements
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .nav-link, .control-btn, .gallery-item, .social-link, .portfolio-item');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            // Position the ripple
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Style the ripple
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            // Add to button
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize ripple effect
initRippleEffect();

// Add Easter egg - Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg activated!
        document.body.classList.add('easter-egg');
        showNotification('Easter egg ditemukan! Mode spesial diaktifkan.', 'success');

        // Add fun effects
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            el.style.transition = 'all 0.5s ease';
        });

        // Randomize colors
        setInterval(() => {
            document.documentElement.style.setProperty('--accent-color', `#${Math.floor(Math.random()*16777215).toString(16)}`);
        }, 1000);

        // Reset after 10 seconds
        setTimeout(() => {
            document.body.classList.remove('easter-egg');
            document.documentElement.style.setProperty('--accent-color', '#64ffda');
            showNotification('Mode spesial dimatikan.', 'success');
        }, 10000);
    }
});