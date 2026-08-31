// Función para filtrar proyectos por categoría de forma dinámica
function filterProjects(category, event) {
    // Actualizar clase activa en botones
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Mostrar/ocultar tarjetas según categoría
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.opacity = '1';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
}

// Escuchador de atajo de teclado (Ctrl + K) para simulador de Command Palette
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        alert("💻 Terminal Command Palette:\n\nPráctica Profesional II - Lucas Poblete Tassara\nSistemas | Backend | Análisis de Datos | GameDev");
    }
});