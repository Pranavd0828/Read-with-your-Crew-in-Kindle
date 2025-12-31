import React, { useState, useEffect, useRef } from 'react';

const LegacyReader = ({ book, onPageFinish }) => {
    const [content, setContent] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const CHARS_PER_PAGE = 2000;

    // Page Turn Logic
    const pageStartTime = useRef(Date.now());
    useEffect(() => {
        pageStartTime.current = Date.now();
    }, [currentPage]);

    useEffect(() => {
        const loadMockContent = () => {
            setLoading(true);
            let specificText = "";

            if (book.title.includes("Gatsby")) {
                specificText = `In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since.\n\n"Whenever you feel like criticizing any one," he told me, "just remember that all the people in this world haven't had the advantages that you’ve had."\n\nHe didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that.`;
            } else if (book.title.includes("Zero to One")) {
                specificText = `The Challenge of the Future\n\nEvery moment in business happens only once. The next Bill Gates will not build an operating system. The next Larry Page or Sergey Brin won't make a search engine. And the next Mark Zuckerberg won't create a social network.`;
            } else if (book.title.includes("Roman")) {
                specificText = `Introduction\n\nThe Roman Empire was one of the greatest civilizations in history. It began as a small town on the banks of the Tiber River in Italy and grew to control the entire Mediterranean basin.`;
            } else {
                specificText = "Preview content not available for this legacy format. Please use the EPUB version for the full experience.";
            }

            // Replicate text to simulate length
            let fullMock = `\n\n${book.title.toUpperCase()}\n\nCHAPTER ONE\n\n${specificText}\n\n`;
            for (let k = 0; k < 10; k++) {
                fullMock += specificText + "\n\n";
            }

            const chunks = [];
            for (let i = 0; i < fullMock.length; i += CHARS_PER_PAGE) {
                chunks.push(fullMock.slice(i, i + CHARS_PER_PAGE));
            }
            setContent(chunks);
            setLoading(false);
        };

        loadMockContent();
    }, [book]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') handleNextPage();
            if (e.key === 'ArrowLeft') handlePrevPage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentPage, content]); // Re-bind when page changes to ensure latest state

    const handleNextPage = () => {
        const timeSpent = Date.now() - pageStartTime.current;
        if (onPageFinish) {
            onPageFinish(currentPage + 1, timeSpent);
        }

        if (currentPage < content.length - 1) {
            setCurrentPage(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(curr => curr - 1);
            window.scrollTo(0, 0);
        }
    };

    if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading Preview...</div>;

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
            <div
                style={{
                    flex: 1,
                    padding: '24px',
                    fontSize: '18px',
                    lineHeight: '1.8',
                    fontFamily: 'Georgia, serif',
                    overflowY: 'auto',
                    whiteSpace: 'pre-line', // Better for handling paragraph breaks than pre-wrap
                    maxWidth: '800px',
                    margin: '0 auto',
                    width: '100%'
                }}
            >
                {content[currentPage]}
            </div>

            {/* Fixed Navigation Buttons for Clarity */}
            <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '10px',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.1)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: currentPage === 0 ? 0.3 : 1
                }}
            >
                ←
            </button>

            <button
                onClick={handleNextPage}
                disabled={currentPage === content.length - 1}
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.1)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    cursor: currentPage === content.length - 1 ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: currentPage === content.length - 1 ? 0.3 : 1
                }}
            >
                →
            </button>

            <div style={{ padding: '10px 16px', textAlign: 'center', color: '#999', fontSize: '12px', borderTop: '1px solid #eee' }}>
                Legacy Preview Mode • Page {currentPage + 1} of {content.length}
            </div>
        </div>
    );
};

export default LegacyReader;
