document.addEventListener('DOMContentLoaded', function() {
    // Efecto de aparición suave para los elementos de la línea de tiempo
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease-out';
        observer.observe(item);
    });

    // Efecto hover para las tarjetas de detalles
    const detailCards = document.querySelectorAll('.detail-card');
    
    detailCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });

    // Animación para la foto de perfil
    const profilePhoto = document.querySelector('.personal-photo img');
    
    if (profilePhoto) {
        profilePhoto.addEventListener('load', () => {
            profilePhoto.style.opacity = 1;
            profilePhoto.style.transform = 'scale(1)';
        });
        
        profilePhoto.style.opacity = 0;
        profilePhoto.style.transform = 'scale(0.9)';
        profilePhoto.style.transition = 'all 0.7s ease-out';
    }
});