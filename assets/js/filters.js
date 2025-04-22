document.addEventListener('DOMContentLoaded', function () {
    // 1. Lógica de Filtrado (tu código existente)
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

    // 2. Lógica del Carrusel (nueva implementación)
    function initCarousels() {
        document.querySelectorAll('.carousel').forEach(carousel => {
            const inner = carousel.querySelector('.carousel-inner');
            const items = carousel.querySelectorAll('.carousel-item');
            const prevBtn = carousel.querySelector('.prev');
            const nextBtn = carousel.querySelector('.next');
            const indicatorsContainer = carousel.querySelector('.carousel-indicators');
            
            let currentIndex = 0;
            let interval;
            
            // Crear indicadores
            items.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.classList.add('indicator');
                if (index === currentIndex) indicator.classList.add('active');
                indicator.addEventListener('click', () => {
                    goToIndex(index);
                    resetInterval();
                });
                indicatorsContainer.appendChild(indicator);
            });
            
            const indicators = carousel.querySelectorAll('.indicator');
            
            // Función para actualizar el carrusel
            function updateCarousel() {
                inner.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                // Actualizar clases active
                items.forEach((item, index) => {
                    item.classList.toggle('active', index === currentIndex);
                });
                
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentIndex);
                });
            }
            
            // Función para ir a un índice específico
            function goToIndex(index) {
                currentIndex = index;
                updateCarousel();
            }
            
            // Función para reiniciar el intervalo
            function resetInterval() {
                clearInterval(interval);
                interval = setInterval(nextSlide, 5000);
            }
            
            // Función para avanzar al siguiente slide
            function nextSlide() {
                currentIndex = (currentIndex + 1) % items.length;
                updateCarousel();
            }
            
            // Event listeners para botones
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                updateCarousel();
                resetInterval();
            });
            
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });
            
            // Inicializar el carrusel
            updateCarousel();
            
            // Manejo de teclado para accesibilidad
            carousel.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    currentIndex = (currentIndex - 1 + items.length) % items.length;
                    updateCarousel();
                    resetInterval();
                    e.preventDefault();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                    resetInterval();
                    e.preventDefault();
                }
            });
            
            // Enfocar el carrusel para que funcione el manejo de teclado
            carousel.setAttribute('tabindex', '0');
        });
    }

    // Inicializar los carruseles
    initCarousels();

    // 3. Mejora de animaciones al cargar la página
    function animateOnScroll() {
        const projectCards = document.querySelectorAll('.project-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        projectCards.forEach(card => {
            observer.observe(card);
        });
    }

    animateOnScroll();
});