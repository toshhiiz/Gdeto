import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import PropertyCard from '../components/PropertyCard';
import { Alert } from '../components/UI/Alert';
import { Button } from '../components/UI/Button';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchUserProperties();
  }, [user, navigate]);

  const fetchUserProperties = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('gdeto_token');
      
      if (!token) {
        showError('Вы не авторизованы');
        navigate('/login');
        return;
      }

      // Получаем все свойства, потом фильтруем по owner ID
      const response = await fetch('https://gdeto.up.railway.app/api/properties', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Ошибка загрузки');

      const data = await response.json();
      // Фильтруем свойства принадлежащие текущему пользователю
      const userProps = Array.isArray(data) 
        ? data.filter(p => p.owner === user.id || p.owner?._id === user.id)
        : [];
      setProperties(userProps);
    } catch (error) {
      console.error('Error fetching properties:', error);
      showError('Ошибка загрузки объявлений');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    showSuccess('Вы вышли из аккаунта');
    navigate('/');
  };

  const handleDeleteProperty = async (propertyId) => {
    if (!window.confirm('Вы уверены, что хотите удалить это объявление?')) {
      return;
    }

    try {
      const token = localStorage.getItem('gdeto_token');
      const response = await fetch(`https://gdeto.up.railway.app/api/properties/${propertyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Ошибка удаления');

      setProperties(prev => prev.filter(p => p.id !== propertyId && p._id !== propertyId));
      showSuccess('Объявление удалено');
    } catch (error) {
      console.error('Error deleting property:', error);
      showError('Ошибка при удалении объявления');
    }
  };

  if (!user) {
    return (
      <div style={{ padding: '32px 20px', textAlign: 'center' }}>
        <Alert
          type="error"
          title="Требуется авторизация"
          message="Пожалуйста, войдите в аккаунт"
        />
        <Link to="/login">
          <Button style={{ marginTop: '16px' }}>Войти</Button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-color)', minHeight: '100vh', padding: '32px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '32px',
          paddingBottom: '24px',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
              Личный кабинет
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--text-muted)' }}>
              {user.name || 'Пользователь'}
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '12px 24px',
              background: 'var(--bg-body)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius)',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'var(--transition)'
            }}
            onMouseOver={(e) => e.target.style.background = 'var(--accent)'}
            onMouseOut={(e) => e.target.style.background = 'var(--bg-body)'}
          >
            Выйти
          </button>
        </div>

        {/* My Properties Section */}
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700' }}>
              Мои объявления ({properties.length})
            </h2>
            <Link to="/add">
              <Button variant="primary">+ Новое объявление</Button>
            </Link>
          </div>

          {isLoading ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Загрузка...</p>
          ) : properties.length === 0 ? (
            <Alert
              type="info"
              title="Нет объявлений"
              message="Вы еще не создали ни одного объявления. Создайте первое!"
            />
          ) : (
            <div className="list-container">
              {properties.map((property) => (
                <div key={property._id || property.id} style={{ position: 'relative' }}>
                  <PropertyCard property={property} isList={true} />
                  <button
                    onClick={() => handleDeleteProperty(property._id || property.id)}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      padding: '8px 16px',
                      background: '#EF4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: 'var(--radius)',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'var(--transition)',
                      zIndex: 10
                    }}
                    onMouseOver={(e) => e.target.style.background = '#DC2626'}
                    onMouseOut={(e) => e.target.style.background = '#EF4444'}
                  >
                    Удалить
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
