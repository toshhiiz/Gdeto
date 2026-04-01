import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import PropertyPage from './pages/PropertyPage';
import AddProperty from './pages/AddProperty';
import NotFound from './pages/NotFound';

function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('gdeto_favs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('gdeto_favs', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(prev => prev.filter(f => f !== id));
      toast.info('Удалено из избранного', { position: "bottom-right", autoClose: 2000 });
    } else {
      setFavorites(prev => [...prev, id]);
      toast.success('Добавлено в избранное!', { position: "bottom-right", autoClose: 2000 });
    }
  };

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <Link to="/" className="logo">Гдето<span>.</span></Link>
          <nav className="nav">
            <Link to="/add" className="add-btn">+ Подать объявление</Link>
            <Link to="/login" className="login-btn">Личный кабинет</Link>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage favorites={favorites} toggleFavorite={toggleFavorite} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/property/:id" element={<PropertyPage favorites={favorites} toggleFavorite={toggleFavorite} />} />
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
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;