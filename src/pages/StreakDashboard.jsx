import React, { useState, useEffect } from 'react';
import { useStreak } from '../context/StreakContext';
import { CheckCircle, Circle, Flame, Bell, X, Lock, Users, Plus } from 'lucide-react';

const NUDGES = [
    "Even the Roman Empire fell, don't let our streak follow.",
    "3 pages. That's less than a menu.",
    "Your streak is screaming for help.",
    "Reading makes you smarter. Just saying.",
    "The book isn't going to read itself (unfortunately).",
    "Don't be the reason we start from zero!",
    "I bet you read more text messages than this today."
];

const StreakDashboard = () => {
    const { streak, userProgress, groupMembers, isGoalMet, GOAL, inviteFriend, isPrivate, togglePrivacy, resetProgress } = useStreak();
    const [nudgeMessage, setNudgeMessage] = useState(null);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteName, setInviteName] = useState("");
    const [inviteEmail, setInviteEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const handleNudge = (name) => {
        const randomMsg = NUDGES[Math.floor(Math.random() * NUDGES.length)];
        setNudgeMessage(`Nudged ${name}: "${randomMsg}"`);
    };

    const handleInvite = (e) => {
        e.preventDefault();
        setEmailError("");

        // Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!inviteName.trim()) {
            return;
        }
        if (!emailRegex.test(inviteEmail)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        inviteFriend(inviteName.trim());
        setInviteName("");
        setInviteEmail("");
        setShowInviteModal(false);
        setNudgeMessage(`Invited ${inviteName}!`);
    };

    // Auto-dismiss toast after 3 seconds
    useEffect(() => {
        if (nudgeMessage) {
            const timer = setTimeout(() => {
                setNudgeMessage(null);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [nudgeMessage]);

    return (
        <div style={{ position: 'relative', minHeight: '80vh' }}>
            {/* Header with Privacy Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Your Crew</h1>
                <button
                    onClick={togglePrivacy}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: isPrivate ? '#000' : '#f0f0f0',
                        color: isPrivate ? '#fff' : '#333',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600'
                    }}
                >
                    <Lock size={12} />
                    {isPrivate ? 'Reading Private' : 'Public'}
                </button>
            </div>

            {/* Main Streak Card - New Badge Style */}
            <div style={{
                background: 'linear-gradient(135deg, #1A1A1A 0%, #000 100%)',
                padding: '24px',
                borderRadius: '16px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#fff',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
            }}>
                <div>
                    <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '4px' }}>Current Streak</div>
                    <div style={{ fontSize: '48px', fontWeight: '800', lineHeight: 1 }}>{streak}</div>
                    <div style={{ fontSize: '14px', opacity: 0.6 }}>Days active</div>
                </div>
                <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: 'rgba(255, 152, 0, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(255, 152, 0, 0.5)'
                }}>
                    <Flame size={40} fill="#FF9800" stroke="#FF9800" />
                </div>
            </div>

            <h2 style={{ fontSize: '18px', marginBottom: '16px', fontWeight: '600' }}>Today's Progress</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {groupMembers.map(member => (
                    <div key={member.id} style={{
                        background: '#fff',
                        padding: '16px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        border: '1px solid #eee'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: member.id === 1 ? '#000' : '#ddd',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                fontSize: '14px'
                            }}>
                                {member.name.charAt(0)}
                            </div>
                            <div>
                                <div style={{ fontWeight: '600' }}>{member.name}</div>
                                <div style={{ fontSize: '12px', color: '#666' }}>
                                    {member.isPrivate ?
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontStyle: 'italic' }}>
                                            <Lock size={10} /> Private Reading
                                        </span>
                                        : member.currentBook
                                    }
                                </div>
                                <div style={{ fontSize: '12px', color: '#666' }}>
                                    {Math.min(member.pagesRead, GOAL)} / {GOAL} pages
                                </div>
                            </div>
                        </div>

                        <div>
                            {member.status === 'done' ? (
                                <CheckCircle color="#4CAF50" fill="#E8F5E9" size={24} />
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {member.name !== 'You' && (
                                        <button
                                            onClick={() => handleNudge(member.name)}
                                            style={{
                                                background: '#f0f0f0',
                                                border: '1px solid #ddd',
                                                borderRadius: '20px',
                                                padding: '4px 12px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}
                                        >
                                            <Bell size={12} /> Nudge
                                        </button>
                                    )}
                                    {member.status === 'in_progress' ? (
                                        <div style={{
                                            width: '24px', height: '24px',
                                            borderRadius: '50%',
                                            border: '3px solid #FF9800',
                                            borderTopColor: 'transparent',
                                            transform: 'rotate(45deg)'
                                        }} />
                                    ) : (
                                        <Circle color="#ddd" size={24} />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <button
                    onClick={() => setShowInviteModal(true)}
                    style={{
                        width: '100%',
                        padding: '16px',
                        background: '#000',
                        color: '#fff',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}>
                    <Users size={18} /> Invite Friend
                </button>
            </div>

            {/* DEMO RESET */}
            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={() => {
                        resetProgress();
                        alert("Progress reset to 0. Streak set to 11. Go read 3 pages!");
                    }}
                    style={{ background: 'none', border: '1px dashed #999', padding: '8px 16px', borderRadius: '8px', color: '#666', fontSize: '12px', cursor: 'pointer' }}
                >
                    Reset Progress (Demo)
                </button>
            </div>

            <div style={{ height: '80px' }}></div> {/* Spacer for bottom nav */}

            {/* Invite Modal */}
            {showInviteModal && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2000
                }}>
                    <div style={{
                        background: '#fff',
                        padding: '24px',
                        borderRadius: '16px',
                        width: '90%',
                        maxWidth: '320px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Invite to Crew</h3>
                        <form onSubmit={handleInvite}>
                            <input
                                type="text"
                                placeholder="Friend's Name"
                                value={inviteName}
                                onChange={(e) => setInviteName(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    marginBottom: '12px',
                                    fontSize: '16px'
                                }}
                                autoFocus
                            />

                            <input
                                type="email"
                                placeholder="Email Address"
                                value={inviteEmail}
                                onChange={(e) => {
                                    setInviteEmail(e.target.value);
                                    setEmailError("");
                                }}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: `1px solid ${emailError ? 'red' : '#ddd'}`,
                                    marginBottom: '8px',
                                    fontSize: '16px'
                                }}
                            />
                            {emailError && <div style={{ color: 'red', fontSize: '12px', marginBottom: '12px' }}>{emailError}</div>}

                            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowInviteModal(false)}
                                    style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: '#f0f0f0', fontWeight: '600', cursor: 'pointer' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: '#000', color: '#fff', fontWeight: '600', cursor: 'pointer' }}
                                >
                                    Invite
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {
                nudgeMessage && (
                    <div style={{
                        position: 'fixed',
                        bottom: '80px', // above nav
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#333',
                        color: '#fff',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        zIndex: 1000,
                        width: '90%',
                        maxWidth: '400px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        animation: 'fadeIn 0.3s ease-out'
                    }}>
                        <span style={{ fontSize: '14px', lineHeight: '1.4' }}>{nudgeMessage}</span>
                        <button onClick={() => setNudgeMessage(null)} style={{ marginLeft: '10px', color: '#aaa' }}>
                            <X size={16} />
                        </button>
                    </div>
                )
            }
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translate(-50%, 10px); }
                    to { opacity: 1; transform: translate(-50%, 0); }
                }
            `}</style>
        </div >
    );
};

export default StreakDashboard;
