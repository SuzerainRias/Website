class TeamUpdate extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <section class="team-update section-panel">
            <div class="panel-container fade-up delay-2">
                <div class="panel-header">
                    <span class="panel-id">SEC 03</span>
                    <span class="panel-title">UPDATE FROM THE TEAM</span>
                </div>
                
                <div class="panel-body">
                    <div style="width: 100%; max-width: 100%; margin: 0 auto; aspect-ratio: 16/9; background: var(--bg-surface-elevated); border: 1px dashed var(--border-color); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
                        
                        <!-- Grid lines for sci-fi look -->
                        <div style="position: absolute; inset: 0; background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 20px 20px; pointer-events: none;"></div>

                        <div style="display: flex; flex-direction: column; align-items: center; gap: var(--space-md); z-index: 1;">
                            <span style="font-size: 24px; color: var(--text-dim);">⏵</span>
                            <span style="color: var(--text-dim); font-family: var(--font-mono); font-size: 14px; letter-spacing: 0.1em;">[VIDEO FEED PENDING]</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
    }
}
customElements.define('team-update', TeamUpdate);
