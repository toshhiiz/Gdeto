import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { mockProperties, generateTitle } from '../data';
import L from 'leaflet';

// Исправление иконки маркера для Leaflet в React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const PropertyPage = ({ favorites, toggleFavorite }) => {
  const { id } = useParams();
  const property = mockProperties.find(p => p.id === parseInt(id));
  const [currentImg, setCurrentImg] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!property) return <div className="no-results"><h2>Объявление не найдено</h2><Link to="/">На главную</Link></div>;

  const isFav = favorites.includes(property.id);

  return (
    <div className="property-page">
      <div className="breadcrumbs"><Link to="/">← Вернуться к поиску</Link></div>

      <div className="property-layout">
        <div className="property-main">
          {/* Галерея */}
          <div className="property-gallery">
            <img 
              src={property.images[currentImg]} 
              alt="фото" 
              className="main-photo" 
              onClick={() => setIsLightboxOpen(true)}
              style={{ cursor: 'pointer' }}
            />
            <div className="gallery-thumbnails">
              {property.images.map((img, idx) => (
                <img key={idx} src={img} alt="thumb" className={currentImg === idx ? 'active-thumb' : ''} onClick={() => setCurrentImg(idx)} />
              ))}
            </div>
          </div>
          
          <div className="property-info-block">
            <h1 className="property-title">{generateTitle(property)}</h1>
            <p className="property-address">📍 {property.city}, {property.address}</p>
            
            <h3 className="section-title">Описание</h3>
            <p className="property-desc">{property.description}</p>
            
            <h3 className="section-title">Расположение на карте</h3>
            <div className="map-wrapper">
              <MapContainer center={property.coords} zoom={13} scrollWheelZoom={false} style={{ height: "300px", width: "100%", borderRadius: "8px", zIndex: 1 }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={property.coords}>
                  <Popup>{property.address}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>

        <div className="property-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-price">{property.price.toLocaleString('ru-RU')} ₸</div>
            <button className={`w-full ${isFav ? 'primary-btn' : 'outline-btn'}`} onClick={() => toggleFavorite(property.id)}>
              {isFav ? 'Удалить из избранного' : 'Добавить в избранное'}
            </button>
          </div>
        </div>
      </div>

      {/* Лайтбокс на весь экран */}
      {isLightboxOpen && (
        <div className="lightbox" onClick={() => setIsLightboxOpen(false)}>
          <span className="close-lightbox">×</span>
          <img src={property.images[currentImg]} alt="fullscreen" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
};

export default PropertyPage;