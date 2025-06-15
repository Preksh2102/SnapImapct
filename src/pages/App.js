import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Camera from '../components/Camera';
import AdBanner from '../components/AdBanner';
import ChallengeInfo from '../components/ChallengeInfo';
import Challenges from '../components/Challenges';
import Chat from './Chat';
import Login from './Login';
import HomePage from './HomePage';



export default function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/">Home</Link> | <Link to="/info">Info</Link> | <Link to="/challenges">Challenges</Link> |
        <Link to="/chat">Chat</Link> | <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<><Camera /><AdBanner /></>} />
        <Route path="/info" element={<ChallengeInfo />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </Router>
  );
}
