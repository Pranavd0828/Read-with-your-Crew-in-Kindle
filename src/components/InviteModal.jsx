import React, { useState } from 'react';
import { X } from 'lucide-react';

const InviteModal = ({ isOpen, onClose, onInvite }) => {
    const [inviteName, setInviteName] = useState("");
    const [inviteEmail, setInviteEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
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

        onInvite(inviteName.trim());
        setInviteName("");
        setInviteEmail("");
        onClose();
    };

    return (
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
                <form onSubmit={handleSubmit}>
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
                            onClick={onClose}
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
    );
};

export default InviteModal;
