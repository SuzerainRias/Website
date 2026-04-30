import * as THREE from 'https://cdn.skypack.dev/three@0.136.0/build/three.module.js';

class GlobeSection extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="about-left">
            <h1 class="about-title fade-up">Origin.</h1>
            <div class="globe-container fade-up delay-1">
                <!-- ThreeJS canvas will be injected here -->
            </div>
        </div>
        `;
        
        if (window.initScrollReveal) {
            window.initScrollReveal();
        }

        // Must wait for element to be painted to get clientWidth for WebGL renderer
        requestAnimationFrame(() => {
            this.initGlobe();
        });
    }

    initGlobe() {
        const globeContainer = this.querySelector('.globe-container');
        if (!globeContainer) return;
        
        // 1. Scene Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        camera.position.z = 280;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(globeContainer.clientWidth, globeContainer.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        globeContainer.appendChild(renderer.domElement);

        const globeGroup = new THREE.Group();
        scene.add(globeGroup);

        // Initial Rotation to center on Kolkata, India (Lat: 22.57° N, Lon: 88.36° E)
        globeGroup.rotation.y = -3.113;
        globeGroup.rotation.x = 0.394;

        // 2. Base Translucent Sphere
        const baseGeometry = new THREE.SphereGeometry(98, 64, 64);
        const baseMaterial = new THREE.MeshPhongMaterial({
            color: 0x1a1a1a,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide,
            shininess: 15
        });
        const baseSphere = new THREE.Mesh(baseGeometry, baseMaterial);
        globeGroup.add(baseSphere);

        // 3. Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
        dirLight.position.set(100, 100, 50);
        scene.add(dirLight);

        // 4. Dot Generation via Map
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

            const radius = 100;
            const step = 1.5; // Degree step for latitude and longitude
            
            const points = [];
            const colors = [];
            
            const colorLand = new THREE.Color(0xc4364a); // Red
            
            for (let lat = -90; lat <= 90; lat += step) {
                const r = Math.cos(lat * Math.PI / 180) * radius;
                const circumference = r * 2 * Math.PI;
                // Roughly maintain consistent dot density along the circumference
                const dotsForLat = circumference > 0 ? Math.max(1, Math.floor(circumference / step)) : 1;
                
                for (let i = 0; i < dotsForLat; i++) {
                    const lon = -180 + (i * 360 / dotsForLat);
                    const x = Math.floor((lon + 180) / 360 * canvas.width);
                    const y = Math.floor((90 - lat) / 180 * canvas.height);
                    const pixelIndex = (y * canvas.width + x) * 4;
                    const brightness = imgData[pixelIndex]; 
                    
                    if (brightness < 50) {
                        const phi = (90 - lat) * (Math.PI / 180);
                        const theta = (lon + 180) * (Math.PI / 180);
                        const pX = -(radius * Math.sin(phi) * Math.cos(theta));
                        const pY = radius * Math.cos(phi);
                        const pZ = radius * Math.sin(phi) * Math.sin(theta);
                        
                        points.push(pX, pY, pZ);
                        colors.push(colorLand.r, colorLand.g, colorLand.b);
                    }
                }
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            
            const canvasTexture = document.createElement('canvas');
            canvasTexture.width = 32;
            canvasTexture.height = 32;
            const context = canvasTexture.getContext('2d');
            context.beginPath();
            context.arc(16, 16, 16, 0, Math.PI * 2);
            context.fillStyle = '#ffffff';
            context.fill();
            const dotTexture = new THREE.CanvasTexture(canvasTexture);

            const material = new THREE.PointsMaterial({
                size: 2.0,
                map: dotTexture,
                transparent: true,
                alphaTest: 0.5,
                opacity: 0.9,
                vertexColors: true
            });
            
            const pointCloud = new THREE.Points(geometry, material);
            globeGroup.add(pointCloud);
        };

        // 5. Interaction & Animation
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        let rotationVelocity = { x: 0.001, y: 0 }; 

        globeContainer.addEventListener('pointerdown', (e) => {
            isDragging = true;
            previousMousePosition = { x: e.offsetX, y: e.offsetY };
            globeContainer.style.cursor = 'grabbing';
        });

        window.addEventListener('pointerup', () => {
            isDragging = false;
            globeContainer.style.cursor = 'grab';
        });

        window.addEventListener('pointermove', (e) => {
            if (isDragging) {
                const deltaMove = {
                    x: e.offsetX - previousMousePosition.x,
                    y: e.offsetY - previousMousePosition.y
                };
                
                globeGroup.rotation.y += deltaMove.x * 0.005;
                globeGroup.rotation.x += deltaMove.y * 0.005;
                globeGroup.rotation.x = Math.max(-Math.PI/3, Math.min(Math.PI/3, globeGroup.rotation.x));
                rotationVelocity.x = deltaMove.x * 0.0005;
                previousMousePosition = { x: e.offsetX, y: e.offsetY };
            }
        });

        let lastScrollY = window.scrollY;
        const scrollHandler = () => {
            const deltaY = window.scrollY - lastScrollY;
            globeGroup.rotation.y += deltaY * 0.002;
            lastScrollY = window.scrollY;
        };
        window.addEventListener('scroll', scrollHandler);

        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            if (!isDragging) {
                rotationVelocity.x += (0.001 - rotationVelocity.x) * 0.05;
                globeGroup.rotation.y += rotationVelocity.x;
            }
            renderer.render(scene, camera);
        };
        animate();

        const resizeHandler = () => {
            if(globeContainer.clientWidth === 0) return;
            camera.aspect = globeContainer.clientWidth / globeContainer.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(globeContainer.clientWidth, globeContainer.clientHeight);
        };
        window.addEventListener('resize', resizeHandler);

        this.cleanup = () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('scroll', scrollHandler);
            window.removeEventListener('resize', resizeHandler);
        };
    }

    disconnectedCallback() {
        if(this.cleanup) this.cleanup();
    }
}
customElements.define('globe-section', GlobeSection);
