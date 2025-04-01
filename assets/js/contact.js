document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría el código para enviar el formulario
            // Por ejemplo, usando Fetch API o Formspree
            
            // Mensaje de éxito (simulado)
            alert('¡Mensaje enviado con éxito! Pronto me pondré en contacto contigo.');
            contactForm.reset();
        });
    }
});