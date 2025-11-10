// certificates.js - Dynamic certificate loader

// Load certificates from JSON configuration file
async function loadCertificatesConfig() {
    try {
        const response = await fetch('certificates-config.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const config = await response.json();
        certificatesConfig = config;
        loadCertificates();
    } catch (error) {
        console.error('Error loading certificates configuration:', error);
        // Use fallback configuration
        certificatesConfig = {
            certs: [
                {
                    name: "Certificate_2025_20067.pdf",
                    title: "Sertifikat 2025/20067",
                    date: "2025-01-01",
                    description: "Contoh deskripsi sertifikat"
                }
            ]
        };
        loadCertificates();
    }
}

let certificatesConfig = {
    // This will be populated by the loadCertificatesConfig function
    certs: []
};

// Function to load certificates from the configuration
function loadCertificates() {
    // Wait for the DOM to be loaded before trying to access elements
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => loadCertificates());
        return;
    }
    
    const container = document.getElementById('certificates-container');
    const countElement = document.getElementById('certificate-count');
    
    if (certificatesConfig.certs && certificatesConfig.certs.length > 0) {
        countElement.textContent = certificatesConfig.certs.length;
        
        // Clear the container
        container.innerHTML = '';
        
        certificatesConfig.certs.forEach((cert, index) => {
            const certCard = document.createElement('div');
            certCard.className = 'certificate-card';
            certCard.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="me-3">
                        <i class="fas fa-file-pdf text-danger" style="font-size: 2rem;"></i>
                    </div>
                    <div class="flex-grow-1">
                        <h5 class="certificate-title mb-1">${cert.title}</h5>
                        <p class="certificate-info mb-1">${cert.name}</p>
                        <p class="certificate-info mb-0"><small><i class="fas fa-calendar me-1"></i> ${cert.date}</small></p>
                    </div>
                    <div>
                        <i class="fas fa-external-link-alt text-muted"></i>
                    </div>
                </div>
                <p class="mt-2">${cert.description}</p>
            `;
            
            certCard.addEventListener('click', () => {
                openPdfViewer(`Sertifikat/${cert.name}`);
            });
            
            container.appendChild(certCard);
        });
    } else {
        // Show "no certificates" message
        if (countElement) countElement.textContent = '0';
        if (container) {
            container.innerHTML = `
                <div class="no-certificates">
                    <div class="certificate-icon">
                        <i class="fas fa-file-pdf"></i>
                    </div>
                    <h5>Belum ada sertifikat</h5>
                    <p class="text-muted">Sertifikat yang diupload akan muncul di sini secara otomatis</p>
                </div>
            `;
        }
    }
}

function updateCertificatesConfig(newCerts) {
    certificatesConfig.certs = newCerts;
    loadCertificates();
}

// Function to open PDF viewer
function openPdfViewer(pdfPath) {
    const viewerContainer = document.getElementById('pdf-viewer-container');
    const pdfViewer = document.getElementById('pdf-viewer');
    
    // Use the PDF.js viewer if available, or fallback to browser's built-in PDF viewer
    pdfViewer.src = pdfPath;
    viewerContainer.style.display = 'block';
    
    // Scroll to the PDF viewer
    viewerContainer.scrollIntoView({ behavior: 'smooth' });
}

// Function to close PDF viewer
function closePdfViewer() {
    const viewerContainer = document.getElementById('pdf-viewer-container');
    const pdfViewer = document.getElementById('pdf-viewer');
    
    viewerContainer.style.display = 'none';
    pdfViewer.src = '';
}

// Add keyboard navigation to close PDF viewer with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const viewerContainer = document.getElementById('pdf-viewer-container');
        if (viewerContainer.style.display === 'block') {
            closePdfViewer();
        }
    }
});

// Function to manually add a new certificate
function addCertificate(name, title, date, description) {
    const newCert = {
        name: name,
        title: title || name.replace('.pdf', '').replace(/_/g, ' '),
        date: date || new Date().toISOString().split('T')[0],
        description: description || 'Sertifikat baru'
    };
    
    if (!certificatesConfig.certs) {
        certificatesConfig.certs = [];
    }
    
    certificatesConfig.certs.push(newCert);
    loadCertificates();
}

// Function to remove a certificate
function removeCertificate(name) {
    if (certificatesConfig.certs) {
        certificatesConfig.certs = certificatesConfig.certs.filter(cert => cert.name !== name);
        loadCertificates();
    }
}