import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StreakProvider } from './context/StreakContext';
import Layout from './components/Layout';
import Library from './pages/Library';
import Reader from './pages/Reader';
import StreakDashboard from './pages/StreakDashboard';
import './styles/index.css';

function App() {
  return (
    <StreakProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Library />} />
            <Route path="streak" element={<StreakDashboard />} />
          </Route>
          {/* Reader is full screen, outside main layout or inside? Usually outside to hide nav */}
          <Route path="/read/:bookId" element={<Reader />} />
        </Routes>
      </Router>
    </StreakProvider>
  );
}

export default App;
