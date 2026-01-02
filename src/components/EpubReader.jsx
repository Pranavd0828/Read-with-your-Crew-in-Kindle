import React, { useState, useRef, useEffect } from 'react';
import { ReactReader } from 'react-reader';

const EpubReader = ({ url, onPageChange, initialLocation, theme = 'light', fontSize = 100 }) => {
    const [location, setLocation] = useState(initialLocation || 0);
    const lastPageTurnTime = useRef(Date.now());
    const renditionRef = useRef(null);

    // We need to inject our 2s timer logic here
    // react-reader's locationChanged doesn't block, so we might need to handle "next" button manually
    // OR we track time and just warn user if they are speeding.

    const isFirstLocation = useRef(true);
    const startupTime = useRef(Date.now());

    const handleLocationChanged = (newLoc) => {
        const now = Date.now();

        // Safety: Ignore everything during the first 4 seconds of loading
        // This prevents "auto-page-turns" from counting as reading time
        if (now - startupTime.current < 4000) {
            lastPageTurnTime.current = now;
            setLocation(newLoc);
            return;
        }

        const timeSpent = now - lastPageTurnTime.current;
        lastPageTurnTime.current = now;

        setLocation(newLoc);

        if (onPageChange) {
            onPageChange(newLoc, timeSpent);
        }
    };

    // Apply Styles when rendition or props change
    useEffect(() => {
        const rendition = renditionRef.current;
        if (rendition) {
            // Font Size
            rendition.themes.fontSize(`${fontSize}%`);

            // Themes
            rendition.themes.register('light', { body: { color: '#000', background: '#fff' } });
            rendition.themes.register('dark', { body: { color: '#ccc', background: '#1a1a1a' } });
            rendition.themes.register('sepia', { body: { color: '#5f4b32', background: '#f6f1d1' } });

            rendition.themes.select(theme);
        }
    }, [theme, fontSize, url]); // Re-run if these change

    // Keyboard Handler (Stable reference not strictly needed but good practice)
    const handleKeyDown = (e) => {
        const rendition = renditionRef.current;
        if (!rendition) return;
        if (e.key === 'ArrowRight') rendition.next();
        if (e.key === 'ArrowLeft') rendition.prev();
    };

    // Attach to window for UI focus
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Helper to attach to iframe once available
    const setRendition = (rendition) => {
        renditionRef.current = rendition;

        // Initial setup
        rendition.themes.fontSize(`${fontSize}%`);
        rendition.themes.select(theme);

        // ATTACH LISTENER DIRECTLY HERE
        rendition.on('keydown', handleKeyDown);
    };

    return (
        <div style={{ height: '100%', position: 'relative' }}>
            <ReactReader
                url={url}
                location={location}
                locationChanged={handleLocationChanged}
                getRendition={setRendition}
                title="" // Hide default title bar if we want our own
                epubOptions={{
                    flow: 'paginated',
                    manager: 'default',
                    width: '100%',
                    height: '100%'
                }}
                styles={undefined} // Let default styles apply, strict custom styles can break themes
            />
        </div>
    );
};

export default EpubReader;
