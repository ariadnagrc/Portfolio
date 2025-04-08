document.addEventListener('DOMContentLoaded', function() {
    // Animación foto de perfil
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        profilePhoto.style.opacity = '0';
        profilePhoto.style.transform = 'scale(0.95)';
        profilePhoto.style.transition = 'all 0.7s ease-out';
        
        setTimeout(() => {
            profilePhoto.style.opacity = '1';
            profilePhoto.style.transform = 'scale(1)';
        }, 300);
    }

    // Efecto hover tarjetas de experiencia
    const expCards = document.querySelectorAll('.exp-card');
    expCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    // Animación timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `all 0.5s ease-out ${index * 0.1}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 500 + (index * 100));
    });

    // Efecto hover tecnologías
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('img').style.transform = 'rotate(10deg) scale(1.1)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.querySelector('img').style.transform = 'rotate(0) scale(1)';
        });
    });
});