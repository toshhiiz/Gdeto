import React, { useState, useMemo } from 'react';
import Filter from '../components/Filter';
import PropertyCard from '../components/PropertyCard';
import { mockProperties, generateTitle } from '../data';
import { usePagination } from '../hooks/usePagination';
import { ListCardSkeleton } from '../components/UI/Skeleton';
import { Alert } from '../components/UI/Alert';
import { ITEMS_PER_PAGE, KAZAKHSTAN_CITIES } from '../constants/config';

const HomePage = () => {
  const [isSearched, setIsSearched] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sortBy, setSortBy] = useState('new');
  const [isLoading, setIsLoading] = useState(false);

  // Filter states
  const [dealType, setDealType] = useState('Аренда'); 
  const [rentPeriod, setRentPeriod] = useState('Помесячно');
  const [propertyType, setPropertyType] = useState('Квартира');
  const [selectedCity, setSelectedCity] = useState('Астана'); 
  const [rooms, setRooms] = useState('Любая');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [searchText, setSearchText] = useState('');
  const [withPets, setWithPets] = useState(false);
  const [withKids, setWithKids] = useState(false);

  // Filter properties
  const filteredProperties = useMemo(() => {
    let filtered = mockProperties.filter(p => {
      if (p.dealType !== dealType) return false;
      if (dealType === 'Аренда' && p.rentPeriod !== rentPeriod) return false;
      if (selectedCity !== 'Все города' && p.city !== selectedCity) return false;
      if (propertyType !== 'Квартира' && p.type !== propertyType) return false;
      if (rooms !== 'Любая' && p.rooms !== (rooms === '5+' ? 5 : parseInt(rooms))) return false;
      if (priceFrom && p.price < parseInt(priceFrom)) return false;
      if (priceTo && p.price > parseInt(priceTo)) return false;
      if (withPets && !p.withPets) return false;
      if (withKids && !p.withKids) return false;
      if (searchText && !`${p.address} ${p.complex} ${p.description}`.toLowerCase().includes(searchText.toLowerCase())) return false;
      return true;
    });

    // Sort
    if (sortBy === 'cheap') filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'expensive') filtered.sort((a, b) => b.price - a.price);

    return filtered;
  }, [dealType, rentPeriod, propertyType, selectedCity, rooms, priceFrom, priceTo, searchText, withPets, withKids, sortBy]);

  // Pagination
  const { currentPage, currentItems, totalPages, goToPage } = usePagination(filteredProperties, ITEMS_PER_PAGE);

  const handleSearch = () => {
    setIsSearched(true);
    goToPage(1);
  };

  const handleReset = () => {
    setIsSearched(false);
    setRooms('Любая');
    setPriceFrom('');
    setPriceTo('');
    setSearchText('');
    setWithPets(false);
    setWithKids(false);
    setDealType('Аренда');
    setRentPeriod('Помесячно');
    setSelectedCity('Астана');
  };

  const clearAllFilters = () => {
    setRooms('Любая'); 
    setPriceFrom(''); 
    setPriceTo(''); 
    setSearchText('');
    goToPage(1);
  };

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Недвижимость в Казахстане</h1>
          <Filter 
            dealType={dealType} 
            setDealType={setDealType} 
            rentPeriod={rentPeriod} 
            setRentPeriod={setRentPeriod}
            propertyType={propertyType} 
            setPropertyType={setPropertyType} 
            selectedCity={selectedCity} 
            setSelectedCity={setSelectedCity}
            rooms={rooms} 
            setRooms={setRooms} 
            priceFrom={priceFrom} 
            setPriceFrom={setPriceFrom} 
            priceTo={priceTo} 
            setPriceTo={setPriceTo} 
            showAdvanced={showAdvanced} 
            setShowAdvanced={setShowAdvanced}
            withPets={withPets} 
            setWithPets={setWithPets}
            withKids={withKids} 
            setWithKids={setWithKids}
            searchText={searchText} 
            setSearchText={setSearchText}
            clearAllFilters={clearAllFilters} 
            filteredCount={filteredProperties.length}
            kazakhstanCities={KAZAKHSTAN_CITIES}
            handleSearch={handleSearch}
          />
        </div>
      </section>

      {!isSearched ? (
        <section className="home-section">
          <div className="section-header"><h2>Горячие предложения</h2></div>
          <div className="compact-grid">
            {mockProperties.filter(p => p.isHot).map(p => (
              <PropertyCard key={p.id} property={p} isList={false} />
            ))}
          </div>
        </section>
      ) : (
        <section className="listings-section">
          <div className="section-header" style={{ alignItems: 'center' }}>
            <h2>Найдено {filteredProperties.length} объявлений</h2>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <select 
                className="filter-select" 
                value={sortBy} 
                onChange={e => setSortBy(e.target.value)}
                aria-label="Сортировка объявлений"
              >
                <option value="new">Сначала новые</option>
                <option value="cheap">Сначала дешевые</option>
                <option value="expensive">Сначала дорогие</option>
              </select>
              <button className="reset-btn" onClick={handleReset}>Сбросить поиск</button>
            </div>
          </div>
          
          <div className="list-container">
            {isLoading ? (
              <>
                <ListCardSkeleton />
                <ListCardSkeleton />
              </>
            ) : currentItems.length > 0 ? (
              currentItems.map((p) => (
                <PropertyCard key={p.id} property={p} isList={true} />
              ))
            ) : (
              <Alert 
                type="info" 
                title="Объявления не найдены" 
                message="Попробуйте изменить критерии поиска"
              />
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button 
                  key={i} 
                  className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`} 
                  onClick={() => goToPage(i + 1)}
                  aria-label={`Страница ${i + 1}`}
                  aria-current={currentPage === i + 1 ? 'page' : undefined}
                >
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