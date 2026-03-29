class AboutDescription extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="about-content fade-up delay-2">
            <div class="about-text" style="text-align: center; font-family: var(--font-mono);">
                <p style="font-family: 'Syne', sans-serif; font-size: 1.5rem; margin-bottom: 1.5rem;">We can go anywhere we want, why not whenever we want?</p>
                <p style="text-align: justify;">Founded to solve the problem of space accessibility through freedom of action, Eastern Veil was created to restructure the spacecraft development process from the ground up by delivering a true FBC (Faster, Better, and Cheaper) approach that dramatically changes standards and results for efficiency and quality.</p>
                <p style="text-align: justify;">Through its three prime projects; MANAS, SANAT, and VANAR; Eastern Veil integrates advances in AI with standardized design and development practices, to create a system of True Autonomous E2E Development of bespoke space systems.</p>
        </div>
        `;
        if (window.initScrollReveal) {
            window.initScrollReveal();
        }
    }
}
customElements.define('about-description', AboutDescription);
