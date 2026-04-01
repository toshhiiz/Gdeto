import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property, isList, generateTitle }) => {
  if (!isList) {
    return (
      <div className="compact-card">
        <Link to={`/property/${property.id}`} className="compact-image">
          <img src={property.img} alt="фото" />
          <div className="compact-deal-type">{property.dealType}</div>
        </Link>
        <div className="compact-info">
          <div className="compact-price">
            {property.price.toLocaleString('ru-RU')} ₸ {property.rentPeriod === 'Помесячно' && <span>/ мес</span>}
          </div>
          <div className="compact-title">{property.rooms}-комн., {property.area} м²</div>
          <div className="compact-address">{property.city}, {property.address.split(',')[0]}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="list-card">
      <div className="list-card-image">
        <img src={property.img} alt={generateTitle(property)} />
        <div className="photo-count">📷 {property.photoCount}</div>
      </div>
      <div className="list-card-content">
        <div className="card-header-row">
          <Link to={`/property/${property.id}`} className="card-main-title">{generateTitle(property)}</Link>
          <div className="card-main-price">
            {property.price.toLocaleString('ru-RU')} ₸ {property.rentPeriod === 'Помесячно' && <span>за месяц</span>}
          </div>
        </div>
        <div className="card-address-row">{property.city}, {property.address} {property.complex && `• ${property.complex}`}</div>
        <div className="card-description">{property.description}</div>
        <div className="card-meta">
          <span className="author-badge">{property.authorType}</span>
          {property.withPets && <span className="feature-badge">🐶 Можно с животными</span>}
          {property.withKids && <span className="feature-badge">👶 Можно с детьми</span>}
        </div>
        <div className="card-footer-row">
          <div className="card-stats"><span>{property.city}</span><span>• {property.date}</span></div>
          <button className="action-btn outline-btn">В Избранное</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;