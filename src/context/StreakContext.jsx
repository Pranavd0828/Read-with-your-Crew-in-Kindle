import React, { createContext, useContext, useState, useEffect } from 'react';

const StreakContext = createContext();

export const useStreak = () => useContext(StreakContext);

export const StreakProvider = ({ children }) => {
    const [streak, setStreak] = useState(12); // Mock streak
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
        if (savedProgress) {
            setUserProgress(parseInt(savedProgress, 10));
        }
    }, []);

    // Update logic when page is turned
    const [showCelebration, setShowCelebration] = useState(false);

    // Update logic when page is turned
    const logPageRead = () => {
        setUserProgress((prev) => {
            const newVal = prev + 1;
            localStorage.setItem('todayProgress', newVal);

            // Check if goal met just now
            if (newVal === GOAL) {
                setStreak(s => s + 1);
                setShowCelebration(true);
            }

            return newVal;
        });
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
        setShowCelebration(false);
        localStorage.setItem('todayProgress', '0');
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
