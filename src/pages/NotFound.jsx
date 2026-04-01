import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="no-results" style={{ marginTop: '100px' }}>
      <h2>404 - Страница не найдена</h2>
      <p>Кажется, вы перешли по неверной ссылке.</p>
      <Link to="/" className="primary-btn" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'none' }}>
        На главную
      </Link>
    </div>
  );
};

export default NotFound;
