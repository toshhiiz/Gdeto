import React from 'react';

const Filter = ({ 
  dealType, setDealType, 
  rentPeriod, setRentPeriod,
  propertyType, setPropertyType,
  selectedCity, setSelectedCity,
  rooms, setRooms,
  priceFrom, setPriceFrom,
  priceTo, setPriceTo,
  showAdvanced, setShowAdvanced,
  areaFrom, setAreaFrom,
  areaTo, setAreaTo,
  floorFrom, setFloorFrom,
  floorTo, setFloorTo,
  notFirstFloor, setNotFirstFloor,
  notLastFloor, setNotLastFloor,
  furnished, setFurnished,
  withPets, setWithPets,
  withKids, setWithKids,
  searchText, setSearchText,
  hasPhoto, setHasPhoto,
  fromOwner, setFromOwner,
  clearAllFilters,
  handleSearch,
  filteredCount,
  kazakhstanCities
}) => {
  const roomOptions = ['1', '2', '3', '4', '5+'];

  return (
    <div className="search-container">
      <div className="deal-type-tabs">
        <button className={`tab-btn ${dealType === 'Аренда' ? 'active' : ''}`} onClick={() => { setDealType('Аренда'); clearAllFilters(); }}>Арендовать</button>
        <button className={`tab-btn ${dealType === 'Продажа' ? 'active' : ''}`} onClick={() => { setDealType('Продажа'); clearAllFilters(); }}>Купить</button>
      </div>

      <div className="advanced-search-box">
        <div className="filter-row top-row">
          {dealType === 'Аренда' && (
            <select className="filter-select" value={rentPeriod} onChange={e => setRentPeriod(e.target.value)}>
              <option value="Помесячно">Помесячно</option>
              <option value="Посуточно">Посуточно</option>
            </select>
          )}
          
          <select className="filter-select" value={propertyType} onChange={e => setPropertyType(e.target.value)}>
            <option>Квартира</option>
            <option>Дом</option>
            <option>Коммерция</option>
          </select>

          <div className="rooms-group">
            {roomOptions.map(r => (
              <button 
                key={r} 
                className={`room-btn ${rooms === r ? 'active' : ''}`}
                onClick={() => setRooms(rooms === r ? 'Любая' : r)}
              >
                {r}
              </button>
            ))}
            <span className="rooms-label">- комн.</span>
          </div>

          <select className="filter-select" value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
            {kazakhstanCities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>

          <div className="range-inputs price-range">
            <label>Цена</label>
            <input type="number" placeholder="От" value={priceFrom} onChange={e => setPriceFrom(e.target.value)} />
            <span>-</span>
            <input type="number" placeholder="До" value={priceTo} onChange={e => setPriceTo(e.target.value)} />
            <span className="currency">₸</span>
          </div>
        </div>

        {showAdvanced && (
          <div className="advanced-options">
            <div className="advanced-grid">
              <div className="filter-group">
                <label>Общая площадь, м²</label>
                <div className="range-inputs">
                  <input type="number" placeholder="От" value={areaFrom} onChange={e => setAreaFrom(e.target.value)} />
                  <span>-</span>
                  <input type="number" placeholder="До" value={areaTo} onChange={e => setAreaTo(e.target.value)} />
                </div>
              </div>

              <div className="filter-group">
                <label>Этаж</label>
                <div className="range-inputs">
                  <input type="number" placeholder="От" value={floorFrom} onChange={e => setFloorFrom(e.target.value)} />
                  <span>-</span>
                  <input type="number" placeholder="До" value={floorTo} onChange={e => setFloorTo(e.target.value)} />
                </div>
                <div className="checkbox-stack mt-2">
                  <label className="custom-checkbox-label">
                    <input type="checkbox" checked={notFirstFloor} onChange={e => setNotFirstFloor(e.target.checked)} />
                    <span className="checkmark"></span> Не первый
                  </label>
                  <label className="custom-checkbox-label">
                    <input type="checkbox" checked={notLastFloor} onChange={e => setNotLastFloor(e.target.checked)} />
                    <span className="checkmark"></span> Не последний
                  </label>
                </div>
              </div>

              {dealType === 'Аренда' && (
                <div className="filter-group">
                  <label>Квартира меблирована</label>
                  <select className="filter-select w-full" value={furnished} onChange={e => setFurnished(e.target.value)}>
                    <option value="Не важно">Не важно</option>
                    <option value="Да">Да, полностью</option>
                    <option value="Нет">Нет (пустая)</option>
                  </select>
                  <div className="checkbox-stack mt-2">
                    <label className="custom-checkbox-label">
                      <input type="checkbox" checked={withPets} onChange={e => setWithPets(e.target.checked)} />
                      <span className="checkmark"></span> Можно с животными
                    </label>
                    <label className="custom-checkbox-label">
                      <input type="checkbox" checked={withKids} onChange={e => setWithKids(e.target.checked)} />
                      <span className="checkmark"></span> Можно с детьми
                    </label>
                  </div>
                </div>
              )}

              <div className="filter-group text-search-group">
                <label>Поиск по тексту</label>
                <input 
                  type="text" 
                  className="text-input w-full" 
                  placeholder="Например: ЖК Alakol, кирпичный дом..." 
                  value={searchText} 
                  onChange={e => setSearchText(e.target.value)} 
                />
              </div>
            </div>
          </div>
        )}

        <div className="filter-footer">
          <div className="footer-left">
            <button className="toggle-advanced-btn" onClick={() => setShowAdvanced(!showAdvanced)}>
              {showAdvanced ? 'Скрыть расширенный поиск ▲' : 'Расширенный поиск ▼'}
            </button>
            <label className="custom-checkbox-label inline-check">
              <input type="checkbox" checked={hasPhoto} onChange={e => setHasPhoto(e.target.checked)} />
              <span className="checkmark"></span> есть фото
            </label>
            <label className="custom-checkbox-label inline-check">
              <input type="checkbox" checked={fromOwner} onChange={e => setFromOwner(e.target.checked)} />
              <span className="checkmark"></span> от хозяев
            </label>
          </div>

          <div className="footer-center">
            <button className="clear-btn" onClick={clearAllFilters}>✕ Очистить всё</button>
            <button className="submit-search-btn" onClick={handleSearch}>
              Показать результаты ({filteredCount})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;