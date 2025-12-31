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

    const handleNextPage = () => {
        // Simple check just to pass up
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

    if (loading) return <div>Loading Preview...</div>;

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div
                style={{
                    flex: 1,
                    padding: '24px',
                    fontSize: '18px',
                    lineHeight: '1.6',
                    fontFamily: 'Georgia, serif',
                    overflowY: 'auto',
                    whiteSpace: 'pre-wrap'
                }}
                onClick={(e) => {
                    if (e.clientX > window.innerWidth / 2) handleNextPage();
                    else handlePrevPage();
                }}
            >
                {content[currentPage]}
            </div>

            <div style={{ padding: '10px 16px', textAlign: 'center', color: '#999', fontSize: '12px' }}>
                Legacy Preview Mode • Page {currentPage + 1} of {content.length}
            </div>
        </div>
    );
};

export default LegacyReader;
