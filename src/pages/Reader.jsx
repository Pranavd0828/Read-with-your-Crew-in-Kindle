import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Settings, ArrowRight, X, Type, Sun, Moon, Coffee } from 'lucide-react';
import { useStreak } from '../context/StreakContext';
import { BOOKS } from '../data/books';
import CelebrationOverlay from '../components/CelebrationOverlay';
import EpubReader from '../components/EpubReader';
import LegacyReader from '../components/LegacyReader';

const resolveAsset = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (path.startsWith('blob:')) return path;
    const baseUrl = import.meta.env.BASE_URL;
    const safeBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const safePath = path.startsWith('/') ? path : `/${path}`;
    return `${safeBase}${safePath}`;
};

const Reader = () => {
    const { bookId } = useParams();
    const locationState = useLocation(); // Hook name clash with 'location' state below
    const navigate = useNavigate();
    const { logPageRead, showCelebration, closeCelebration, streak, GOAL, userProgress } = useStreak();

    // Support uploaded books passed via routing state
    const passedBook = locationState.state?.book;
    const staticBook = BOOKS.find(b => b.id === bookId);
    const book = staticBook || passedBook;

    const [location, setLocation] = useState(null);
    const [showToast, setShowToast] = useState(null);

    // Settings State
    const [showSettings, setShowSettings] = useState(false);
    const [theme, setTheme] = useState('light');
    const [fontSize, setFontSize] = useState(100);

    // Page Turn Logic
    const handlePageChange = (newLocation, timeSpent) => {
        // Validation: 2 seconds
        if (timeSpent < 2000) {
            setShowToast(`Read slightly longer to count! (${(timeSpent / 1000).toFixed(1)}s)`);
            setTimeout(() => setShowToast(null), 2000);
            return;
        }

        // If valid, log it
        logPageRead();
        console.log("Valid page read logged.");
    };

    if (!book) return <div>Book not found</div>;

    return (
        <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: theme === 'dark' ? '#1a1a1a' : '#F8F9FA', position: 'relative', overflow: 'hidden' }}>
            {showCelebration && <CelebrationOverlay streak={streak} onClose={closeCelebration} />}

            {showToast && (
                <div style={{
                    position: 'fixed',
                    bottom: '80px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#333',
                    color: '#fff',
                    padding: '10px 20px',
                    borderRadius: '30px',
                    zIndex: 2000,
                    fontWeight: '600'
                }}>
                    {showToast}
                </div>
            )}

            {/* Top Bar */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderBottom: '1px solid #eee',
                background: theme === 'dark' ? '#333' : '#fff',
                color: theme === 'dark' ? '#fff' : '#000',
                zIndex: 20, /* Higher than reader */
                position: 'relative'
            }}>
                <button onClick={() => navigate(-1)} style={{ color: 'inherit' }}><ArrowLeft /></button>
                <span style={{ fontWeight: '600', fontSize: '14px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</span>
                <button onClick={() => setShowSettings(!showSettings)} style={{ color: 'inherit' }}><Settings /></button>

                {/* Settings Popover */}
                {showSettings && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        right: '10px',
                        background: theme === 'dark' ? '#333' : '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '16px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        width: '200px',
                        color: theme === 'dark' ? '#fff' : '#000'
                    }}>
                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>THEME</div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => setTheme('light')}
                                    style={{ flex: 1, padding: '8px', background: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
                                >
                                    <Sun size={16} color="#000" />
                                </button>
                                <button
                                    onClick={() => setTheme('sepia')}
                                    style={{ flex: 1, padding: '8px', background: '#f6f1d1', border: '1px solid #ccc', borderRadius: '4px' }}
                                >
                                    <Coffee size={16} color="#5f4b32" />
                                </button>
                                <button
                                    onClick={() => setTheme('dark')}
                                    style={{ flex: 1, padding: '8px', background: '#1a1a1a', border: '1px solid #ccc', borderRadius: '4px' }}
                                >
                                    <Moon size={16} color="#fff" />
                                </button>
                            </div>
                        </div>

                        <div>
                            <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>FONT SIZE</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <button onClick={() => setFontSize(s => Math.max(50, s - 10))} style={{ padding: '4px 8px' }}>A-</button>
                                <span style={{ flex: 1, textAlign: 'center', fontSize: '12px' }}>{fontSize}%</span>
                                <button onClick={() => setFontSize(s => Math.min(200, s + 10))} style={{ padding: '4px 8px' }}>A+</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Content: EPUB READER */}
            <div style={{ flex: 1, position: 'relative' }}>
                {book.file && book.file.endsWith('.epub') ? (
                    <EpubReader
                        url={resolveAsset(book.file)}
                        initialLocation={location}
                        onPageChange={handlePageChange}
                        theme={theme}
                        fontSize={fontSize}
                    />
                ) : (
                    <LegacyReader
                        book={book}
                        onPageFinish={(newPage, timeSpent) => handlePageChange(newPage, timeSpent)}
                    />
                )}
            </div>

            {/* Progress Footer */}
            <div style={{
                padding: '10px 16px',
                borderTop: '1px solid #eee',
                fontSize: '12px',
                color: theme === 'dark' ? '#ccc' : '#666',
                display: 'flex',
                justifyContent: 'space-between',
                background: theme === 'dark' ? '#333' : '#fff',
                zIndex: 10
            }}>
                <span>Reading {book.title}</span>
                <span>
                    Daily Goal: {Math.min(userProgress, GOAL)} / {GOAL} {userProgress >= GOAL ? '(Done!)' : ''}
                </span>
            </div>
        </div>
    );
};

export default Reader;
