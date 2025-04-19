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
    
    // Marcar enlace activo para "Inicio" permanente
    const inicioLink = document.querySelector('#navbar a[href="index.html"]');

    function setActiveNavLink() {
        // Resetear todos los activos primero
        document.querySelectorAll('#navbar a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Activar siempre "Inicio" en index.html
        if (inicioLink) {
            inicioLink.classList.add('active');
        }
    }
    
    // Configurar eventos
    window.addEventListener('scroll', setActiveNavLink);
    window.addEventListener('load', setActiveNavLink);
    setActiveNavLink(); // Ejecutar al cargar
    

    function initFloatingParticles() {
        if (typeof THREE === 'undefined') return;
    
        // 1. Escena básica
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
    
        // 2. Cubo de prueba (deberías verlo)
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        camera.position.z = 5;
    
        // 3. Animación
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();
    
        console.log("Animación básica funcionando");
    }

    function initFloatingParticles() {
        // Solo cargar en escritorio
        if (window.innerWidth <= 768) return;

        // Cargar Three.js dinámicamente
        if (typeof THREE === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
            script.onload = initFloatingParticles;
            document.body.appendChild(script);
            return;
        }

        // Configuración
        const container = document.createElement('div');
        container.className = 'floating-particles-container';
        document.body.appendChild(container);

        // Escena
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Textura de partícula esférica
        const createSphereTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 128;
            canvas.height = 128;
            const ctx = canvas.getContext('2d');
            
            const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
            gradient.addColorStop(0, 'rgba(255,255,255,0.8)');
            gradient.addColorStop(0.7, 'rgba(255,185,80,0.3)');
            gradient.addColorStop(1, 'rgba(255,185,80,0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(64, 64, 64, 0, Math.PI * 2);
            ctx.fill();
            
            return new THREE.CanvasTexture(canvas);
        };

        // Material de partículas
        const particleMaterial = new THREE.PointsMaterial({
            size: 8, // Más grandes que antes
            map: createSphereTexture(),
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
            depthTest: false
        });

        // Geometría de partículas
        const particleCount = 200;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        // Colores de tu paleta
        const colorPalette = [
            new THREE.Color(0xffb950), // primary-color
            new THREE.Color(0xe49827), // accent-color-a
            new THREE.Color(0xff0c5c), // accent-color-b
            new THREE.Color(0xffe0b2)  // secondary-color
        ];

        // Inicializar partículas
        for (let i = 0; i < particleCount; i++) {
            // Posiciones ampliamente dispersas
            positions[i * 3] = (Math.random() - 0.5) * 3000; // Rango X ampliado
            positions[i * 3 + 1] = (Math.random() - 0.3) * 2000; // Rango Y ampliado
            positions[i * 3 + 2] = (Math.random() - 0.5) * 1500; // Rango Z ampliado

            // Tamaños variados
            sizes[i] = Math.random() * 10 + 5;

            // Colores aleatorios de tu paleta
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);

        // Configuración de cámara
        camera.position.z = 800;
        camera.position.y = window.scrollY * 0.2;

        // Movimientos individuales
        const movements = [];
        for (let i = 0; i < particleCount; i++) {
            movements.push({
                speedX: (Math.random() - 0.5) * 0.1,
                speedY: (Math.random() * 0.05 + 0.01),
                speedZ: (Math.random() - 0.5) * 0.1,
                offset: Math.random() * Math.PI * 2
            });
        }

        // Animación sutil
        function animate() {
            requestAnimationFrame(animate);

            const positions = particleSystem.geometry.attributes.position.array;
            const time = Date.now() * 0.0001;

            for (let i = 0; i < particleCount; i++) {
                const m = movements[i];
                
                // Movimiento muy sutil y aleatorio
                positions[i * 3] += Math.sin(time + m.offset) * 0.1 + m.speedX;
                positions[i * 3 + 1] += m.speedY; // Movimiento vertical muy lento
                positions[i * 3 + 2] += Math.cos(time + m.offset) * 0.1 + m.speedZ;

                // Reposicionar si salen de los límites
                if (positions[i * 3 + 1] > 1500) {
                    positions[i * 3 + 1] = -1000;
                    positions[i * 3] = (Math.random() - 0.5) * 3000;
                    positions[i * 3 + 2] = (Math.random() - 0.5) * 1500;
                }
            }

            particleSystem.geometry.attributes.position.needsUpdate = true;
            
            // Seguimiento suave del scroll
            camera.position.y += (window.scrollY * 0.2 - camera.position.y) * 0.05;
            
            renderer.render(scene, camera);
        }

        // Ajustes responsive
        function handleResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        window.addEventListener('resize', handleResize);
        animate();
    }

    initFloatingParticles();


    function initSectionConstellations() {
        // 1. Verificar compatibilidad
        if (window.innerWidth <= 768 || !WebGLRenderingContext) return;

        // 2. Cargar Three.js dinámicamente
        if (typeof THREE === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
            script.onload = initSectionConstellations;
            document.body.appendChild(script);
            return;
        }

        // 3. Configuración general
        const sections = document.querySelectorAll('.section, .section-degradado');
        const constellations = [];

        // 4. Crear una constelación por sección
        sections.forEach((section, index) => {
            const container = document.createElement('div');
            container.className = 'constellation-container';
            section.prepend(container);

            // Tamaño del contenedor
            const width = section.offsetWidth;
            const height = section.offsetHeight;

            // Escena individual
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true });
            renderer.setSize(width, height);
            container.appendChild(renderer.domElement);

            // Posición de la cámara (fija)
            camera.position.z = 500;

            // Estrellas (cantidad proporcional al tamaño de la sección)
            const starCount = Math.floor((width * height) / 5000);
            const stars = new THREE.Group();
            scene.add(stars);

            // Material de estrella
            const starMaterial = new THREE.MeshBasicMaterial({ 
                color: 0xfff0b2,
                transparent: true,
                opacity: 0.8
            });

            // Patrón único por sección
            for (let i = 0; i < starCount; i++) {
                const geometry = new THREE.SphereGeometry(0.5 + Math.random() * 1.5, 8, 8);
                const star = new THREE.Mesh(geometry, starMaterial.clone());
                
                // Distribución en el área visible
                star.position.set(
                    (Math.random() - 0.5) * width * 0.8,
                    (Math.random() - 0.5) * height * 0.8,
                    (Math.random() - 0.5) * 200
                );
                
                stars.add(star);
            }

            // Conexiones entre estrellas
            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0x4a4d5e,
                transparent: true,
                opacity: 0.2
            });

            const starPositions = stars.children.map(star => star.position);
            for (let i = 0; i < starPositions.length; i++) {
                for (let j = i + 1; j < starPositions.length; j++) {
                    if (starPositions[i].distanceTo(starPositions[j]) < 100) {
                        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                            starPositions[i],
                            starPositions[j]
                        ]);
                        const line = new THREE.Line(lineGeometry, lineMaterial);
                        scene.add(line);
                    }
                }
            }

            // Animación individual (sutil movimiento)
            function animate() {
                requestAnimationFrame(animate);
                
                // Rotación única por sección
                stars.rotation.y += 0.0001 * (index + 1);
                stars.rotation.x += 0.00005 * (index + 1);
                
                renderer.render(scene, camera);
            }

            constellations.push({
                scene,
                camera,
                renderer,
                animate
            });

            animate();
        });

        // 5. Ajuste responsive
        window.addEventListener('resize', () => {
            constellations.forEach((constellation, index) => {
                const section = sections[index];
                constellation.camera.aspect = section.offsetWidth / section.offsetHeight;
                constellation.camera.updateProjectionMatrix();
                constellation.renderer.setSize(section.offsetWidth, section.offsetHeight);
            });
        });
    }

    initSectionConstellations();
});