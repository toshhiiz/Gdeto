import React, { useState, useEffect, useMemo } from 'react';
import Filter from '../components/Filter';
import PropertyCard from '../components/PropertyCard';
import { mockProperties } from '../data';
import { usePagination } from '../hooks/usePagination';
import { ListCardSkeleton } from '../components/UI/Skeleton';
import { Alert } from '../components/UI/Alert';
import { ITEMS_PER_PAGE, KAZAKHSTAN_CITIES } from '../constants/config';
import { propertiesApi } from '../api/client';

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sortBy, setSortBy] = useState('new');
  const [isLoading, setIsLoading] = useState(true);

  // Основные фильтры
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

  // Новые фильтры из расширенного поиска
  const [areaFrom, setAreaFrom] = useState('');
  const [areaTo, setAreaTo] = useState('');
  const [floorFrom, setFloorFrom] = useState('');
  const [floorTo, setFloorTo] = useState('');
  const [notFirstFloor, setNotFirstFloor] = useState(false);
  const [notLastFloor, setNotLastFloor] = useState(false);
  const [furnished, setFurnished] = useState('Не важно');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [fromOwner, setFromOwner] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const data = await propertiesApi.getAll();
        setProperties(Array.isArray(data) ? data : (data.properties || []));
      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties(mockProperties);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    if (!Array.isArray(properties)) return [];
    let filtered = properties.filter(p => {
      if (p.dealType !== dealType) return false;
      if (dealType === 'Аренда' && p.rentPeriod !== rentPeriod) return false;
      if (selectedCity !== 'Все города' && p.city !== selectedCity) return false;
      if (propertyType !== 'Квартира' && p.type !== propertyType) return false;
      if (rooms !== 'Любая' && p.rooms !== (rooms === '5+' ? 5 : parseInt(rooms))) return false;
      if (priceFrom && p.price < parseInt(priceFrom)) return false;
      if (priceTo && p.price > parseInt(priceTo)) return false;
      if (withPets && !p.withPets) return false;
      if (withKids && !p.withKids) return false;
      if (areaFrom && p.area < parseInt(areaFrom)) return false;
      if (areaTo && p.area > parseInt(areaTo)) return false;
      if (hasPhoto && !p.photo) return false;
      if (fromOwner && !p.owner) return false;
      if (searchText && !`${p.address} ${p.complex} ${p.description}`.toLowerCase().includes(searchText.toLowerCase())) return false;
      return true;
    });

    if (sortBy === 'cheap') filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'expensive') filtered.sort((a, b) => b.price - a.price);

    return filtered;
  }, [properties, dealType, rentPeriod, propertyType, selectedCity, rooms, priceFrom, priceTo, searchText, withPets, withKids, sortBy, areaFrom, areaTo, hasPhoto, fromOwner]);

  const { currentPage, currentItems, totalPages, goToPage } = usePagination(filteredProperties, ITEMS_PER_PAGE);

  const handleSearch = () => {
    setIsSearched(true);
    goToPage(1);
  };

  const handleReset = () => {
    setIsSearched(false);
    clearAllFilters();
  };

  const clearAllFilters = () => {
    setRooms('Любая'); 
    setPriceFrom(''); 
    setPriceTo(''); 
    setSearchText('');
    setAreaFrom('');
    setAreaTo('');
    setFloorFrom('');
    setFloorTo('');
    setNotFirstFloor(false);
    setNotLastFloor(false);
    setFurnished('Не важно');
    setHasPhoto(false);
    setFromOwner(false);
    setWithPets(false);
    setWithKids(false);
    goToPage(1);
  };

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Недвижимость в Казахстане</h1>
          <Filter 
            dealType={dealType} setDealType={setDealType} 
            rentPeriod={rentPeriod} setRentPeriod={setRentPeriod}
            propertyType={propertyType} setPropertyType={setPropertyType} 
            selectedCity={selectedCity} setSelectedCity={setSelectedCity}
            rooms={rooms} setRooms={setRooms} 
            priceFrom={priceFrom} setPriceFrom={setPriceFrom} 
            priceTo={priceTo} setPriceTo={setPriceTo} 
            showAdvanced={showAdvanced} setShowAdvanced={setShowAdvanced}
            areaFrom={areaFrom} setAreaFrom={setAreaFrom}
            areaTo={areaTo} setAreaTo={setAreaTo}
            floorFrom={floorFrom} setFloorFrom={setFloorFrom}
            floorTo={floorTo} setFloorTo={setFloorTo}
            notFirstFloor={notFirstFloor} setNotFirstFloor={setNotFirstFloor}
            notLastFloor={notLastFloor} setNotLastFloor={setNotLastFloor}
            furnished={furnished} setFurnished={setFurnished}
            withPets={withPets} setWithPets={setWithPets}
            withKids={withKids} setWithKids={setWithKids}
            searchText={searchText} setSearchText={setSearchText}
            hasPhoto={hasPhoto} setHasPhoto={setHasPhoto}
            fromOwner={fromOwner} setFromOwner={setFromOwner}
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
            {isLoading ? (
              <ListCardSkeleton />
            ) : (
              Array.isArray(properties) ? properties.filter(p => p.isHot).map(p => (
                <PropertyCard key={p.id} property={p} isList={false} />
              )) : <p>Загрузка...</p>
            )}
          </div>
        </section>
      ) : (
        <section className="listings-section">
          <div className="section-header" style={{ alignItems: 'center' }}>
            <h2>Найдено {filteredProperties.length} объявлений</h2>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <select className="filter-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
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
              <Alert type="info" title="Объявления не найдены" message="Попробуйте изменить критерии поиска" />
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => goToPage(i + 1)}>
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