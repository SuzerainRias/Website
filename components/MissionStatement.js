class MissionStatement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <section class="mission section-panel">
            <div class="panel-container fade-up delay-1">
                <div class="panel-header">
                    <span class="panel-id">SEC 01</span>
                    <span class="panel-title">MISSION & VISION STATEMENT</span>
                </div>
                
                <div class="panel-body">
                    <div style="display: flex; gap: var(--space-xl); margin-bottom: var(--space-xl); flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 300px;">
                            <h3 style="color: var(--accent-blue); font-family: var(--font-mono); font-size: 14px; letter-spacing: 0.1em; margin-bottom: var(--space-sm);">MISSION</h3>
                            <h2 class="mission-text" style="font-size: clamp(1.5rem, 3vw, 2rem); margin-bottom: 0;">
                                To build the infrastructure that enables faster, higher-quality, and more cost-effective development of space systems.
                            </h2>
                        </div>
                        <div style="flex: 1; min-width: 300px;">
                            <h3 style="color: var(--accent-red); font-family: var(--font-mono); font-size: 14px; letter-spacing: 0.1em; margin-bottom: var(--space-sm);">VISION</h3>
                            <h2 class="mission-text" style="font-size: clamp(1.5rem, 3vw, 2rem); margin-bottom: 0;">
                                A future where any type of spacecraft can be developed within weeks, achieving true space accessibility and dramatically reducing complexity.
                            </h2>
                        </div>
                    </div>
                    
                    <div class="mission-grid">
                        <div class="grid-card" style="display: flex; justify-content: center; align-items: center; min-height: 120px;">
                            <div class="card-header" style="margin: 0; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                                <span class="card-icon" style="font-size: 24px; line-height: 1;">↗</span>
                                <h3 style="margin: 0; line-height: 1;">SOFTWARE</h3>
                            </div>
                        </div>
                        
                        <div class="grid-card" style="display: flex; justify-content: center; align-items: center; min-height: 120px;">
                            <div class="card-header" style="margin: 0; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                                <span class="card-icon" style="font-size: 24px; line-height: 1;">⊛</span>
                                <h3 style="margin: 0; line-height: 1;">HARDWARE</h3>
                            </div>
                        </div>
                        
                        <div class="grid-card" style="display: flex; justify-content: center; align-items: center; min-height: 120px;">
                            <div class="card-header" style="margin: 0; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                                <span class="card-icon" style="font-size: 24px; line-height: 1;">⎔</span>
                                <h3 style="margin: 0; line-height: 1;">FULL STACK</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
    }
}
customElements.define('mission-statement', MissionStatement);
