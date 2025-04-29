document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('#navbar ul');
    
    // Función para alternar el menú
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navList.classList.toggle('active');
        
        // Cambiar icono de hamburguesa a X
        const icon = menuToggle.querySelector('i');
        if (menuToggle.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
    
    if (menuToggle && navList) {
        // Evento click para el toggle
        menuToggle.addEventListener('click', toggleMenu);
        
        // Cerrar menú al hacer click en un enlace (solo móvil)
        if (window.innerWidth <= 768) {
            document.querySelectorAll('#navbar ul a').forEach(link => {
                link.addEventListener('click', () => {
                    if (navList.classList.contains('active')) {
                        toggleMenu();
                    }
                });
            });
        }
    }
});