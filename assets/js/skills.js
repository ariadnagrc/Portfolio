document.addEventListener('DOMContentLoaded', function () {
    // Seleccionamos todas las barras de progreso
    const skillLevels = document.querySelectorAll('.skill-level');

    // Iteramos sobre cada barra de progreso
    skillLevels.forEach(function(skillLevel) {
        const level = skillLevel.getAttribute('data-level'); // Obtenemos el atributo 'data-level'
        
        // Si existe el valor 'data-level'
        if (level) {
            // Extraemos el porcentaje y lo convertimos a número
            const percentage = parseInt(level, 10); 

            // Establecemos el ancho de la barra en función del porcentaje
            skillLevel.style.width = `${percentage}%`; 
        }
    });
});
