import React, { useEffect, useState } from 'react';
import { Flame, X } from 'lucide-react';

const CelebrationOverlay = ({ streak, onClose }) => {
    const [scale, setScale] = useState(0.5);
    const [opacity, setOpacity] = useState(0);
    const [message, setMessage] = useState("");

    const MESSAGES = [
        "Your brain just got bigger!",
        "One more chapter won't hurt...",
        "Reality is overrated anyway.",
        "You're on fire! Keep it up!",
        "Fueling the imagination engine...",
        "Smart is the new sexy."
    ];

    useEffect(() => {
        // Animate in
        setTimeout(() => {
            setOpacity(1);
            setScale(1.2);
        }, 100);
        setTimeout(() => setScale(1), 400);

        // Pick random message
        setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.92)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            opacity: opacity,
            transition: 'opacity 0.5s ease'
        }}>
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer'
                }}
            >
                <X size={32} />
            </button>

            {/* Confetti / Firework effects (CSS Mock) */}
            <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%', height: '100%',
                pointerEvents: 'none',
                overflow: 'hidden'
            }}>
                {/* We can add simple CSS particles here if needed, keeping it clean for now */}
            </div>

            <div style={{
                transform: `scale(${scale})`,
                transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #FF9800, #FF5722)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 40px rgba(255, 87, 34, 0.6)',
                    marginBottom: '32px'
                }}>
                    <Flame size={64} fill="#fff" stroke="#fff" />
                </div>

                <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>STREAK KEPT!</h1>
                <div style={{ fontSize: '80px', fontWeight: '900', lineHeight: 1, textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                    {streak}
                </div>
                <div style={{ fontSize: '20px', opacity: 0.8, marginTop: '8px' }}>DAYS</div>

                <div style={{ marginTop: '40px', background: '#333', padding: '12px 24px', borderRadius: '30px', fontWeight: '600', fontStyle: 'italic' }}>
                    "{message}"
                </div>
            </div>
        </div>
    );
};

export default CelebrationOverlay;
