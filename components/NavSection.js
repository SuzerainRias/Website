class NavSection extends HTMLElement {
    connectedCallback() {
        const currentPath = window.location.pathname;
        const isTech = currentPath.includes('products') || currentPath.includes('tech');
        const isAbout = currentPath.includes('about');
        const isCareers = currentPath.includes('careers');
        const isHome = !isTech && !isAbout && !isCareers;

        this.innerHTML = `
            <nav class="main-nav">
                <div class="nav-container">
                    <a href="index.html" class="logo">
                        <img src="assets/logo.png" class="nav-logo-img" alt="Eastern Veil Logo">
                        <span style="font-family: 'Syne', sans-serif; font-weight: 500; letter-spacing: normal;">Eastern Veil</span>
                    </a>
                    
                    <button class="mobile-menu-btn" aria-label="Toggle Navigation" aria-expanded="false">
                        <span class="bar line1"></span>
                        <span class="bar line2"></span>
                        <span class="bar line3"></span>
                    </button>
                    
                    <div class="nav-links">
                        <a href="index.html" class="${isHome ? 'active' : ''}">HOME</a>
                        <a href="products.html" class="${isTech ? 'active' : ''}">TECH</a>
                        <a href="about.html" class="${isAbout ? 'active' : ''}">ABOUT</a>
                        <a href="careers.html" class="${isCareers ? 'active' : ''}">CAREERS</a>
                    </div>
                </div>
            </nav>
        `;

        const btn = this.querySelector('.mobile-menu-btn');
        const links = this.querySelector('.nav-links');
        
        btn.addEventListener('click', () => {
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !isExpanded);
            btn.classList.toggle('is-open');
            links.classList.toggle('is-open');
        });
    }
}
customElements.define('nav-section', NavSection);
