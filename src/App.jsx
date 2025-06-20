import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Installations from './pages/Installations';

export default function App() {
  return (
    <Router>
      <header>
        <h1>MBD Klimaatbeheer</h1>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/customers">Klanten</Link>
          <Link to="/installations">Installaties</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/installations" element={<Installations />} />
      </Routes>
    </Router>
  );
}