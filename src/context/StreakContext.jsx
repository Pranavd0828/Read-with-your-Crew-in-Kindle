import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const StreakContext = createContext();

export const useStreak = () => useContext(StreakContext);

export const StreakProvider = ({ children }) => {
    const [streak, setStreak] = useState(0); // Mock streak
    const [userProgress, setUserProgress] = useState(0); // Pages read today

    // Privacy State
    const [isPrivate, setIsPrivate] = useState(false);

    const [groupMembers, setGroupMembers] = useState([
        { id: 1, name: 'You', pagesRead: 0, status: 'pending', currentBook: 'The Great Gatsby', isPrivate: false },
        { id: 2, name: 'Alice', pagesRead: 3, status: 'done', currentBook: 'Atomic Habits', isPrivate: true },
        { id: 3, name: 'Bob', pagesRead: 1, status: 'in_progress', currentBook: 'Sapiens', isPrivate: false },
    ]);

    const GOAL = 3;

    // Load from local storage or init
    useEffect(() => {
        const savedProgress = localStorage.getItem('todayProgress');
        const savedStreak = localStorage.getItem('currentStreak');

        if (savedProgress) {
            setUserProgress(parseInt(savedProgress, 10));
        }
        if (savedStreak) {
            setStreak(parseInt(savedStreak, 10));
        }
    }, []);

    // Update logic when page is turned
    const [showCelebration, setShowCelebration] = useState(false);

    // Global Cooldown for Page logging
    const lastLogTime = useRef(0);

    /**
     * Logs a page read event.
     * Enforces a 1s cooldown to prevent double-counting.
     * Updates daily progress and increments streak if goal is met.
     */
    const logPageRead = () => {
        const now = Date.now();
        // Prevent double counting (must be at least 1s apart)
        // Prevent double counting (must be at least 1s apart)
        if (now - lastLogTime.current < 1000) return;
        lastLogTime.current = now;

        const newVal = userProgress + 1;
        setUserProgress(newVal);
        localStorage.setItem('todayProgress', newVal);

        // Check if goal met just now
        if (newVal === GOAL) {
            console.log("Goal met! Updating streak from:", streak);
            setStreak(prevStreak => {
                const numericStreak = Number(prevStreak);
                const newStreak = numericStreak + 1;
                console.log("New Streak:", newStreak);
                localStorage.setItem('currentStreak', newStreak.toString());
                return newStreak;
            });
            setShowCelebration(true);
        }
    };

    const closeCelebration = () => setShowCelebration(false);

    const togglePrivacy = () => {
        setIsPrivate(prev => !prev);
    };

    const inviteFriend = (name) => {
        const newId = groupMembers.length + 1;
        setGroupMembers(prev => [
            ...prev,
            {
                id: newId,
                name: name,
                pagesRead: 0,
                status: 'pending',
                currentBook: 'Unknown Book',
                isPrivate: false
            }
        ]);
    };

    const resetProgress = () => {
        setUserProgress(0);
        setStreak(1); // Set to 1 for Demo (so we go 1 -> 2)
        setShowCelebration(false);
        localStorage.setItem('todayProgress', '0');
        localStorage.setItem('currentStreak', '1');
    };

    // derived state
    const isGoalMet = userProgress >= GOAL;

    // Sync user status in groupMembers
    useEffect(() => {
        setGroupMembers((prev) =>
            prev.map(m => m.name === 'You'
                ? {
                    ...m,
                    pagesRead: userProgress,
                    status: userProgress >= GOAL ? 'done' : userProgress > 0 ? 'in_progress' : 'pending',
                    isPrivate: isPrivate
                }
                : m
            )
        );
    }, [userProgress, isPrivate]);

    return (
        <StreakContext.Provider value={{
            streak,
            userProgress,
            groupMembers,
            logPageRead,
            isGoalMet,
            GOAL,
            isPrivate,
            togglePrivacy,
            inviteFriend,
            showCelebration,
            closeCelebration,
            resetProgress
        }}>
            {children}
        </StreakContext.Provider>
    );
};
