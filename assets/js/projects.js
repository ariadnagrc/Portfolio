document.addEventListener('DOMContentLoaded', function() {
    // Filtrado de proyectos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Asegurarnos de que el filtro "Todos" se seleccione por defecto
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
        allButton.classList.add('active');
    }

    // Función para filtrar proyectos
    function filterProjects(filterValue) {
        projectCards.forEach(card => {
            const cardCategory = card.dataset.category;

            // Elimina la clase 'visible' para reiniciar la animación
            card.classList.remove('visible');
            
            if (filterValue === 'all' || filterValue === cardCategory) {
                card.style.display = 'flex';  // Muestra la tarjeta
                // Después de un pequeño retraso, añadimos la clase 'visible' para activar la animación
                setTimeout(() => {
                    card.classList.add('visible');
                }, 100);
            } else {
                card.style.display = 'none';  // Oculta la tarjeta
            }
        });
    }

    // Escuchar el clic en los botones de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Alterna la clase 'active' para mostrar el estado activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.dataset.filter;

            // Filtra las tarjetas de proyecto
            filterProjects(filterValue);
        });
    });

    // Filtrar automáticamente al cargar la página (por defecto "all")
    filterProjects('all');
});
