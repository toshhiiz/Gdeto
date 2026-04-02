import React, { useState, useEffect, memo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { mockProperties, generateTitle } from '../data';
import { propertiesApi } from '../api/client';
import { useFavorites } from '../context/FavoritesContext';
import { useNotification } from '../context/NotificationContext';
import { Button } from '../components/UI/Button';
import { Alert } from '../components/UI/Alert';
import { formatPrice, generatePropertyTitle } from '../utils/formatters';
import { TOAST_MESSAGES, AUTHOR_TYPES } from '../constants/config';
import L from 'leaflet';

// Fix Leaflet icon
if (typeof L !== 'undefined' && L.Icon && L.Icon.Default) {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImg, setCurrentImg] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showSuccess, showInfo } = useNotification();

  useEffect(() => {
    const fetchProperty = async () => {
      setIsLoading(true);
      try {
        const data = await propertiesApi.getById(id);
        setProperty(data);
      } catch (error) {
        console.error('Error loading property:', error);
        const mockProperty = mockProperties.find(p => p.id === parseInt(id));
        setProperty(mockProperty);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Загрузка...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-60 px-4">
        <Alert
          type="error"
          title="Объявление не найдено"
          message="Объявление с таким ID не существует или было удалено"
        />
        <Link to="/" className="mt-4">← Вернуться на главную</Link>
      </div>
    );
  }
const BACKEND_URL = 'https://gdeto.up.railway.app';
const rawImages = property.images?.length ? property.images : (property.img ? [property.img] : ['/room.jpg']);
const images = rawImages.map(img => img.startsWith('uploads') ? `${BACKEND_URL}/${img}` : img);
const currentImage = images[currentImg] || images[0] || '/room.jpg';
  const isFav = isFavorite(property.id);

  const handleToggleFavorite = () => {
    toggleFavorite(property.id);
    if (isFav) {
      showInfo(TOAST_MESSAGES.SUCCESS_REMOVE_FAVORITE);
    } else {
      showSuccess(TOAST_MESSAGES.SUCCESS_ADD_FAVORITE);
    }
  };

  const handlePrevImage = () => {
    setCurrentImg(prev => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setCurrentImg(prev => (prev + 1) % images.length);
  };

  return (
    <div className="property-page">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link to="/" className="breadcrumbs text-blue-600 hover:underline mb-6 inline-block">
          ← Вернуться к поиску
        </Link>

        <div className="property-layout grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Gallery */}
            <div className="property-gallery bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative bg-gray-900">
                <img 
                  src={currentImage} 
                  alt="фото объявления"
                  className="main-photo w-full h-96 object-cover cursor-pointer"
                  onClick={() => setIsLightboxOpen(true)}
                  loading="lazy"
                  onError={(e) => e.target.src = '/room.jpg'}
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                      aria-label="Предыдущее фото"
                    >
                      ←
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                      aria-label="Следующее фото"
                    >
                      →
                    </button>
                  </>
                )}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm">
                  {currentImg + 1} / {images.length}
                </div>
              </div>

              {images.length > 1 && (
                <div className="gallery-thumbnails flex gap-2 p-4 bg-gray-100 overflow-x-auto">
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`thumb ${idx}`}
                      loading="lazy"
                      onError={(e) => e.target.src = '/room.jpg'}
                      className={`h-20 w-20 object-cover rounded cursor-pointer transition-opacity ${
                        currentImg === idx ? 'opacity-100 ring-2 ring-blue-600' : 'opacity-60 hover:opacity-100'
                      }`}
                      onClick={() => setCurrentImg(idx)}
                      role="tab"
                      aria-selected={currentImg === idx}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Info Block */}
            <div className="property-info-block bg-white rounded-lg shadow-md p-6 mt-6">
              <h1 className="property-title text-3xl font-bold text-gray-800 mb-2">
                {generatePropertyTitle(property)}
              </h1>
              <p className="property-address text-gray-600 mb-4">
                📍 {property.city}, {property.address}
              </p>

              <div className="mb-6">
                <h3 className="section-title text-lg font-semibold text-gray-800 mb-3">Описание</h3>
                <p className="property-desc text-gray-700 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="section-title text-lg font-semibold text-gray-800 mb-3">Характеристики</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-600 text-sm">Комнаты</p>
                    <p className="text-xl font-bold text-gray-800">{property.rooms}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-600 text-sm">Площадь</p>
                    <p className="text-xl font-bold text-gray-800">{property.area} м²</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-600 text-sm">Этаж</p>
                    <p className="text-xl font-bold text-gray-800">{property.floor}/{property.totalFloors}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-600 text-sm">Статус</p>
                    <p className="text-xl font-bold text-gray-800">{property.dealType}</p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              {(property.withPets || property.withKids) && (
                <div className="flex flex-wrap gap-3">
                  {property.withPets && (
                    <span className="feature-badge bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      🐶 Можно с животными
                    </span>
                  )}
                  {property.withKids && (
                    <span className="feature-badge bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      👶 Можно с детьми
                    </span>
                  )}
                </div>
              )}

              {/* Map */}
              <div className="mt-6">
                <h3 className="section-title text-lg font-semibold text-gray-800 mb-3">Расположение на карте</h3>
                <div className="map-wrapper rounded-lg overflow-hidden border border-gray-300" style={{ height: '300px' }}>
                  <MapContainer center={property.coords} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={property.coords}>
                      <Popup>{property.address}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Price Card */}
              <div className="sidebar-card bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
                <p className="text-gray-600 text-sm mb-2">Цена</p>
                <p className="sidebar-price text-4xl font-bold text-gray-800 mb-4">
                  {formatPrice(property.price)}
                </p>
                {property.rentPeriod && (
                  <p className="text-gray-600 text-sm">{property.rentPeriod}</p>
                )}
              </div>

              {/* Action Button */}
              <Button
                onClick={handleToggleFavorite}
                variant={isFav ? 'primary' : 'outline'}
                size="lg"
                className="w-full"
              >
                {isFav ? '❤️ В избранном' : '🤍 В избранное'}
              </Button>

              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600 text-sm mb-2">Информация</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Тип объявления</p>
                    <p className="font-semibold text-gray-800">{property.authorType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Опубликовано</p>
                    <p className="font-semibold text-gray-800">{property.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Просмотров</p>
                    <p className="font-semibold text-gray-800">{property.views}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div 
          className="lightbox fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative max-h-screen">
            <img
              src={currentImage}
              alt="fullscreen"
              className="max-w-4xl max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
              loading="lazy"
              onError={(e) => e.target.src = '/room.jpg'}
            />
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="close-lightbox absolute top-4 right-4 text-white text-4xl font-light hover:text-gray-300 leading-none"
              aria-label="Закрыть"
            >
              ×
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300"
                  aria-label="Предыдущее фото"
                >
                  ←
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300"
                  aria-label="Следующее фото"
                >
                  →
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(PropertyPage);