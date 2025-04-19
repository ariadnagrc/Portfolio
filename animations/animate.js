
// Animación Terminal SQL
// Datos de habilidades (MANTENEMOS ESTA PARTE)
const habilidadesDB = [
    { tecnologia: 'Java', categoria: 'Backend', nivel: 9 },
    { tecnologia: 'Python', categoria: 'Backend', nivel: 8 },
    { tecnologia: 'PostgreSQL', categoria: 'Database', nivel: 6 },
    { tecnologia: 'Spring Boot', categoria: 'Backend', nivel: 7 },
    { tecnologia: 'MongoDB', categoria: 'Database', nivel: 6 },
    { tecnologia: 'JavaScript', categoria: 'Frontend', nivel: 6 },
    { tecnologia: 'SQL', categoria: 'Database', nivel: 10 },
    { tecnologia: 'HTML', categoria: 'Frontend', nivel: 10 },
    { tecnologia: 'CSS', categoria: 'Frontend', nivel: 8 }
  ];
  
  // Animación Terminal SQL + Tabla de Resultados
  const sqlTerminal = document.getElementById('sql-animation');
  const skillsTable = document.querySelector('.skills-table tbody');
  
  if (sqlTerminal && skillsTable) {
    // Inicialmente vaciar la tabla
    skillsTable.innerHTML = '';
    
    const queries = [
      {
        sql: "SELECT * FROM habilidades;",
        execute: () => habilidadesDB
      },
      {
        sql: "SELECT tecnologia, categoria \nFROM habilidades \nWHERE categoria = 'Backend';",
        execute: () => habilidadesDB.filter(h => h.categoria === 'Backend')
      },
      {
        sql: "SELECT tecnologia, nivel \nFROM habilidades \nWHERE nivel >= 8 \nORDER BY nivel DESC;",
        execute: () => habilidadesDB
          .filter(h => h.nivel >= 8)
          .sort((a, b) => b.nivel - a.nivel)
      },
      {
        sql: "SELECT tecnologia, categoria \nFROM habilidades \nWHERE nivel > 7 AND categoria = 'Database';",
        execute: () => habilidadesDB.filter(h => h.nivel > 7 && h.categoria === 'Database')
      }
    ];
  
    let queryIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';
    let currentQuery = queries[0];
  
    function typeSQL() {
      currentQuery = queries[queryIndex % queries.length];
      
      if (isDeleting) {
        currentText = currentQuery.sql.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          queryIndex++;
          // Limpiar tabla cuando la consulta se ha borrado completamente
          skillsTable.innerHTML = '';
          setTimeout(typeSQL, 500);
          return;
        }
      } else {
        currentText = currentQuery.sql.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentQuery.sql.length) {
          // Consulta completa - mostrar resultados
          updateTable(currentQuery.execute());
          
          // Pausa antes de borrar
          setTimeout(() => {
            isDeleting = true;
            // Limpiar tabla al comenzar a borrar la consulta
            skillsTable.innerHTML = '';
            typeSQL();
          }, 2500);
          return;
        }
      }
  
      sqlTerminal.innerHTML = colorizeSQL(currentText);
      setTimeout(typeSQL, isDeleting ? 30 : 50);
    }
  
    function colorizeSQL(text) {
      return text
        .replace(/(SELECT|FROM|WHERE|ORDER BY|DESC|AND)/g, '<span class="sql-keyword">$1</span>')
        .replace(/habilidades/g, '<span class="sql-table">$&</span>')
        .replace(/'([^']*)'/g, '<span class="sql-string">\'$1\'</span>')
        .replace(/--.*$/gm, '<span class="sql-comment">$&</span>');
    }
  
    function updateTable(data) {
      data.forEach((habilidad, index) => {
        const row = document.createElement('tr');
        row.style.animationDelay = `${index * 100}ms`;
        row.classList.add('fade-in');
        
        row.innerHTML = `
          <td>${habilidad.tecnologia}</td>
          <td>${habilidad.categoria || ''}</td>
          <td><div class="skill-bar" data-level="${habilidad.nivel || 0}"></div></td>
        `;
        
        skillsTable.appendChild(row);
      });
  
      // Animar barras
      document.querySelectorAll('.skill-bar').forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.setProperty('--level', `${level}0%`);
      });
    }
  
    // Iniciar animación después de 1 segundo
    setTimeout(typeSQL, 1000);
  }
  
  // Animación de barras de habilidades (se ejecuta cuando updateTable es llamado)
  document.querySelectorAll('.skill-bar').forEach(bar => {
    const level = bar.getAttribute('data-level');
    bar.style.setProperty('--level', `${level}0%`);
    
    const row = bar.closest('tr');
    const delay = Array.from(row.parentNode.children).indexOf(row) * 200;
    bar.style.animationDelay = `${delay}ms`;
  });







    // Animación de código que se escribe (nueva función)
    const codeElement = document.getElementById('typed-code');
    if (codeElement) {
        // Constante 1: Datos personales
        const constructorPersona = `        <span class="keyword">class</span> <span class="function">Persona</span> {
                <span class="function">constructor</span>() {
                    <span class="keyword">this</span>.<span class="property">nombre</span> = <span class="string">"Ariadna García"</span>;
                    <span class="keyword">this</span>.<span class="property">edad</span> = <span class="number">20</span>;
                    <span class="keyword">this</span>.<span class="property">formacion</span> = <span class="string">"Desarrollo de Aplicaciones Multiplataforma"</span>;
                    <span class="keyword">this</span>.<span class="property">especialidad</span> = <span class="string">"Desarrollo Backend"</span>;
                }
        }`;

        // Constante 2: Portfolio que extiende de Persona
        const constructorPortfolio = `        <span class="keyword">class</span> <span class="function">Portfolio</span> <span class="keyword">extends</span> <span class="function">Persona</span> {
                <span class="function">constructor</span>() {
                    <span class="keyword">super</span>();
                    <span class="keyword">this</span>.<span class="property">proyectos</span> = <span class="number">12</span>;
                    <span class="keyword">this</span>.<span class="property">habilidades</span> = [
                            <span class="string">"Java"</span>,
                            <span class="string">"Python"</span>,
                            <span class="string">"SQL"</span>,
                    ];
                    <span class="keyword">this</span>.<span class="property">experiencia</span> = <span class="number">4</span>;
                }
        }`;

        // Constante 3: Métodos del Portfolio
        const metodosPortfolio = `        <span class="keyword">public</span> String <span class="function">saludar</span>() {
            <span class="keyword">return</span> <span class="string">"¡Hola! Soy " + this.nombre + " 👋"</span>;
        }
    
        <span class="keyword">public</span> double <span class="function">proyectosPorAño</span>() {
            <span class="keyword">return</span> Math.<span class="function">round</span>((<span class="keyword">this</span>.<span class="property">proyectos</span> / (<span class="keyword">double</span>)<span class="keyword">this</span>.<span class="property">experiencia</span>) * 10) / 10.0;
        }
    
        <span class="keyword">public</span> String <span class="function">nivelSeniority</span>() {
            <span class="keyword">return</span> <span class="keyword">this</span>.<span class="property">experiencia</span> > 5 ? <span class="string">"Senior"</span> : <span class="string">"Mid-Level"</span>;
        }`;
        
        // Luego puedes usarlas alternadamente en tu animación
        const codeSnippets = [constructorPersona, constructorPortfolio, metodosPortfolio];

        let snippetIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentSnippet = '';

        function typeCode() {
            currentSnippet = codeSnippets[snippetIndex];
            
            if (isDeleting) {
                codeElement.innerHTML = currentSnippet.substring(0, charIndex - 1);
                charIndex--;
            } else {
                codeElement.innerHTML = currentSnippet.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentSnippet.length) {
                isDeleting = true;
                setTimeout(typeCode, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                snippetIndex = (snippetIndex + 1) % codeSnippets.length;
                setTimeout(typeCode, 1000);
            } else {
                setTimeout(typeCode, isDeleting ? 5 : 15);
            }
        }

        // Iniciar animación después de 1 segundo
        setTimeout(typeCode, 1000);
    }