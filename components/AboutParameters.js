class AboutParameters extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="about-meta fade-up delay-1">
            <div class="meta-group">
                <div class="meta-header">PARAMETERS</div>
                <div class="meta-content">
                    <div class="meta-row">
                        <span class="text-dim">FOUNDED</span>
                        <span class="text-primary">2026.03</span>
                    </div>
                    <div class="meta-row">
                        <span class="text-dim">HQ LOCATION</span>
                        <span class="text-primary">HYD</span>
                    </div>
                </div>
            </div>
        </div>
        `;
        if (window.initScrollReveal) {
            window.initScrollReveal();
        }
    }
}
customElements.define('about-parameters', AboutParameters);
