class AboutSocials extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="socials-grid">
            <div class="team-section fade-up">
                <div class="team-title">SOCIALS</div>
                <div class="team-grid">
                    <a href="https://x.com/EasternVeil" target="_blank" rel="noopener noreferrer" class="team-member" style="text-decoration: none; cursor: pointer;">
                        <span class="member-name">𝕏</span>
                        <span class="member-role text-muted">X / TWITTER</span>
                    </a>
                    <a href="https://www.linkedin.com/company/eastern-veil1" target="_blank" rel="noopener noreferrer" class="team-member" style="text-decoration: none; cursor: pointer;">
                        <span class="member-name">in</span>
                        <span class="member-role text-muted">LINKEDIN</span>
                    </a>
                    <a href="https://www.youtube.com/@Eastern_Veil" target="_blank" rel="noopener noreferrer" class="team-member" style="text-decoration: none; cursor: pointer;">
                        <span class="member-name">▶</span>
                        <span class="member-role text-muted">YOUTUBE</span>
                    </a>
                    <a href="https://www.instagram.com/eastern_veil/" target="_blank" rel="noopener noreferrer" class="team-member" style="text-decoration: none; cursor: pointer;">
                        <span class="member-name">IG</span>
                        <span class="member-role text-muted">INSTAGRAM</span>
                    </a>
                </div>
            </div>

            <div class="team-section fade-up">
                <div class="team-title">CONTACT US</div>
                <div class="team-grid">
                    <a href="mailto:hello@easternveil.com" class="team-member" style="text-decoration: none; cursor: pointer;">
                        <span class="member-name">✉</span>
                        <span class="member-role text-muted">hello@easternveil.com</span>
                    </a>
                    <a href="https://maps.google.com/?q=Office+#1,+Bhaswa+Business+Park,+Greenlands,+Hyderabad,+500016" target="_blank" rel="noopener noreferrer" class="team-member" style="text-decoration: none; cursor: pointer;">
                        <span class="member-name">⌂</span>
                        <span class="member-role text-muted">Office #1, Bhaswa Business Park,<br>Greenlands, Hyderabad, 500016</span>
                    </a>
                </div>
            </div>
        </div>
        `;
        if (window.initScrollReveal) {
            window.initScrollReveal();
        }
    }
}
customElements.define('about-socials', AboutSocials);
