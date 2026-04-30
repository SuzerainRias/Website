class NewsTransmissions extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <section class="news section-panel">
            <div class="panel-container fade-up delay-2">
                <div class="panel-header">
                    <span class="panel-id">SEC 02</span>
                    <span class="panel-title">NEWS</span>
                </div>
                
                <div class="panel-body" style="padding: 0;">
                    <div class="news-carousel">
                        <div class="news-track">
                            <!-- Base Set (5 Template Articles) -->
                            <a href="#" class="news-card">
                                <div class="news-image-wrapper" style="background: var(--bg-surface-elevated);"><div class="news-overlay"></div></div>
                                <div class="news-content">
                                    <div class="news-meta"><span class="news-date">2026.04.15</span></div>
                                    <h3 class="news-title">TBX</h3>
                                    <div class="news-action">READ ARTICLE -></div>
                                </div>
                            </a>
                            <a href="#" class="news-card">
                                <div class="news-image-wrapper" style="background: var(--bg-surface-elevated);"><div class="news-overlay"></div></div>
                                <div class="news-content">
                                    <div class="news-meta"><span class="news-date">2026.04.12</span></div>
                                    <h3 class="news-title">TBX</h3>
                                    <div class="news-action">READ ARTICLE -></div>
                                </div>
                            </a>
                            <a href="#" class="news-card">
                                <div class="news-image-wrapper" style="background: var(--bg-surface-elevated);"><div class="news-overlay"></div></div>
                                <div class="news-content">
                                    <div class="news-meta"><span class="news-date">2026.04.09</span></div>
                                    <h3 class="news-title">TBX</h3>
                                    <div class="news-action">READ ARTICLE -></div>
                                </div>
                            </a>
                            <a href="#" class="news-card">
                                <div class="news-image-wrapper" style="background: var(--bg-surface-elevated);"><div class="news-overlay"></div></div>
                                <div class="news-content">
                                    <div class="news-meta"><span class="news-date">2026.04.02</span></div>
                                    <h3 class="news-title">TBX</h3>
                                    <div class="news-action">READ ARTICLE -></div>
                                </div>
                            </a>
                            <a href="#" class="news-card">
                                <div class="news-image-wrapper" style="background: var(--bg-surface-elevated);"><div class="news-overlay"></div></div>
                                <div class="news-content">
                                    <div class="news-meta"><span class="news-date">2026.03.28</span></div>
                                    <h3 class="news-title">TBX</h3>
                                    <div class="news-action">READ ARTICLE -></div>
                                </div>
                            </a>

                            <!-- Duplicated Set (For infinite scroll seamlessly, exact 5 items) -->
                            <a href="#" class="news-card" aria-hidden="true">
                                <div class="news-image-wrapper" style="background: var(--bg-surface-elevated);"><div class="news-overlay"></div></div>
                                <div class="news-content">
                                    <div class="news-meta"><span class="news-date">2026.04.15</span></div>
                                    <h3 class="news-title">TBX</h3>
                                    <div class="news-action">READ ARTICLE -></div>
                                </div>
                            </a>
                            <a href="#" class="news-card" aria-hidden="true">
                                <div class="news-image-wrapper" style="background: var(--bg-surface-elevated);"><div class="news-overlay"></div></div>
                                <div class="news-content">
                                    <div class="news-meta"><span class="news-date">2026.04.12</span></div>
                                    <h3 class="news-title">TBX</h3>
                                    <div class="news-action">READ ARTICLE -></div>
                                </div>
                            </a>
                            <a href="#" class="news-card" aria-hidden="true">
                                <div class="news-image-wrapper" style="background: var(--bg-surface-elevated);"><div class="news-overlay"></div></div>
                                <div class="news-content">
                                    <div class="news-meta"><span class="news-date">2026.04.09</span></div>
                                    <h3 class="news-title">TBX</h3>
                                    <div class="news-action">READ ARTICLE -></div>
                                </div>
                            </a>
                            <a href="#" class="news-card" aria-hidden="true">
                                <div class="news-image-wrapper" style="background: var(--bg-surface-elevated);"><div class="news-overlay"></div></div>
                                <div class="news-content">
                                    <div class="news-meta"><span class="news-date">2026.04.02</span></div>
                                    <h3 class="news-title">TBX</h3>
                                    <div class="news-action">READ ARTICLE -></div>
                                </div>
                            </a>
                            <a href="#" class="news-card" aria-hidden="true">
                                <div class="news-image-wrapper" style="background: var(--bg-surface-elevated);"><div class="news-overlay"></div></div>
                                <div class="news-content">
                                    <div class="news-meta"><span class="news-date">2026.03.28</span></div>
                                    <h3 class="news-title">TBX</h3>
                                    <div class="news-action">READ ARTICLE -></div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
    }
}
customElements.define('news-transmissions', NewsTransmissions);
