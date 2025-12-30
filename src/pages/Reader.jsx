import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings } from 'lucide-react';
import { useStreak } from '../context/StreakContext';
import { BOOKS } from '../data/books';
// MobiParser will be imported dynamically

const Reader = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const { logPageRead, userProgress, GOAL } = useStreak();

    const [content, setContent] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [fontSize, setFontSize] = useState(18);

    const book = BOOKS.find(b => b.id === bookId);

    // Pagination constants
    const CHARS_PER_PAGE = 2000;

    useEffect(() => {
        const loadBook = async () => {
            setLoading(true);
            try {
                if (!book) return;

                // Attempt to real fetch
                const response = await fetch(book.file);
                if (!response.ok) throw new Error('Fetch failed');

                const arrayBuffer = await response.arrayBuffer();
                let fullText = "";

                try {
                    // Try parsing
                    // Dynamic import to avoid top-level crashes
                    const { MobiParser } = await import('@lingo-reader/mobi-parser');

                    const file = new File([arrayBuffer], "book.mobi");
                    const parser = new MobiParser(file);
                    const result = await parser.parse();

                    // Possible structure of result: .text, .content (html), or plain string
                    // Based on common patterns for this lib:
                    if (result && typeof result.text === 'string') {
                        fullText = result.text;
                    } else if (result && typeof result.content === 'string') {
                        // Strip HTML tags for this simple reader
                        const tempDiv = document.createElement("div");
                        tempDiv.innerHTML = result.content;
                        fullText = tempDiv.innerText || tempDiv.textContent || "";
                    } else {
                        // Fallback if structure is unknown, try to stringify
                        console.warn("Unknown parser result structure", result);
                    }

                } catch (parseErr) {
                    console.warn("Mobi parsing failed or not supported in this env", parseErr);
                }

                // If parsing yielded substantial text, use it. Otherwise use Mock.
                if (fullText.length > 500) {
                    const chunks = [];
                    for (let i = 0; i < fullText.length; i += CHARS_PER_PAGE) {
                        chunks.push(fullText.slice(i, i + CHARS_PER_PAGE));
                    }
                    setContent(chunks);
                } else {
                    // --- FALLBACK MOCK ---
                    console.log("Using fallback content (parsing yielded empty or failed).");
                    const mockTitle = `Preview: ${book.title}`;
                    let mockText = `${mockTitle}\n\n(Note: Using simulated text because the .mobi file could not be fully parsed in browser.)\n\n`;

                    const chapters = ['Chapter One', 'Chapter Two', 'Chapter Three'];
                    const lorem = "The sun shone on the bricks of the old library, casting long shadows across the worn wooden floor. Dust motes danced in the light, a silent testimony to the years of quiet contemplation that had passed within these walls. It was here, amidst the scent of aging paper and leather binding, that the story truly began. ";

                    chapters.forEach(chap => {
                        mockText += `\n\n${chap.toUpperCase()}\n\n`;
                        for (let k = 0; k < 15; k++) {
                            mockText += lorem + lorem + "\n\n";
                        }
                    });
                    const chunks = [];
                    for (let i = 0; i < mockText.length; i += CHARS_PER_PAGE) {
                        chunks.push(mockText.slice(i, i + CHARS_PER_PAGE));
                    }
                    setContent(chunks);
                }

            } catch (err) {
                console.error("Failed to load book", err);
                setContent(["Error loading book content. Please try again later."]);
            } finally {
                setLoading(false);
            }
        };

        if (book) {
            loadBook();
        }
    }, [book]);

    const handleNextPage = () => {
        if (currentPage < content.length - 1) {
            setCurrentPage(curr => curr + 1);
            logPageRead();
            // Scroll to top
            window.scrollTo(0, 0);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(curr => curr - 1);
            // Scroll to top
            window.scrollTo(0, 0);
        }
    };

    if (!book) return <div>Book not found</div>;
    if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>Loading {book.title}...</div>;

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: '#fff',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Top Bar */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderBottom: '1px solid #eee',
                background: '#fff',
                zIndex: 10
            }}>
                <button onClick={() => navigate(-1)}><ArrowLeft /></button>
                <span style={{ fontWeight: '600', fontSize: '14px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</span>
                <button><Settings /></button>
            </div>

            {/* Content */}
            <div style={{
                flex: 1,
                padding: '24px',
                fontSize: `${fontSize}px`,
                lineHeight: '1.6',
                fontFamily: 'Georgia, serif',
                overflowY: 'auto',
                whiteSpace: 'pre-wrap' // Important for preserving newlines
            }} onClick={(e) => {
                const width = window.innerWidth;
                if (e.clientX > width / 2) {
                    handleNextPage();
                } else {
                    handlePrevPage();
                }
            }}>
                {content[currentPage]}
            </div>

            {/* Visual Tap Targets (Optional helper) */}
            <div style={{ position: 'absolute', bottom: '50px', width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 20px', pointerEvents: 'none' }}>
                <div style={{ opacity: 0.1, fontSize: '40px' }}>&lt;</div>
                <div style={{ opacity: 0.1, fontSize: '40px' }}>&gt;</div>
            </div>

            {/* Progress Footer */}
            <div style={{
                padding: '10px 16px',
                borderTop: '1px solid #eee',
                fontSize: '12px',
                color: '#666',
                display: 'flex',
                justifyContent: 'space-between',
                background: '#fff'
            }}>
                <span>Page {currentPage + 1} of {content.length}</span>
                <span>
                    {userProgress} / {GOAL} pages today {userProgress >= GOAL ? '(Done!)' : ''}
                </span>
            </div>
        </div>
    );
};

export default Reader;
