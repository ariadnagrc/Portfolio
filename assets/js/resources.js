document.addEventListener('DOMContentLoaded', function() {
    // Usamos el mismo sistema de filtrado que en proyectos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const resourceCards = document.querySelectorAll('.resource-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Quitar active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Añadir active al botón clickado
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            resourceCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Efecto hover para tarjetas
    resourceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});