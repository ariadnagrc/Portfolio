document.addEventListener('DOMContentLoaded', function() {
    // 1. Crear contenedor de estrellas
    const starsContainer = document.createElement('div');
    starsContainer.id = 'stars-container';
    starsContainer.style.position = 'absolute';
    starsContainer.style.top = '0';
    starsContainer.style.left = '0';
    starsContainer.style.width = '100%';
    starsContainer.style.pointerEvents = 'none'; // Para que no bloquee clics
    document.body.appendChild(starsContainer);
   
    // 2. Configuración
    const config = {
        starCount: 400, // Puedes aumentar esto para más densidad
        colors: ['white', 'cream', 'orange', 'darkorange'],
        sizes: [1, 2, 3],
        twinkleProbability: 0.5
    };

    // Función para ajustar la altura del contenedor de estrellas
    function adjustStarsHeight() {
        const footer = document.querySelector('footer');
        if (!footer) return; // Si no existe un footer, no hacemos nada

        const footerTop = footer.getBoundingClientRect().top + window.scrollY; // Obtener la posición del footer
        const viewportHeight = window.innerHeight;

        // Ajustar la altura del contenedor de estrellas para que no sobrepase el footer
        const starsHeight = Math.max(footerTop - 1, viewportHeight);
        starsContainer.style.height = starsHeight + 'px';
    }

    // 3. Crear estrellas por toda la página
    function createStars() {
        const pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        starsContainer.innerHTML = '';

        for (let i = 0; i < config.starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';

            // Tamaño y color aleatorios
            star.classList.add(`size-${config.sizes[Math.floor(Math.random() * config.sizes.length)]}`);
            star.classList.add(`color-${config.colors[Math.floor(Math.random() * config.colors.length)]}`);

            // Posición aleatoria
            star.style.position = 'absolute';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * pageHeight}px`;

            // Animación
            const anim = Math.random() > config.twinkleProbability ? 'pulse' : 'twinkle';
            star.style.animation = `${anim} ${3 + Math.random() * 3}s infinite ${Math.random() * 5}s`;

            starsContainer.appendChild(star);
        }
    }

    // 4. Inicializar
    createStars();
    window.addEventListener('resize', () => {
        createStars();
        adjustStarsHeight();
    });

    // Llamar a la función de ajuste de estrellas en el scroll también
    window.addEventListener('scroll', adjustStarsHeight);

    // 5. Partículas flotantes
    function initFloatingParticles() {
        if (window.innerWidth <= 768) return;

        // Cargar Three.js dinámicamente
        if (typeof THREE === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
            script.onload = initFloatingParticles;
            document.body.appendChild(script);
            return;
        }

        const container = document.createElement('div');
        container.className = 'floating-particles-container';
        document.body.appendChild(container);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.z = 800;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Crear textura radial
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

        const particleMaterial = new THREE.PointsMaterial({
            size: 10,
            map: createSphereTexture(),
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            vertexColors: true
        });

        const particleCount = 200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        const colorPalette = [
            new THREE.Color(0xffb950),
            new THREE.Color(0xe49827),
            new THREE.Color(0xff0c5c),
            new THREE.Color(0xffe0b2)
        ];

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 3000;
            positions[i * 3 + 1] = (Math.random() - 0.3) * 2000;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 1500;

            sizes[i] = Math.random() * 10 + 5;

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleSystem = new THREE.Points(geometry, particleMaterial);
        scene.add(particleSystem);

        // Movimientos individuales
        const movements = [];
        for (let i = 0; i < particleCount; i++) {
            movements.push({
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() * 0.1 + 0.01),
                speedZ: (Math.random() - 0.5) * 0.2,
                offset: Math.random() * Math.PI * 2
            });
        }

        // ANIMACIÓN: movimiento libre + reacción al scroll
        function animate() {
            requestAnimationFrame(animate);

            const positions = particleSystem.geometry.attributes.position.array;
            const time = Date.now() * 0.001;

            for (let i = 0; i < particleCount; i++) {
                const m = movements[i];
                const i3 = i * 3;

                positions[i3] += Math.sin(time + m.offset) * 0.4 + m.speedX;
                positions[i3 + 1] += Math.cos(time * 0.3 + m.offset) * 0.4 + m.speedY;
                positions[i3 + 2] += Math.sin(time * 0.5 + m.offset) * 0.4 + m.speedZ;

                if (positions[i3 + 1] > 1500 || positions[i3 + 1] < -1200) {
                    positions[i3 + 1] = -1000 + Math.random() * 200;
                    positions[i3] = (Math.random() - 0.5) * 3000;
                    positions[i3 + 2] = (Math.random() - 0.5) * 1500;
                }
            }

            particleSystem.geometry.attributes.position.needsUpdate = true;

            const targetY = window.scrollY * 0.2;
            camera.position.y += (targetY - camera.position.y) * 0.03;

            renderer.render(scene, camera);
        }

        // Ajustes en el resize
        function handleResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        window.addEventListener('resize', handleResize);
        animate();
    }

    initFloatingParticles();
});
