class TechHero extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <section class="tech-hero">
            <h1 class="tech-title fade-up">Product Showcase.</h1>
            <p class="tech-subtitle fade-up delay-1">The Magnum Opus of Eastern Veil</p>
        </section>
        `;
        
        if (window.initScrollReveal) {
            window.initScrollReveal();
        }
    }
}
customElements.define('tech-hero', TechHero);
