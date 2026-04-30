class CareersSection extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <style>
            .careers-hero {
                position: relative;
                min-height: 80vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                overflow: hidden;
            }


            .careers-title {
                font-size: clamp(3rem, 8vw, 6rem);
                font-family: 'Syne', sans-serif;
                margin-bottom: var(--space-md);
                letter-spacing: -0.02em;
                color: #ffffff;
            }


            .quote-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: var(--space-md);
                opacity: 0;
                transform: translateY(20px);
                animation: fadeUpText 1s ease-out forwards;
                animation-delay: 1.2s;
            }

            .quote-text {
                font-family: var(--font-mono);
                font-size: clamp(1rem, 2vw, 1.5rem);
                color: var(--text-muted);
                letter-spacing: 0.2em;
                text-transform: uppercase;
                text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
            }

            @keyframes fadeUpText {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .quote-wrapper {
                position: relative;
                display: inline-flex;
            }

            .skywalker-saber {
                position: absolute;
                bottom: -20px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                opacity: 0;
                animation: spinInHilt 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                animation-delay: 1.2s;
                z-index: 10;
            }

            @keyframes spinInHilt {
                0% {
                    opacity: 0;
                    transform: translateX(-50%) translateY(80px) rotate(-720deg) scale(0.5);
                }
                100% {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0) rotate(0deg) scale(1);
                }
            }

            .saber-blade {
                width: 0px;
                height: 6px;
                background: #fff;
                border-radius: 0 4px 4px 0;
                box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px rgba(255,255,255,0.8), 0 0 50px rgba(255,255,255,0.6), 0 0 80px rgba(255,255,255,0.4);
                animation: igniteBlade 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                animation-delay: 2.6s;
            }

            .saber-hilt {
                width: 28px;
                height: 8px;
                background: linear-gradient(180deg, #999, #eee, #999);
                border-radius: 3px 0 0 3px;
                position: relative;
            }

            .saber-hilt::before {
                content: '';
                position: absolute;
                top: -2px; 
                right: -2px; 
                width: 6px; 
                height: 12px; 
                background: #222;
                border-radius: 1px;
            }

            @keyframes igniteBlade {
                100% { width: 150px; }
            }
        </style>

        <section class="careers-hero section-panel">
            <h1 class="careers-title fade-up">Careers.</h1>
            
            <div class="quote-container">
                <div class="quote-wrapper">
                    <p class="quote-text">Stay tuned, DREAMER!</p>
                    <div class="skywalker-saber">
                        <div class="saber-hilt"></div>
                        <div class="saber-blade"></div>
                    </div>
                </div>
            </div>
        </section>
        `;

        // Initialize scroll reveal if main.js is loaded
        if (window.initScrollReveal) {
            // slight delay to ensure DOM is parsed
            setTimeout(() => {
                window.initScrollReveal();
            }, 100);
        }
    }
}
customElements.define('careers-section', CareersSection);
