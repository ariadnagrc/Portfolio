document.addEventListener('DOMContentLoaded', function() {
    // Carrusel de guías destacadas (código anterior se mantiene igual)
    // ... (todo el código del carrusel anterior) ...
    
    // Efecto hover para las cards de categoría
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        const image = this.querySelector('.category-image');
        image.style.transform = 'scale(1.05)';
      });
      
      card.addEventListener('mouseleave', function() {
        const image = this.querySelector('.category-image');
        image.style.transform = 'scale(1)';
      });
    });
    
    // Animación al cargar las categorías
    const categoriesGrid = document.querySelector('.categories-grid');
    
    function animateCategories() {
      const categories = categoriesGrid.querySelectorAll('.category-card');
      categories.forEach((category, index) => {
        setTimeout(() => {
          category.style.opacity = '1';
          category.style.transform = 'translateY(0)';
        }, 150 * index);
      });
    }
    
    // Inicializar animación
    categoriesGrid.querySelectorAll('.category-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Disparar animación cuando el elemento es visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCategories();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(categoriesGrid);
  });