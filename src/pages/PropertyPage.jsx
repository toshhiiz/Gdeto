import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProperties, generateTitle } from '../data';

const PropertyPage = () => {
  const { id } = useParams();
  const property = mockProperties.find(p => p.id === parseInt(id));

  if (!property) {
    return <div className="no-results"><h2>Объявление не найдено 😔</h2><Link to="/">Вернуться на главную</Link></div>;
  }

  return (
    <div className="property-page">
      <div className="breadcrumbs">
        <Link to="/">← Вернуться к поиску</Link>
      </div>

      <div className="property-layout">
        <div className="property-main">
          <div className="property-gallery">
            <img src={property.img} alt={property.type} className="main-photo" />
          </div>
          
          <div className="property-info-block">
            <h1 className="property-title">{generateTitle(property)}</h1>
            <p className="property-address">📍 {property.city}, {property.address} {property.complex && `• ${property.complex}`}</p>
            
            <h3 className="section-title">Описание от продавца</h3>
            <p className="property-desc">{property.description}</p>
            
            <h3 className="section-title">Характеристики</h3>
            <ul className="property-features">
              <li><strong>Тип жилья:</strong> {property.type}</li>
              <li><strong>Площадь:</strong> {property.area} м²</li>
              <li><strong>Этаж:</strong> {property.floor} из {property.totalFloors}</li>
              <li><strong>Меблирована:</strong> {property.furnished}</li>
              {property.dealType === 'Аренда' && (
                <>
                  <li><strong>Животные:</strong> {property.withPets ? 'Можно' : 'Нельзя'}</li>
                  <li><strong>Дети:</strong> {property.withKids ? 'Можно' : 'Нельзя'}</li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="property-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-price">
              {property.price.toLocaleString('ru-RU')} ₸
              <span>{property.dealType === 'Аренда' ? (property.rentPeriod === 'Помесячно' ? ' / месяц' : ' / сутки') : ''}</span>
            </div>
            
            <div className="sidebar-author">
              <div className="author-avatar">{property.authorType.charAt(0)}</div>
              <div>
                <p className="author-name">{property.authorType}</p>
                <p className="author-status">На сайте с 2024 года</p>
              </div>
            </div>

            <button className="primary-btn w-full">Показать телефон</button>
            <button className="outline-btn w-full mt-10">Написать сообщение</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;