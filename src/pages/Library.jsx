import React from 'react';
import { Link } from 'react-router-dom';
import { BOOKS } from '../data/books';

const Library = () => {
    return (
        <div>
            {/* Header with Profile & Streak */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Library</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', padding: '4px 8px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    {/* Streak */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#FF4500' }}>12</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF4500" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.5-3.27.57 1.75 2.01 3.32 3 4.77z" /></svg>
                    </div>
                    {/* Profile */}
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#333', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                        ME
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                {BOOKS.map(book => (
                    <Link to={`/read/${book.id}`} key={book.id} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{
                            aspectRatio: '2/3',
                            backgroundColor: '#ddd',
                            marginBottom: '10px',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            {book.cover && !book.cover.includes('placeholder') ? (
                                <img src={book.cover} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', textAlign: 'center', background: '#e0e0e0', color: '#555' }}>
                                    {book.title}
                                </div>
                            )}
                        </div>
                        <span style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '2px' }}>{book.title}</span>
                        <span style={{ fontSize: '12px', color: '#666' }}>{book.author}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Library;
