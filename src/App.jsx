// Narad Voice Platform - v1.0.2 - Live Bridge Updated
import React, { useState, useEffect, useRef } from 'react';
import { Conversation } from '@elevenlabs/client';
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
        <div className="logo">NARAD VOICE v2</div>
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
        <p style={{ fontSize: '0.7rem', opacity: 0.3, marginTop: '0.5rem' }}>Deploy ID: 2026-01-03-BRIDGE-V2</p>
      </footer>

      {activeModal === 'test' && (
        <VoiceBridgeModal
          agent={selectedAgent}
          onClose={closeModal}
        />
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

function VoiceBridgeModal({ agent, onClose }) {
  const [status, setStatus] = useState('idle'); // 'idle' | 'connecting' | 'connected'
  const [isSpeaking, setIsSpeaking] = useState(false);
  const conversationRef = useRef(null);

  const startConversation = async () => {
    try {
      console.log('Initiating Narad Voice Bridge session...');
      setStatus('connecting');

      // The SDK handles permissions internally, but we can check if we want
      // For now, let's rely on the SDK's robust internal management to avoid conflicts

      const conversation = await Conversation.startSession({
        agentId: agent.agentId.replace('agent_', ''),
        onConnect: () => {
          setStatus('connected');
          console.log('✅ Connected to Narad Voice Bridge');
        },
        onDisconnect: (event) => {
          setStatus('idle');
          console.log('❌ Disconnected from Narad Voice Bridge:', event);
          if (event && event.code && event.code !== 1000) {
            console.warn(`Bridge closed with code: ${event.code}. Reason: ${event.reason || 'No reason provided'}`);
          }
        },
        onError: (error) => {
          console.error('⚠️ Voice Bridge Error:', error);
          setStatus('idle');
          // More descriptive alert
          const errorMsg = typeof error === 'string' ? error : (error.message || 'Unknown error');
          alert(`Voice Bridge Error: ${errorMsg}\n\nNote: Ensure the Agent is set to "Public" in the dashboard and your microphone is enabled.`);
        },
        onModeChange: (mode) => {
          console.log('Mode Change:', mode);
          setIsSpeaking(mode.mode === 'speaking');
        },
        onMessage: (message) => {
          // Log incoming messages for debugging
          console.log('Bridge Message:', message);
        }
      });

      conversationRef.current = conversation;
      console.log('Session instance created');
    } catch (error) {
      console.error('🚨 Failed to start conversation:', error);
      setStatus('idle');

      // Handle the case where the promise might reject with a CloseEvent
      if (error instanceof CloseEvent || (error && error.constructor && error.constructor.name === 'CloseEvent')) {
        alert('Connection failed: The server closed the connection. This often happens if the Agent ID is incorrect or the agent is not set to "Public/Web SDK enabled" in the ElevenLabs dashboard.');
      } else {
        alert('Microphone access is required or the connection was interrupted. Please check your browser settings.');
      }
    }
  };

  const stopConversation = async () => {
    if (conversationRef.current) {
      await conversationRef.current.endSession();
      conversationRef.current = null;
    }
    setStatus('idle');
  };

  useEffect(() => {
    return () => {
      if (conversationRef.current) {
        conversationRef.current.endSession();
      }
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Narad Voice Bridge: {agent?.name}</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <div className={`status-indicator ${status}`}>
            {status === 'connected' ? '● LIVE' : status === 'connecting' ? 'CONNECTING...' : 'READY'}
          </div>

          <div className={`visualizer ${status === 'connected' ? 'active' : ''} ${isSpeaking ? 'speaking' : ''}`}>
            <div className="sphere"></div>
            <div className="ring"></div>
            <div className="ring"></div>
          </div>

          <div style={{ marginTop: '3rem' }}>
            {status === 'idle' ? (
              <button className="btn-primary start-call-btn" onClick={startConversation}>
                Start Conversation
              </button>
            ) : (
              <button className="btn-secondary stop-call-btn" onClick={stopConversation}>
                End Session
              </button>
            )}
          </div>

          <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {status === 'connected'
              ? "You're speaking with the Narad AI. Go ahead, ask anything!"
              : `Bridge ID: ${agent.agentId.replace('agent_', '')}`}
          </p>
          <p style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '0.5rem' }}>
            {status === 'idle' ? "Click start to begin voice interaction." : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
