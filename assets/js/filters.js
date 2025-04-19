document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterables = document.querySelectorAll('.filterable');

    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
        allButton.classList.add('active');
    }

    function filterItems(filterValue) {
        filterables.forEach(item => {
            const category = item.dataset.category;

            // Siempre quitamos visible y ocultamos primero
            item.classList.remove('visible');
            item.classList.add('hidden');

            // Si el ítem coincide con el filtro, lo mostramos y animamos
            if (filterValue === 'all' || filterValue === category) {
                // Mostrar el elemento (quita el hidden)
                item.classList.remove('hidden');

                // Forzar reflow para reiniciar animación
                void item.offsetWidth;

                // Añadimos visible con un pequeño delay para que sí se anime
                setTimeout(() => {
                    item.classList.add('visible');
                }, 50);
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.dataset.filter;
            filterItems(filterValue);
        });
    });

    filterItems('all');
});
