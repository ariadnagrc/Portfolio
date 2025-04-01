document.addEventListener('DOMContentLoaded', function() {
    // Animación de barras de habilidades
    const skillLevels = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillLevels.forEach(level => {
            const width = level.getAttribute('data-level');
            level.style.width = width;
        });
    }
    
    // Activar animación cuando la sección es visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.1});
    
    observer.observe(document.querySelector('.skills-main'));
});