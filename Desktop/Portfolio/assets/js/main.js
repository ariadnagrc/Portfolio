document.addEventListener('DOMContentLoaded', function() {
    // Año actual en el footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Menú móvil mejorado
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('#navbar ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer clic en un enlace (para móviles)
    document.querySelectorAll('#navbar a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navList.classList.remove('active');
            }
        });
    });
    
    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
// Marcar enlace activo para "Sobre mí" permanente
const sobreMiSection = document.getElementById('sobre-mi');
const sobreMiLink = document.querySelector('#navbar a[href="#sobre-mi"]');
const footer = document.querySelector('footer');
const headerHeight = 80;

function setActiveLink() {
    const scrollPosition = window.scrollY + headerHeight;
    const sobreMiTop = sobreMiSection.offsetTop;
    const sobreMiBottom = sobreMiTop + sobreMiSection.offsetHeight;
    
    // Verificar si hemos pasado el inicio de "Sobre mí"
    if (scrollPosition >= sobreMiTop) {
        // Quitar activo de todos los enlaces primero
        document.querySelectorAll('#navbar a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Activar solo "Sobre mí"
        sobreMiLink.classList.add('active');
    }
    // Si estamos antes de "Sobre mí", activar "Inicio"
    else {
        document.querySelector('#navbar a[href="index.html"]').classList.add('active');
    }
}

window.addEventListener('scroll', setActiveLink);
setActiveLink(); // Ejecutar al cargar la página
});