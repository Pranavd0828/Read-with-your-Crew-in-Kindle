import React, { useState, useRef, useEffect } from 'react';
import { ReactReader } from 'react-reader';

const EpubReader = ({ url, onPageChange, initialLocation, theme = 'light', fontSize = 100 }) => {
    const [location, setLocation] = useState(initialLocation || 0);
    const lastPageTurnTime = useRef(Date.now());
    const renditionRef = useRef(null);

    // We need to inject our 2s timer logic here
    // react-reader's locationChanged doesn't block, so we might need to handle "next" button manually
    // OR we track time and just warn user if they are speeding.

    const handleLocationChanged = (newLoc) => {
        // Simple logic: If time since last significant change < 2s, show warning?
        // But react-reader doesn't give us a "preventDefault" on navigation easily without custom controls.
        // For prototype, we will just LOG the time spent and emit events.

        const now = Date.now();
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

    return (
        <div style={{ height: '100%', position: 'relative' }}>
            <ReactReader
                url={url}
                location={location}
                locationChanged={handleLocationChanged}
                getRendition={(rendition) => {
                    renditionRef.current = rendition;
                    // Initial setup
                    rendition.themes.fontSize(`${fontSize}%`);
                    rendition.themes.select(theme);
                }}
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
