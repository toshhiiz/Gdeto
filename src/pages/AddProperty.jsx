import React from 'react';
import { Link } from 'react-router-dom';

const AddProperty = () => {
  return (
    <div className="add-property-page">
      <div className="add-container">
        <h2>Новое объявление</h2>
        <p className="subtitle">Заполните данные о вашей недвижимости</p>

        <form className="add-form" onSubmit={(e) => { e.preventDefault(); alert('Объявление отправлено на модерацию!'); }}>
          
          <div className="form-section">
            <h3>Тип сделки</h3>
            <div className="radio-group">
              <label><input type="radio" name="deal" value="Аренда" defaultChecked /> Сдаю в аренду</label>
              <label><input type="radio" name="deal" value="Продажа" /> Продаю</label>
            </div>
          </div>

          <div className="form-section">
            <h3>Базовая информация</h3>
            <div className="grid-2">
              <div className="form-group">
                <label>Тип недвижимости</label>
                <select><option>Квартира</option><option>Дом</option></select>
              </div>
              <div className="form-group">
                <label>Количество комнат</label>
                <input type="number" min="1" placeholder="Например: 2" required />
              </div>
              <div className="form-group">
                <label>Площадь (м²)</label>
                <input type="number" placeholder="45" required />
              </div>
              <div className="form-group">
                <label>Цена (₸)</label>
                <input type="number" placeholder="150000" required />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Расположение и описание</h3>
            <div className="form-group">
              <label>Город</label>
              <select><option>Астана</option><option>Алматы</option><option>Шымкент</option></select>
            </div>
            <div className="form-group">
              <label>Точный адрес</label>
              <input type="text" placeholder="Улица, номер дома..." required />
            </div>
            <div className="form-group">
              <label>Описание</label>
              <textarea rows="5" placeholder="Расскажите о преимуществах вашей недвижимости..."></textarea>
            </div>
          </div>

          <div className="form-actions">
            <Link to="/" className="cancel-btn">Отмена</Link>
            <button type="submit" className="primary-btn">Опубликовать</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;