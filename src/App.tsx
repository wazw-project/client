import React from 'react';
import logo from './logo.svg';
import './App.css';
import User from './components/UserPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='' element={<User />} />
      </Routes>
    </Router>

  );
}

export default App;
