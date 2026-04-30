/* =========================================================================
   Custom Star Cursor – Beta Centauri (blue) + Proxima Centauri (red)
   ========================================================================= */
(function () {
    // Skip on touch-only devices
    if ('ontouchstart' in window && !window.matchMedia('(pointer: fine)').matches) return;

    // Hide default cursor globally
    document.documentElement.style.cursor = 'none';

    // --- Create cursor elements ---
    const beta = document.createElement('div');
    beta.id = 'cursor-beta';
    const proxima = document.createElement('div');
    proxima.id = 'cursor-proxima';

    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after { cursor: none !important; }

        #cursor-beta, #cursor-proxima {
            position: fixed;
            pointer-events: none;
            z-index: 99999;
            border-radius: 50%;
            top: 0; left: 0;
            will-change: transform;
            transition: opacity 0.3s;
        }

        #cursor-beta {
            width: 8px;
            height: 8px;
            background: #fff;
            box-shadow:
                0 0  6px 2px rgba(37, 206, 224, 0.9),
                0 0 14px 4px rgba(37, 206, 224, 0.5),
                0 0 28px 8px rgba(37, 206, 224, 0.2);
        }

        #cursor-proxima {
            width: 6px;
            height: 6px;
            background: rgba(255, 255, 255, 0.85);
            box-shadow:
                0 0  5px 2px rgba(215, 38, 61, 0.9),
                0 0 12px 4px rgba(215, 38, 61, 0.45),
                0 0 22px 6px rgba(215, 38, 61, 0.15);
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(beta);
    document.body.appendChild(proxima);

    // --- Tracking state ---
    let mouseX = -100, mouseY = -100;
    let betaX = -100, betaY = -100;
    let proxX = -100, proxY = -100;
    let lastMoveTime = 0;
    let orbitAngle = 0;
    const IDLE_THRESHOLD = 150; // ms before entering orbit mode
    const ORBIT_RADIUS = 14;
    const ORBIT_SPEED = 0.03; // radians per frame

    let firstMove = true;
    document.addEventListener('mousemove', e => {
        if (firstMove) {
            proxX = e.clientX;
            proxY = e.clientY;
            betaX = e.clientX;
            betaY = e.clientY;
            firstMove = false;
        }
        mouseX = e.clientX;
        mouseY = e.clientY;
        lastMoveTime = performance.now();
    });

    // Hide cursors when mouse leaves viewport
    document.addEventListener('mouseleave', () => {
        beta.style.opacity = '0';
        proxima.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        beta.style.opacity = '1';
        proxima.style.opacity = '1';
    });

    // --- Animation loop ---
    function animate() {
        if (firstMove) {
            requestAnimationFrame(animate);
            return; // Don't animate until mouse enters
        }

        // Beta follows mouse instantly
        betaX = mouseX;
        betaY = mouseY;

        const now = performance.now();
        const isIdle = (now - lastMoveTime) > IDLE_THRESHOLD;

        if (isIdle) {
            // Orbit mode: Proxima circles around Beta
            orbitAngle += ORBIT_SPEED;
            const targetX = betaX + Math.cos(orbitAngle) * ORBIT_RADIUS;
            const targetY = betaY + Math.sin(orbitAngle) * ORBIT_RADIUS;

            // Smooth transition into orbit
            proxX += (targetX - proxX) * 0.1;
            proxY += (targetY - proxY) * 0.1;
            
        } else {
            // Trail mode: Proxima follows Beta naturally
            const ease = 0.15;
            proxX += (betaX - proxX) * ease;
            proxY += (betaY - proxY) * ease;

            // Sync the orbit angle so transition to idle is seamless
            const dx = proxX - betaX;
            const dy = proxY - betaY;
            if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
                orbitAngle = Math.atan2(dy, dx);
            }
        }

        beta.style.transform = `translate(${betaX - 4}px, ${betaY - 4}px)`;
        proxima.style.transform = `translate(${proxX - 3}px, ${proxY - 3}px)`;

        requestAnimationFrame(animate);
    }

    animate();
})();
