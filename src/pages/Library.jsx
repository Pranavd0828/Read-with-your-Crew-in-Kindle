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
    const { streak } = useStreak();
    const [extraBooks, setExtraBooks] = useState([]);
    return (
        <div style={{ padding: '20px', paddingBottom: '80px' }}>
            {/* Header with Profile & Streak */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Library</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

                    {/* Upload Button */}
                    <label style={{ cursor: 'pointer', background: '#e0e0e0', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '20px', lineHeight: '1', paddingBottom: '2px' }}>+</span>
                        <input type="file" accept=".epub,.mobi" style={{ display: 'none' }} onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const url = URL.createObjectURL(file);
                                const newBook = {
                                    id: `upload-${Date.now()}`,
                                    title: file.name.replace(/\.(epub|mobi)$/i, ''),
                                    author: 'Local File',
                                    cover: null, // No cover extraction for now
                                    file: url
                                };
                                setExtraBooks(prev => [...prev, newBook]);
                            }
                        }} />
                    </label>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', padding: '4px 8px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        {/* Streak */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#FF4500' }}>{streak}</span>
                            <Flame size={16} fill="#FF4500" />
                        </div>
                        {/* Profile */}
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#333', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                            ME
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                {/* Uploaded Books */}
                {extraBooks.map(book => (
                    <Link to={`/read/${book.id}`} state={{ book }} key={book.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{
                                aspectRatio: '2/3',
                                backgroundColor: '#ddd',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <span style={{ fontSize: '32px' }}>📄</span>
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: '600', lineHeight: '1.2' }}>{book.title}</span>
                            <span style={{ fontSize: '12px', color: '#007AFF' }}>Uploaded</span>
                        </div>
                    </Link>
                ))}

                {/* Default Books */}
                {BOOKS.map(book => (
                    <Link to={`/read/${book.id}`} key={book.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{
                                aspectRatio: '2/3',
                                backgroundColor: '#ddd',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}>
                                {book.cover && !book.cover.includes('placeholder') ? (
                                    <img src={resolveAsset(book.cover)} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', textAlign: 'center', background: '#e0e0e0', color: '#555' }}>
                                        {book.title}
                                    </div>
                                )}
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: '600', lineHeight: '1.2' }}>{book.title}</span>
                            <span style={{ fontSize: '12px', color: '#666' }}>{book.author}</span>
                        </div>
                    </Link>
                ))}
            </div>
                ))}
        </div>
        </div >
    );
};

export default Library;
