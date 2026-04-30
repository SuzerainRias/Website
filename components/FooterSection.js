class FooterSection extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="main-footer">
                <div class="footer-grid">
                    <div class="footer-col">
                        <div style="display: flex; align-items: center; gap: var(--space-md);">
                            <img src="assets/logo.png" alt="Eastern Veil Logo" style="height: 90px; width: auto; mix-blend-mode: screen;">
                            <span class="footer-logo" style="margin: 0; font-size: 3.5rem; font-family: 'Syne', sans-serif; font-weight: 500; letter-spacing: normal;">Eastern Veil</span>
                        </div>
                    </div>
                    <div class="footer-col">
                        <span class="col-title">INDEX</span>
                        <a href="index.html">HOME</a>
                        <a href="products.html">THE TECH</a>
                        <a href="about.html">ABOUT</a>
                        <a href="careers.html">CAREERS</a>
                    </div>
                    <div class="footer-col">
                        <span class="col-title">SOCIALS</span>
                        <a href="https://x.com/EasternVeil" target="_blank" rel="noopener noreferrer">X / TWITTER</a>
                        <a href="https://www.linkedin.com/company/eastern-veil1" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
                        <a href="https://www.youtube.com/@Eastern_Veil" target="_blank" rel="noopener noreferrer">YOUTUBE</a>
                        <a href="https://www.instagram.com/eastern_veil/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
                    </div>
                    <div class="footer-col">
                        <span class="col-title">CONTACT US</span>
                        <a href="mailto:hello@easternveil.com">EMAIL</a>
                        <a href="https://maps.google.com/?q=Office+#1,+Bhaswa+Business+Park,+Greenlands,+Hyderabad,+500016" target="_blank" rel="noopener noreferrer">ADDRESS</a>
                    </div>
                </div>
                <div class="footer-bottom">
                    <span>© 2026 EASTERN VEIL. ALL RIGHTS RESERVED.</span>
                    <span>v1.0.4</span>
                </div>
            </footer>
        `;
    }
}
customElements.define('footer-section', FooterSection);
