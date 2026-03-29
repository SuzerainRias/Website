class NavSection extends HTMLElement {
    connectedCallback() {
        const currentPath = window.location.pathname;
        const isTech = currentPath.includes('products');
        const isAbout = currentPath.includes('about');
        const isCareers = currentPath.includes('careers');
        const isHome = !isTech && !isAbout && !isCareers;

        this.innerHTML = `
            <nav class="main-nav">
                <div class="nav-container">
                    <a href="index.html" class="logo">
                        <img src="assets/logo.png" class="nav-logo-img" alt="Eastern Veil Logo">
                        <span style="font-family: 'Syne', sans-serif; font-weight: bold;">EasternVeil</span>
                    </a>
                    <div class="nav-links">
                        <a href="index.html" class="${isHome ? 'active' : ''}">HOME</a>
                        <a href="products.html" class="${isTech ? 'active' : ''}">TECH</a>
                        <a href="about.html" class="${isAbout ? 'active' : ''}">ABOUT</a>
                        <a href="careers.html" class="${isCareers ? 'active' : ''}">CAREERS</a>
                    </div>
                </div>
            </nav>
        `;
    }
}
customElements.define('nav-section', NavSection);
