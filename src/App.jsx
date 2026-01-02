import React, { useState, useEffect } from 'react';
import './App.css';

const agents = [
  {
    id: 'sales-agent-001',
    name: 'Eric - Real Estate',
    description: 'Specializes in discovery and personalized Property walkthroughs.',
    image: '/assets/sales.png',
    agentId: 'agent_2601kdzvekjcfrcbbcd1bt5pv5ws' // Placeholder
  },
  {
    id: 'support-agent-001',
    name: 'Marcus - Ecommerce support',
    description: 'Patient, methodical, and expert at troubleshooting complex issues.',
    image: '/assets/support.png',
    agentId: 'agent_3501kdztrzhmebx968xayfk1kc68' // Placeholder
  },
  {
    id: 'booking-agent-001',
    name: 'Julian - Concierge & Booking',
    description: 'Handles appointments, reservations, and scheduling with grace. Syncs directly with Google Calendar and Outlook.',
    image: '/assets/booking.png',
    agentId: 'agent_9101kdzt9gq8ehttgya525n0s29z' // Placeholder
  },
  {
    id: 'faq-agent-001',
    name: 'Eric - Car Salesman',
    description: 'Helps users find a car of their dreams.',
    image: '/assets/faq.png',
    agentId: 'agent_5301kap1zr77ejxshm33cgfyhxyx' // Placeholder
  }
];

function App() {
  const [activeModal, setActiveModal] = useState(null); // 'test' | 'snippet'
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // If testing an agent, we would dynamically load the ElevenLabs script if not present
    // For this demo, we'll simulate the "Test" experience if no real ID is used
  }, []);

  const handleTest = (agent) => {
    setSelectedAgent(agent);
    setActiveModal('test');
  };

  const handleSnippet = (agent) => {
    setSelectedAgent(agent);
    setActiveModal('snippet');
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedAgent(null);
    setCopied(false);
  };

  const getSnippet = (agentId) => {
    return `<!-- Narad Voice Solutions Web SDK -->
<narad-agent agent-id="${agentId}"></narad-agent>
<script src="https://cdn.narad.ai/sdk/v1/widget.js" async></script>`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">NARAD</div>
        <div className="nav-links">
          <a href="#agents">Agents</a>
          <a href="#features">Features</a>
          <button className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Login</button>
        </div>
      </nav>

      <header>
        <h1>Narad Voice Solutions</h1>
        <p>Premium AI Voice Agents deployed in seconds. Let your business talk to your customers in real-time.</p>
      </header>

      <main id="agents" className="agents-grid">
        {agents.map((agent) => (
          <div key={agent.id} className="agent-card">
            <div className="agent-image-container">
              <img src={agent.image} alt={agent.name} className="agent-image" />
            </div>
            <div className="agent-content">
              <h2>{agent.name}</h2>
              <p>{agent.description}</p>
              <div className="agent-actions">
                <button className="btn-primary" onClick={() => handleTest(agent)}>Test Agent</button>
                <button className="btn-secondary" onClick={() => handleSnippet(agent)}>Get Code</button>
              </div>
            </div>
          </div>
        ))}
      </main>

      <footer className="footer">
        <p>&copy; 2026 Narad Voice Solutions. High-fidelity Conversational Intelligence.</p>
      </footer>

      {activeModal === 'test' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Testing: {selectedAgent?.name}</h3>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body" style={{ textAlign: 'center' }}>
              <div className="test-interface">
                <div className="wave-container">
                  {/* Simulated Waveform */}
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="wave"></div>
                </div>
                <p style={{ marginTop: '2rem', color: 'var(--text-muted)' }}>
                  Initializing Narad Voice Core...
                </p>
                <div style={{ marginTop: '2rem' }}>
                  {/* Narad Branded Widget */}
                  <narad-agent agent-id={selectedAgent?.agentId}></narad-agent>
                </div>
                <p style={{ fontSize: '0.8rem', marginTop: '1rem', opacity: 0.6 }}>
                  (Agent starts automatically once the voice bridge is established)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'snippet' && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Integration Snippet</h3>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: '1rem' }}>Copy this code and paste it before the closing <code>&lt;/body&gt;</code> tag of your website.</p>
              <div className="snippet-container">
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard(getSnippet(selectedAgent?.agentId))}
                >
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
                <pre>
                  {getSnippet(selectedAgent?.agentId)}
                </pre>
              </div>
              <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <strong>Configuration:</strong> Custom voice parameters and system prompts can be managed in the Narad Control Center.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Narad Proprietary SDK Wrapper */}
      <script src="/narad-widget.js" type="text/javascript"></script>

      <style>{`
        .wave-container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
            height: 60px;
        }
        .wave {
            width: 4px;
            height: 20px;
            background: var(--primary);
            border-radius: 2px;
            animation: wave 1s ease-in-out infinite;
        }
        .wave:nth-child(2) { animation-delay: 0.1s; height: 40px; }
        .wave:nth-child(3) { animation-delay: 0.2s; height: 30px; }

        @keyframes wave {
            0%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(1.5); }
        }
      `}</style>
    </div>
  );
}

export default App;
