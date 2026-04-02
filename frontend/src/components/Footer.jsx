import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>О Гдето</h3>
          <p>Гдето - это платформа для поиска и размещения объявлений о недвижимости в Казахстане. Мы помогаем людям найти свой идеальный дом или квартиру.</p>
        </div>

        <div className="footer-section">
          <h3>Категории</h3>
          <ul>
            <li><a href="/">Квартиры в аренду</a></li>
            <li><a href="/">Квартиры на продажу</a></li>
            <li><a href="/">Дома и коттеджи</a></li>
            <li><a href="/">Коммерческая недвижимость</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Помощь</h3>
          <ul>
            <li><a href="/">Как разместить объявление</a></li>
            <li><a href="/">Как искать объявления</a></li>
            <li><a href="/">Часто задаваемые вопросы</a></li>
            <li><a href="/">Контакты поддержки</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Контакты</h3>
          <p>📧 Email: info@gdeto.kz</p>
          <p>📞 Телефон: +7 (7XX) XXX-XX-XX</p>
          <p>🏢 Астана, Казахстан</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Гдето. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;
