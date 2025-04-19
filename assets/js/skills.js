document.addEventListener('DOMContentLoaded', function() {
  // Animación de barras de progreso (mantener esto igual)
  const skillLevels = document.querySelectorAll('.skill-level');
  skillLevels.forEach(function(skillLevel) {
    const level = skillLevel.getAttribute('data-level');
    if (level) {
      skillLevel.style.width = level; 
    }
  });

  // Cambio principal: Escuchar clicks en toda la tarjeta (.skill-item)
  const skillItems = document.querySelectorAll('.skill-item');
  let currentOpen = null;

  skillItems.forEach(item => {
    // Cambiamos el event listener al item completo en lugar de solo .skill-info
    item.addEventListener('click', function(e) {
      // Evitamos que se cierre si se hace click en elementos interactivos internos
      if (e.target.closest('.skill-bar, .filter-btn')) return;
      
      e.stopPropagation();
      
      if (currentOpen && currentOpen !== item) {
        currentOpen.classList.remove('open');
      }
      
      item.classList.toggle('open');
      currentOpen = item.classList.contains('open') ? item : null;
    });
  });

  // Mantener el cierre al hacer click fuera
  document.addEventListener('click', function() {
    if (currentOpen) {
      currentOpen.classList.remove('open');
      currentOpen = null;
    }
  });
});