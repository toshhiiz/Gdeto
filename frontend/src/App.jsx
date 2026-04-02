import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { NotificationProvider } from './context/NotificationContext';
import ErrorBoundary from './components/ErrorBoundary';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PropertyPage from './pages/PropertyPage';
import AddProperty from './pages/AddProperty';
import NotFound from './pages/NotFound';

function AppContent() {
  return (
    <div className="app-container">
      <header className="header">
        <Link to="/" className="logo">Гдето<span>.</span></Link>
        <nav className="nav">
          <Link to="/add" className="add-btn">+ Подать объявление</Link>
          <Link to="/profile" className="login-btn">Личный кабинет</Link>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/property/:id" element={<PropertyPage />} />
          <Route path="/add" element={<AddProperty />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">Гдето<span>.</span></div>
          <p>&copy; 2026 Проект «Гдето».</p>
        </div>
      </footer>
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <FavoritesProvider>
            <NotificationProvider>
              <AppContent />
            </NotificationProvider>
          </FavoritesProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;