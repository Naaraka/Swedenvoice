/**
 * Narad Voice Solutions - Web Widget Loader
 * Proprietary and Confidential
 */
(function () {
    class NaradAgent extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
        }

        async connectedCallback() {
            const agentId = this.getAttribute('agent-id');
            if (!agentId) {
                console.error('Narad Error: agent-id is required');
                return;
            }

            // Load the core intelligence engine if not already present
            if (!window.customElements.get('elevenlabs-convai')) {
                await this.loadCoreEngine();
            }

            this.render(agentId);
        }

        loadCoreEngine() {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                // We point to the core engine but keep it wrapped in our logic
                script.src = 'https://elevenlabs.io/convai-widget/index.js';
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }

        render(agentId) {
            const container = document.createElement('div');
            container.innerHTML = `<elevenlabs-convai agent-id="${agentId}"></elevenlabs-convai>`;
            this.shadowRoot.appendChild(container);
        }
    }

    if (!window.customElements.get('narad-agent')) {
        window.customElements.define('narad-agent', NaradAgent);
    }
})();
