class Proj1 extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="island-wrapper fade-up">
            <div class="island js-tilt" style="padding: 0; overflow: hidden; display: flex; align-items: flex-start; justify-content: flex-start; aspect-ratio: 4/5; position: relative;">
                <img src="assets/MANAS_Final.png" alt="MANAS" style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; transform: translateZ(20px);">
                <div style="position: absolute; top: 0; left: 0; width: 100%; background: linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 60%, transparent 100%); padding: 2.5rem var(--space-lg) var(--space-xl); transform: translateZ(40px); box-sizing: border-box;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-sm);">
                        <h2 style="margin: 0; font-family: 'Syne', sans-serif; font-size: 2rem; color: #fff;">MANAS</h2>
                        <span style="color: var(--accent-blue); font-size: 0.8rem; letter-spacing: 0.1em;">ACTIVE</span>
                    </div>
                    <p style="margin: 0; color: var(--text-muted); font-family: var(--font-mono); font-size: 0.9rem; line-height: 1.5; min-height: 3em;">Modular AI Native Framework connecting systems across the product development phase.</p>
                </div>
            </div>
        </div>
        `;
        
        if (window.initScrollReveal) {
            window.initScrollReveal();
        }
        this.initTilt();
    }

    initTilt() {
        const card = this.querySelector('.js-tilt');
        if (!card) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return;
        }

        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = (y / rect.height) * -15; 
            const rotateY = (x / rect.width) * 15;
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0) rotateY(0)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease-out';
        });
    }
}
customElements.define('tech-proj-1', Proj1);
