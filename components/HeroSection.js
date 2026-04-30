class HeroSection extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="hero">
                <div id="starfield-container" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;background:#000;"></div>
                
                <div class="hero-content">
                    <h1 class="hero-title">
                        <span class="line">
                            <span class="word w1">Achieving</span>
                        </span>
                        <span class="line">
                            <span class="word w2">Infinity</span> 
                            <span class="word w3">at</span> 
                            <span class="word w4">the</span>
                        </span>
                        <span class="line highlight comet-target">
                            <span class="word w5">Speed</span> 
                            <span class="word w6">of</span> 
                            <span class="word w7">Light.</span>
                            <div class="comet-buffer">
                                <div class="comet-line"></div>
                                <div class="comet-head"></div>
                            </div>
                        </span>
                    </h1>
                </div>
            </section>
        `;

        this.initStarfield();
    }

    async initStarfield() {
        // Dynamically import Three.js from CDN
        const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');

        const container = this.querySelector('#starfield-container');
        if (!container) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // --- Scene setup ---
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        camera.position.z = 0;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Accent colors (from site palette)
        const BLUE = new THREE.Color('#4a90e2');
        const RED = new THREE.Color('#d7263d');
        const WHITE = new THREE.Color('#ffffff');

        // =====================================================================
        // 1. Main Starfield (forward flight)
        // =====================================================================
        const STAR_COUNT = 4000;
        const STAR_DEPTH = 1200;

        const starGeometry = new THREE.BufferGeometry();
        const starPositions = new Float32Array(STAR_COUNT * 3);
        const starColors = new Float32Array(STAR_COUNT * 3);
        const starSizes = new Float32Array(STAR_COUNT);

        for (let i = 0; i < STAR_COUNT; i++) {
            const i3 = i * 3;
            starPositions[i3]     = (Math.random() - 0.5) * 2000;    // x spread
            starPositions[i3 + 1] = (Math.random() - 0.5) * 2000;    // y spread
            starPositions[i3 + 2] = -Math.random() * STAR_DEPTH;     // z depth (behind camera)

            // Color: mostly white, some blue, some red
            const roll = Math.random();
            let color;
            if (roll > 0.96) {
                color = RED;
            } else if (roll > 0.90) {
                color = BLUE;
            } else {
                // Slight warm-cool tint variation
                const tint = 0.85 + Math.random() * 0.15;
                color = new THREE.Color(tint, tint, 0.8 + Math.random() * 0.2);
            }
            starColors[i3]     = color.r;
            starColors[i3 + 1] = color.g;
            starColors[i3 + 2] = color.b;

            starSizes[i] = Math.random() * 5.0 + 1.5;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
        starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

        const starMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 }
            },
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                varying float vOpacity;
                uniform float uTime;
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    float dist = length(mvPosition.xyz);
                    // Twinkle with higher base opacity for non-LED screens
                    vOpacity = 0.8 + 0.5 * abs(sin(uTime * 0.5 + position.x * 0.1 + position.y * 0.1));
                    gl_PointSize = size * (600.0 / dist);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vOpacity;
                void main() {
                    float d = length(gl_PointCoord - vec2(0.5));
                    if (d > 0.5) discard;
                    
                    // Brighter, sharper core so it stands out on standard monitors
                    float core = 1.0 - smoothstep(0.0, 0.15, d);
                    // Soft glow falloff
                    float glow = 1.0 - smoothstep(0.0, 0.5, d);
                    
                    // Boost the color brightness at the core
                    vec3 finalColor = vColor + vec3(core * 0.6);
                    gl_FragColor = vec4(finalColor, (glow + core) * vOpacity);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);


        // =====================================================================
        // 4. Animation Loop – Forward Flight & Warp Speed
        // =====================================================================
        let baseSpeed = prefersReducedMotion ? 0.1 : 0.6;
        let targetSpeed = baseSpeed;
        let flightSpeed = baseSpeed;
        
        let baseFov = 75;
        let targetFov = baseFov;
        let time = 0;

        const onPointerDown = () => {
            if (!prefersReducedMotion) {
                targetSpeed = 15.0; // Warp speed!
                targetFov = 120;    // Stretch view
            }
        };

        const onPointerUp = () => {
            targetSpeed = baseSpeed;
            targetFov = baseFov;
        };

        container.addEventListener('mousedown', onPointerDown);
        container.addEventListener('mouseup', onPointerUp);
        container.addEventListener('mouseleave', onPointerUp);
        container.addEventListener('touchstart', onPointerDown, {passive: true});
        container.addEventListener('touchend', onPointerUp, {passive: true});

        // --- Mouse parallax ---
        let targetRotX = 0, targetRotY = 0;
        let currentRotX = 0, currentRotY = 0;
        const LOOK_INTENSITY = 0.15;

        const onMouseMove = (e) => {
            const nx = (e.clientX / window.innerWidth) - 0.5;   // -0.5 to 0.5
            const ny = (e.clientY / window.innerHeight) - 0.5;
            targetRotY = nx * LOOK_INTENSITY;
            targetRotX = -ny * LOOK_INTENSITY;
        };
        document.addEventListener('mousemove', onMouseMove);

        function animate() {
            // Interpolate Speed and FOV smoothly
            flightSpeed += (targetSpeed - flightSpeed) * 0.05;
            camera.fov += (targetFov - camera.fov) * 0.05;
            camera.updateProjectionMatrix();

            time += 0.016; // ~60fps step
            starMaterial.uniforms.uTime.value = time;

            // Move all stars towards the camera (positive Z)
            const positions = starGeometry.attributes.position.array;
            for (let i = 0; i < STAR_COUNT; i++) {
                const i3 = i * 3;
                positions[i3 + 2] += flightSpeed;

                // When a star passes the camera, respawn it far away with random staggered depth
                if (positions[i3 + 2] > 10) {
                    positions[i3]     = (Math.random() - 0.5) * 2000;
                    positions[i3 + 1] = (Math.random() - 0.5) * 2000;
                    positions[i3 + 2] = -STAR_DEPTH - Math.random() * 1000;
                }
            }
            starGeometry.attributes.position.needsUpdate = true;

            // Smooth camera look-around
            currentRotX += (targetRotX - currentRotX) * 0.05;
            currentRotY += (targetRotY - currentRotY) * 0.05;
            camera.rotation.x = currentRotX;
            camera.rotation.y = currentRotY;

            renderer.render(scene, camera);
            animFrameId = requestAnimationFrame(animate);
        }

        let animFrameId;
        animate();

        // --- Resize handler ---
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onResize);

        // --- Cleanup ---
        this.cleanup = () => {
            cancelAnimationFrame(animFrameId);
            window.removeEventListener('resize', onResize);
            document.removeEventListener('mousemove', onMouseMove);
            container.removeEventListener('mousedown', onPointerDown);
            container.removeEventListener('mouseup', onPointerUp);
            container.removeEventListener('mouseleave', onPointerUp);
            container.removeEventListener('touchstart', onPointerDown);
            container.removeEventListener('touchend', onPointerUp);
            renderer.dispose();
        };
    }

    disconnectedCallback() {
        if (this.cleanup) this.cleanup();
    }
}
customElements.define('hero-section', HeroSection);
