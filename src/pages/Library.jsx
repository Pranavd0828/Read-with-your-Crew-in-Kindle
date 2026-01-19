import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BOOKS } from '../data/books';
import { Flame } from 'lucide-react';
import { useStreak } from '../context/StreakContext';

const resolveAsset = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.BASE_URL;
    // Ensure we don't double slash if base ends with / and path starts with /
    const safeBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const safePath = path.startsWith('/') ? path : `/${path}`;
    return `${safeBase}${safePath}`;
};

const Library = () => {
    const { streak, userProgress, GOAL, currentBookId } = useStreak();
    const [extraBooks, setExtraBooks] = useState([]);

    // Find the last read book object to display title/cover
    const lastReadBook = BOOKS.find(b => b.id === currentBookId) || extraBooks.find(b => b.id === currentBookId);

    // Calculate progress for Ring
    const progressPercent = Math.min(100, (userProgress / GOAL) * 100);
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

    return (
        <div style={{ paddingBottom: '80px', background: '#f8f9fa', minHeight: '100vh' }}>

            {/* HERO SECTION: Daily Challenge */}
            <div style={{
                background: '#fff',
                padding: '24px 20px',
                borderBottomLeftRadius: '24px',
                borderBottomRightRadius: '24px',
                marginBottom: '24px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div>
                        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0, lineHeight: 1.2 }}>Good Evening, <br /> Reader</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                            <Flame size={18} fill="#FF4500" stroke="#FF4500" />
                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{streak} Day Streak</span>
                        </div>
                    </div>

                    {/* Ring Progress */}
                    <div style={{ position: 'relative', width: '70px', height: '70px' }}>
                        <svg width="70" height="70" style={{ transform: 'rotate(-90deg)' }}>
                            <circle
                                cx="35" cy="35" r={radius}
                                stroke="#eee" strokeWidth="6" fill="transparent"
                            />
                            <circle
                                cx="35" cy="35" r={radius}
                                stroke="#000" strokeWidth="6" fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{userProgress}/{GOAL}</span>
                        </div>
                    </div>
                </div>

                {/* Main Action Button */}
                {lastReadBook ? (
                    <Link to={`/read/${lastReadBook.id}`} state={{ book: lastReadBook }} style={{ textDecoration: 'none' }}>
                        <div style={{
                            background: '#000',
                            color: '#fff',
                            borderRadius: '16px',
                            padding: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}>
                            <div>
                                <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '1px' }}>Continue Reading</div>
                                <div style={{ fontSize: '16px', fontWeight: '600' }}>{lastReadBook.title}</div>
                            </div>
                            <div style={{
                                background: 'rgba(255,255,255,0.2)',
                                padding: '8px', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <span style={{ fontSize: '18px' }}>📖</span>
                            </div>
                        </div>
                    </Link>
                ) : (
                    <div style={{
                        background: '#f0f0f0',
                        color: '#999',
                        borderRadius: '16px',
                        padding: '16px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '500'
                    }}>
                        Select a book below to start your streak
                    </div>
                )}
            </div>

            {/* LIBRARY GRID */}
            <div style={{ padding: '0 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>Your Library</h2>
                    <label style={{ cursor: 'pointer', background: '#fff', padding: '6px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', border: '1px solid #eee' }}>
                        <span>+ Import</span>
                        <input type="file" accept=".epub,.mobi" style={{ display: 'none' }} onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const url = URL.createObjectURL(file);
                                const newBook = {
                                    id: `upload-${Date.now()}`,
                                    title: file.name.replace(/\.(epub|mobi)$/i, ''),
                                    author: 'Local File',
                                    cover: null,
                                    file: url
                                };
                                setExtraBooks(prev => [...prev, newBook]);
                                alert("Book imported! You can find it in your library.");
                            }
                        }} />
                    </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    {/* Uploaded Books */}
                    {extraBooks.map(book => (
                        <Link to={`/read/${book.id}`} state={{ book }} key={book.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <BookCard book={book} />
                        </Link>
                    ))}

                    {/* Default Books */}
                    {BOOKS.map(book => (
                        <Link to={`/read/${book.id}`} key={book.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <BookCard book={book} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Extracted Component for cleaner code
const BookCard = ({ book }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{
            aspectRatio: '2/3',
            backgroundColor: '#fff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            position: 'relative'
        }}>
            {book.cover && !book.cover.includes('placeholder') ? (
                <img src={resolveAsset(book.cover)} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', textAlign: 'center', background: '#f5f5f5', color: '#999', fontSize: '24px' }}>
                    📄
                </div>
            )}
        </div>
        <div>
            <div style={{ fontSize: '14px', fontWeight: '700', lineHeight: '1.3', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{book.author}</div>
        </div>
    </div>
);

export default Library;
