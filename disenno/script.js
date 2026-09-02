// Función para filtrar proyectos por categoría de forma dinámica
function filterProjects(category, event) {
    // Actualizar clase activa en botones
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Mostrar/ocultar tarjetas según categoría con animación suave
    const cards = document.querySelectorAll('.project-card');
    const searchInput = document.getElementById('project-search');
    
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const searchTerm = searchInput.value.toLowerCase();
        const cardSearchData = card.getAttribute('data-search').toLowerCase();
        
        const categoryMatch = category === 'all' || cardCategory === category;
        const searchMatch = searchTerm === '' || cardSearchData.includes(searchTerm);
        const shouldShow = categoryMatch && searchMatch;
        
        if (shouldShow) {
            card.style.display = 'block';
            card.offsetHeight;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.pointerEvents = 'auto';
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            card.style.pointerEvents = 'none';
            setTimeout(() => {
                if (card.style.opacity === '0') {
                    card.style.display = 'none';
                }
            }, 300);
        }
    });
}

// Búsqueda de proyectos
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('project-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const cards = document.querySelectorAll('.project-card');
            
            cards.forEach(card => {
                const cardSearchData = card.getAttribute('data-search').toLowerCase();
                const shouldShow = searchTerm === '' || cardSearchData.includes(searchTerm);
                
                if (shouldShow) {
                    card.style.display = 'block';
                    card.offsetHeight;
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        if (card.style.opacity === '0') {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    }
});

// Modal para proyectos
function openProjectModal(card) {
    const img = card.querySelector('.project-thumbnail');
    const title = card.querySelector('.project-name').textContent;
    const desc = card.querySelector('.project-desc').textContent;
    const tags = card.querySelectorAll('.tech-tags .tag');
    const links = card.querySelectorAll('.project-links .project-link');
    
    const modalImage = document.getElementById('modalImage');
    const modalBody = document.querySelector('.modal-body');
    
    // Cargar imagen y detectar orientación
    const tempImg = new Image();
    tempImg.onload = function() {
        const width = tempImg.naturalWidth;
        const height = tempImg.naturalHeight;
        
        // Limpiar clases previas
        modalBody.classList.remove('landscape', 'portrait');
        
        // Aplicar clase según orientación
        if (width > height) {
            modalBody.classList.add('landscape'); // Imagen ancha, va encima
        } else {
            modalBody.classList.add('portrait');  // Imagen alta, va al lado
        }
    };
    tempImg.src = img.src;
    
    modalImage.src = img.src;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDesc').textContent = desc;
    
    // Mostrar tags
    const tagsContainer = document.getElementById('modalTags');
    tagsContainer.innerHTML = '';
    tags.forEach(tag => {
        const tagEl = document.createElement('span');
        tagEl.className = 'modal-tag';
        tagEl.textContent = tag.textContent;
        tagsContainer.appendChild(tagEl);
    });
    
    // Mostrar links
    const linksContainer = document.getElementById('modalLinks');
    linksContainer.innerHTML = '';
    links.forEach(link => {
        const linkEl = document.createElement('a');
        linkEl.className = 'modal-link';
        linkEl.href = link.href;
        linkEl.target = '_blank';
        linkEl.setAttribute('aria-label', link.getAttribute('aria-label') || link.textContent.trim());
        linkEl.title = link.title || linkEl.getAttribute('aria-label');
        linkEl.innerHTML = link.innerHTML;
        linksContainer.appendChild(linkEl);
    });
    
    document.getElementById('projectModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    document.getElementById('projectModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function navigateToSection(event, sectionId) {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (!section) return;

    const menu = document.querySelector('.section-nav');
    menu.classList.remove('open');
    document.querySelectorAll('.section-menu-toggle, .section-menu-contact').forEach(toggle => {
        toggle.setAttribute('aria-expanded', 'false');
    });

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => {
        section.classList.add('nav-highlight');
        window.setTimeout(() => section.classList.remove('nav-highlight'), 1000);
    }, 650);
}

function toggleSectionMenu(event) {
    event.stopPropagation();
    const menu = document.querySelector('.section-nav');
    const toggle = event.currentTarget;
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    const desktopToggle = document.querySelector('.section-menu-toggle');
    if (desktopToggle) desktopToggle.setAttribute('aria-expanded', String(isOpen));
}

// Cerrar modal al hacer click fuera
window.onclick = function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target == modal) {
        closeProjectModal();
    }
}

// Copiar email al click
function copyEmail(event) {
    event.preventDefault();
    const email = 'lpoblete@dcc.uchile.cl';
    navigator.clipboard.writeText(email).then(() => {
        const target = event.currentTarget;
        const originalText = target.innerHTML;
        target.innerHTML = '✅ ¡Email copiado!';
        target.style.borderColor = 'var(--accent-green)';
        target.style.background = 'rgba(16, 185, 129, 0.2)';
        
        setTimeout(() => {
            target.innerHTML = originalText;
            target.style.borderColor = '';
            target.style.background = '';
        }, 2000);
    });
}

// Animación scroll reveal y hide header
let lastScrollTop = 0;
let headerHidden = false;
window.addEventListener('scroll', () => {
    const topBar = document.querySelector('.top-decor-bar');
    const cvFloat = document.querySelector('.cv-float');
    const heroContacts = document.querySelector('.hero-contacts');
    const sectionNav = document.querySelector('.section-nav');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    topBar.classList.toggle('scrolled', currentScroll > 20);
    cvFloat.classList.toggle('visible', currentScroll > window.innerHeight * 0.75);
    const linksInHeader = currentScroll > window.innerHeight * 0.85;
    heroContacts.classList.toggle('header-links-active', linksInHeader);
    sectionNav.classList.toggle('header-links-active', linksInHeader);
    
    // Ocultar header al hacer scroll hacia abajo (con amortiguación)
    if (currentScroll > lastScrollTop) {
        // Scrolleando hacia abajo - ocultar cuando baje más de 300px
        if (currentScroll > 300 && !headerHidden) {
            topBar.classList.add('hide');
            headerHidden = true;
        }
    } else {
        // Scrolleando hacia arriba - mostrar cuando suba menos de 100px
        if (currentScroll < 100 && headerHidden) {
            topBar.classList.remove('hide');
            headerHidden = false;
        }
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    
    // Animación reveal de tarjetas
    const cards = document.querySelectorAll('.project-card, .timeline-item, .skill-group');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
            card.style.opacity = '1';
        }
    });
});

// Cerrar modal con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});