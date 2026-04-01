import React, { useState } from 'react';
import Filter from '../components/Filter';
import PropertyCard from '../components/PropertyCard';
import { mockProperties, generateTitle } from '../data';

const HomePage = ({ favorites, toggleFavorite }) => {
  const [isSearched, setIsSearched] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sortBy, setSortBy] = useState('new');
  
  // Пагинация (настроена на 2 карточки на страницу для наглядности)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Состояния фильтров
  const [dealType, setDealType] = useState('Аренда'); 
  const [rentPeriod, setRentPeriod] = useState('Помесячно');
  const [propertyType, setPropertyType] = useState('Квартира');
  const [selectedCity, setSelectedCity] = useState('Астана'); 
  const [rooms, setRooms] = useState('Любая');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [floorFrom, setFloorFrom] = useState('');
  const [floorTo, setFloorTo] = useState('');
  const [areaFrom, setAreaFrom] = useState('');
  const [areaTo, setAreaTo] = useState('');
  const [furnished, setFurnished] = useState('Не важно');
  const [notFirstFloor, setNotFirstFloor] = useState(false);
  const [notLastFloor, setNotLastFloor] = useState(false);
  const [withPets, setWithPets] = useState(false);
  const [withKids, setWithKids] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [fromOwner, setFromOwner] = useState(false);
  const [searchText, setSearchText] = useState('');

  const kazakhstanCities = ['Все города', 'Астана', 'Алматы', 'Шымкент', 'Актобе', 'Караганда', 'Атырау'];

  let filteredProperties = mockProperties.filter(p => {
    if (p.dealType !== dealType) return false;
    if (dealType === 'Аренда' && p.rentPeriod !== rentPeriod) return false;
    if (selectedCity !== 'Все города' && p.city !== selectedCity) return false;
    if (propertyType !== 'Тип жилья' && p.type !== propertyType) return false;
    if (rooms !== 'Любая' && p.rooms !== (rooms === '5+' ? 5 : parseInt(rooms))) return false;
    if (priceFrom && p.price < parseInt(priceFrom)) return false;
    if (priceTo && p.price > parseInt(priceTo)) return false;
    if (searchText && !`${p.address} ${p.complex} ${p.description}`.toLowerCase().includes(searchText.toLowerCase())) return false;
    return true;
  });

  if (sortBy === 'cheap') filteredProperties.sort((a, b) => a.price - b.price);
  if (sortBy === 'expensive') filteredProperties.sort((a, b) => b.price - a.price);

  // Логика пагинации
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const currentItems = filteredProperties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const clearAllFilters = () => {
    setRooms('Любая'); setPriceFrom(''); setPriceTo(''); setSearchText(''); setCurrentPage(1);
  };

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Недвижимость в Казахстане</h1>
          <Filter 
            dealType={dealType} setDealType={setDealType} rentPeriod={rentPeriod} setRentPeriod={setRentPeriod}
            propertyType={propertyType} setPropertyType={setPropertyType} selectedCity={selectedCity} setSelectedCity={setSelectedCity}
            rooms={rooms} setRooms={setRooms} priceFrom={priceFrom} setPriceFrom={setPriceFrom} priceTo={priceTo} setPriceTo={setPriceTo} 
            showAdvanced={showAdvanced} setShowAdvanced={setShowAdvanced} areaFrom={areaFrom} setAreaFrom={setAreaFrom} areaTo={areaTo} setAreaTo={setAreaTo}
            floorFrom={floorFrom} setFloorFrom={setFloorFrom} floorTo={floorTo} setFloorTo={setFloorTo} notFirstFloor={notFirstFloor} setNotFirstFloor={setNotFirstFloor} 
            notLastFloor={notLastFloor} setNotLastFloor={setNotLastFloor} furnished={furnished} setFurnished={setFurnished} withPets={withPets} setWithPets={setWithPets}
            withKids={withKids} setWithKids={setWithKids} searchText={searchText} setSearchText={setSearchText} hasPhoto={hasPhoto} setHasPhoto={setHasPhoto} 
            fromOwner={fromOwner} setFromOwner={setFromOwner} clearAllFilters={clearAllFilters} filteredCount={filteredProperties.length} kazakhstanCities={kazakhstanCities}
            handleSearch={() => { setIsSearched(true); setCurrentPage(1); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
          />
        </div>
      </section>

      {!isSearched ? (
        <section className="home-section">
          <div className="section-header"><h2>Горячие предложения</h2></div>
          <div className="compact-grid">
            {mockProperties.filter(p => p.isHot).slice(0, 4).map(p => <PropertyCard key={p.id} property={p} isList={false} generateTitle={generateTitle} />)}
          </div>
        </section>
      ) : (
        <section className="listings-section">
          <div className="section-header" style={{ alignItems: 'center' }}>
            <h2>Найдено {filteredProperties.length} объявлений</h2>
            <div style={{ display: 'flex', gap: '15px' }}>
              <select className="filter-select" value={sortBy} onChange={e => { setSortBy(e.target.value); setCurrentPage(1); }}>
                <option value="new">Сначала новые</option>
                <option value="cheap">Сначала дешевые</option>
                <option value="expensive">Сначала дорогие</option>
              </select>
              <button className="reset-btn" onClick={() => setIsSearched(false)}>Сбросить поиск</button>
            </div>
          </div>
          
          <div className="list-container">
            {currentItems.length > 0 ? (
              currentItems.map((p) => <PropertyCard key={p.id} property={p} isList={true} generateTitle={generateTitle} isFavorite={favorites.includes(p.id)} toggleFavorite={toggleFavorite} />)
            ) : (<div className="no-results"><h3>Ничего не найдено</h3></div>)}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 400, behavior: 'smooth' }); }}>
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default HomePage;