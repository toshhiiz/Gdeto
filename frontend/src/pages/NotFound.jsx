import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="no-results">
      <h2>404</h2>
      <p>Страница не найдена</p>
      <p style={{ fontSize: '13px', marginBottom: '28px' }}>Кажется, вы перешли по неверной ссылке.</p>
      <Link to="/" className="primary-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
        На главную
      </Link>
    </div>
  );
};

export default NotFound;
