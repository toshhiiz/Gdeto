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
    <div className="search-wrapper">
      {/* Переключатель Аренда/Продажа */}
      <div className="deal-tabs">
        <button className={`tab ${dealType === 'Аренда' ? 'active' : ''}`} onClick={() => setDealType('Аренда')}>Аренда</button>
        <button className={`tab ${dealType === 'Продажа' ? 'active' : ''}`} onClick={() => setDealType('Продажа')}>Продажа</button>
      </div>

      <div className="main-filter-card">
        {/* Верхняя строка: основные параметры */}
        <div className="filter-main-row">
          <select className="f-select" value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
            {kazakhstanCities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
          
          <select className="f-select" value={propertyType} onChange={e => setPropertyType(e.target.value)}>
            <option>Квартира</option>
            <option>Дом</option>
            <option>Офис</option>
          </select>

          {dealType === 'Аренда' && (
            <select className="f-select" value={rentPeriod} onChange={e => setRentPeriod(e.target.value)}>
              <option value="Помесячно">Помесячно</option>
              <option value="Посуточно">Посуточно</option>
            </select>
          )}

          <button className="search-main-btn" onClick={handleSearch}>
            Найти ({filteredCount})
          </button>
        </div>

        {/* Ссылка для раскрытия доп. фильтров */}
        <div className="filter-actions-row">
          <span className="toggle-link" onClick={() => setShowAdvanced(!showAdvanced)}>
            {showAdvanced ? 'Скрыть фильтры ▲' : 'Все фильтры ▼'}
          </span>
          <span className="clear-link" onClick={clearAllFilters}>Очистить всё</span>
        </div>

        {/* Выпадающая панель с доп. фильтрами */}
        {showAdvanced && (
          <div className="advanced-panel">
            <div className="adv-grid">
              <div className="adv-group">
                <label>Комнат</label>
                <div className="room-chips">
                  {roomOptions.map(r => (
                    <button 
                      key={r} 
                      className={`chip ${rooms === r ? 'active' : ''}`}
                      onClick={() => setRooms(rooms === r ? 'Любая' : r)}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="adv-group">
                <label>Цена (₸)</label>
                <div className="dual-inputs">
                  <input type="number" placeholder="От" value={priceFrom} onChange={e => setPriceFrom(e.target.value)} />
                  <input type="number" placeholder="До" value={priceTo} onChange={e => setPriceTo(e.target.value)} />
                </div>
              </div>

              <div className="adv-group">
                <label>Площадь (м²)</label>
                <div className="dual-inputs">
                  <input type="number" placeholder="От" value={areaFrom} onChange={e => setAreaFrom(e.target.value)} />
                  <input type="number" placeholder="До" value={areaTo} onChange={e => setAreaTo(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="checkbox-row">
              <label><input type="checkbox" checked={hasPhoto} onChange={e => setHasPhoto(e.target.checked)} /> С фото</label>
              <label><input type="checkbox" checked={fromOwner} onChange={e => setFromOwner(e.target.checked)} /> От хозяев</label>
              {dealType === 'Аренда' && (
                <>
                  <label><input type="checkbox" checked={withPets} onChange={e => setWithPets(e.target.checked)} /> Можно с животными</label>
                  <label><input type="checkbox" checked={withKids} onChange={e => setWithKids(e.target.checked)} /> Можно с детьми</label>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;