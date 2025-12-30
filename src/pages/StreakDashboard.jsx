import React from 'react';
import { useStreak } from '../context/StreakContext';
import { CheckCircle, Circle, Flame } from 'lucide-react';

const StreakDashboard = () => {
    const { streak, groupMembers, userProgress, GOAL } = useStreak();

    return (
        <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Your Crew</h1>

            {/* Main Streak Card */}
            <div style={{
                background: '#fff',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
                <div style={{
                    background: '#FFF0E6',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FF4500'
                }}>
                    <Flame size={32} fill="#FF4500" />
                </div>
                <div>
                    <div style={{ fontSize: '32px', fontWeight: '800' }}>{streak}</div>
                    <div style={{ color: '#666', fontSize: '14px' }}>Day Streak</div>
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
                                    {member.pagesRead} / {GOAL} pages
                                </div>
                            </div>
                        </div>

                        <div>
                            {member.status === 'done' ? (
                                <CheckCircle color="#4CAF50" fill="#E8F5E9" size={24} />
                            ) : member.status === 'in_progress' ? (
                                // Simple ring progress can go here, using a circle outline for now
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
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <button style={{
                    width: '100%',
                    padding: '16px',
                    background: '#000',
                    color: '#fff',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '16px'
                }}>
                    Invite Friend
                </button>
            </div>
        </div>
    );
};

export default StreakDashboard;
