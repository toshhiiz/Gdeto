import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, generatePropertyTitle } from '../utils/formatters';
import { useFavorites } from '../context/FavoritesContext';
import { useNotification } from '../context/NotificationContext';
import { Button } from './UI/Button';
import { TOAST_MESSAGES } from '../constants/config';

const PropertyCard = memo(({ property, isList }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showSuccess, showInfo } = useNotification();
  const BACKEND_URL = 'https://gdeto.up.railway.app';
  const rawImg = property.img || property.images?.[0] || '/room.jpg';
  const imageUrl = rawImg.startsWith('/uploads') ? `${BACKEND_URL}${rawImg}` : rawImg;
  const isFav = isFavorite(property.id);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
    if (isFav) {
      showInfo(TOAST_MESSAGES.SUCCESS_REMOVE_FAVORITE);
    } else {
      showSuccess(TOAST_MESSAGES.SUCCESS_ADD_FAVORITE);
    }
  };

  if (!isList) {
    return (
      <Link to={`/property/${property.id}`} className="property-card-link">
        <div className="compact-card">
          <div className="compact-image">
            <img 
              src={imageUrl} 
              alt={generatePropertyTitle(property)}
              loading="lazy"
              onError={(e) => e.target.src = '/room.jpg'}
            />
            <div className="compact-deal-type">{property.dealType}</div>
            <button
              onClick={handleToggleFavorite}
              className="favorite-btn"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                fontSize: '20px',
                color: isFav ? '#EF4444' : '#D1D5DB',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
              aria-label={isFav ? 'Удалить из избранного' : 'Добавить в избранное'}
            >
              ♥
            </button>
          </div>
          <div className="compact-info">
            <div className="compact-price">
              {formatPrice(property.price)}
              {property.rentPeriod && <span style={{ fontSize: '12px', color: '#6B7280' }}> / {property.rentPeriod}</span>}
            </div>
            <div className="compact-title">{property.rooms}-комн., {property.area} м²</div>
            <div className="compact-address">
              📍 {property.city}, {property.address}
              {property.complex && <span> • {property.complex}</span>}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/property/${property.id}`} className="property-card-link">
      <div className="list-card">
        <div className="list-card-image">
          <img 
            src={imageUrl} 
            alt={generatePropertyTitle(property)}
            loading="lazy"
            onError={(e) => e.target.src = '/room.jpg'}
          />
          <div className="photo-count">📷 {property.photoCount}</div>
          <button
            onClick={handleToggleFavorite}
            className="favorite-btn"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              fontSize: '24px',
              color: isFav ? '#EF4444' : '#D1D5DB',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            aria-label={isFav ? 'Удалить из избранного' : 'Добавить в избранное'}
          >
            ♥
          </button>
        </div>
        <div className="list-card-content">
          <div className="card-header-row">
            <h3 className="card-main-title">{generatePropertyTitle(property)}</h3>
            <div className="card-main-price">{formatPrice(property.price)}</div>
          </div>
          <div className="card-address-row">{property.city}, {property.address} {property.complex && `• ${property.complex}`}</div>
          
          <div className="card-meta">
            <span className="author-badge">{property.authorType}</span>
            {property.withPets && <span className="feature-badge">🐶 Можно с животными</span>}
            {property.withKids && <span className="feature-badge">👶 Можно с детьми</span>}
          </div>
          <div className="card-footer-row" style={{ marginTop: 'auto', paddingTop: '16px' }}>
            <div className="card-stats"><span>{property.city}</span><span>• {property.date}</span></div>
            <Button
              variant={isFav ? 'primary' : 'outline'}
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                handleToggleFavorite(e);
              }}
            >
              {isFav ? 'В Избранном' : 'В Избранное'}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
});

PropertyCard.displayName = 'PropertyCard';

export default PropertyCard;