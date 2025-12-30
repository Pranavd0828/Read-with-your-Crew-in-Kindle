import React, { createContext, useContext, useState, useEffect } from 'react';

const StreakContext = createContext();

export const useStreak = () => useContext(StreakContext);

export const StreakProvider = ({ children }) => {
  const [streak, setStreak] = useState(12); // Mock streak
  const [userProgress, setUserProgress] = useState(0); // Pages read today
  const [groupMembers, setGroupMembers] = useState([
    { id: 1, name: 'You', pagesRead: 0, status: 'pending' },
    { id: 2, name: 'Alice', pagesRead: 3, status: 'done' },
    { id: 3, name: 'Bob', pagesRead: 1, status: 'in_progress' },
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
  const logPageRead = () => {
    setUserProgress((prev) => {
      const newVal = prev + 1;
      localStorage.setItem('todayProgress', newVal);
      return newVal;
    });
  };

  // derived state
  const isGoalMet = userProgress >= GOAL;
  
  // Sync user status in groupMembers
  useEffect(() => {
    setGroupMembers((prev) => 
      prev.map(m => m.name === 'You' 
        ? { ...m, pagesRead: userProgress, status: userProgress >= GOAL ? 'done' : userProgress > 0 ? 'in_progress' : 'pending' } 
        : m
      )
    );
  }, [userProgress]);

  return (
    <StreakContext.Provider value={{ streak, userProgress, groupMembers, logPageRead, isGoalMet, GOAL }}>
      {children}
    </StreakContext.Provider>
  );
};
