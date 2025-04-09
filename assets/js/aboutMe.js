document.addEventListener('DOMContentLoaded', function() {
    // 1. Crear contenedor de estrellas
    const starsContainer = document.createElement('div');
    starsContainer.id = 'stars-container';
    document.body.insertBefore(starsContainer, document.body.firstChild);

    // 2. Configuración
    const config = {
        starCount: 120,
        colors: ['white', 'cream', 'orange', 'dark-orange'],
        sizes: [1, 2, 3],
        twinkleProbability: 0.2
    };

    // 3. Obtener alturas para evitar hero y footer
    function getHeights() {
        const hero = document.querySelector('.hero-about');
        const footer = document.querySelector('footer');
        return {
            heroHeight: hero ? hero.offsetHeight : 0,
            footerHeight: footer ? footer.offsetHeight : 0,
            windowHeight: window.innerHeight
        };
    }

    // 4. Crear estrellas fijas
    function createStars() {
        const { heroHeight, footerHeight, windowHeight } = getHeights();
        const safeHeight = windowHeight - heroHeight - footerHeight;
        
        starsContainer.innerHTML = '';
        
        for (let i = 0; i < config.starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Añadir clases aleatorias
            star.classList.add(`size-${config.sizes[Math.floor(Math.random() * config.sizes.length)]}`);
            star.classList.add(`color-${config.colors[Math.floor(Math.random() * config.colors.length)]}`);
            
            // Posicionamiento aleatorio
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${heroHeight + (Math.random() * safeHeight)}px`;
            
            // Asignar animación aleatoria
            star.style.animation = `${Math.random() > config.twinkleProbability ? 'pulse' : 'twinkle'} ${3 + Math.random() * 3}s infinite ${Math.random() * 5}s`;
            
            starsContainer.appendChild(star);
        }
    }

    // 5. Inicializar y manejar redimensionamiento
    createStars();
    window.addEventListener('resize', createStars);


    // =============================================
    // 2. Animaciones existentes (se mantienen igual)
    // =============================================
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        setTimeout(() => {
            profilePhoto.style.opacity = '1';
            profilePhoto.style.transform = 'scale(1)';
        }, 300);
    }

    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('div').style.transform = 'rotate(10deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.querySelector('div').style.transform = 'rotate(0)';
        });
    });
});