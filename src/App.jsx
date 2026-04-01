import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import PropertyCard from './components/PropertyCard';
import Filter from './components/Filter'; 
import Login from './pages/Login';
import PropertyPage from './pages/PropertyPage';
import AddProperty from './pages/AddProperty';
import NotFound from './pages/NotFound';
import { mockProperties, generateTitle } from './data';

function App() {
  const [isSearched, setIsSearched] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sortBy, setSortBy] = useState('new');

  // Фильтры
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

  // Избранное (сохраняем в localStorage)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('gdeto_favs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('gdeto_favs', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const kazakhstanCities = ['Все города', 'Астана', 'Алматы', 'Шымкент', 'Актобе', 'Караганда', 'Атырау'];

  let filteredProperties = mockProperties.filter(p => {
    if (p.dealType !== dealType) return false;
    if (dealType === 'Аренда' && p.rentPeriod !== rentPeriod) return false;
    if (selectedCity !== 'Все города' && p.city !== selectedCity) return false;
    if (propertyType !== 'Тип жилья' && p.type !== propertyType) return false;
    if (rooms !== 'Любая') {
      if (rooms === '5+' && p.rooms < 5) return false;
      if (rooms !== '5+' && p.rooms !== parseInt(rooms)) return false;
    }
    if (priceFrom && p.price < parseInt(priceFrom)) return false;
    if (priceTo && p.price > parseInt(priceTo)) return false;
    if (floorFrom && p.floor < parseInt(floorFrom)) return false;
    if (floorTo && p.floor > parseInt(floorTo)) return false;
    if (areaFrom && p.area < parseInt(areaFrom)) return false;
    if (areaTo && p.area > parseInt(areaTo)) return false;
    if (notFirstFloor && p.floor === 1) return false;
    if (notLastFloor && p.floor === p.totalFloors) return false;
    if (dealType === 'Аренда' && furnished !== 'Не важно' && p.furnished !== furnished) return false;
    if (dealType === 'Аренда' && withPets && !p.withPets) return false;
    if (dealType === 'Аренда' && withKids && !p.withKids) return false;
    if (hasPhoto && !p.photo) return false;
    if (fromOwner && !p.owner) return false;
    if (searchText) {
      const q = searchText.toLowerCase();
      const matchText = `${p.address} ${p.complex} ${p.description}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }
    return true;
  });

  // Сортировка
  if (sortBy === 'cheap') filteredProperties.sort((a, b) => a.price - b.price);
  if (sortBy === 'expensive') filteredProperties.sort((a, b) => b.price - a.price);

  const hotOffers = mockProperties.filter(p => p.isHot).slice(0, 4);

  const clearAllFilters = () => {
    setRooms('Любая'); setPriceFrom(''); setPriceTo(''); setFloorFrom(''); setFloorTo(''); 
    setAreaFrom(''); setAreaTo(''); setFurnished('Не важно'); setNotFirstFloor(false); 
    setNotLastFloor(false); setWithPets(false); setWithKids(false); setHasPhoto(false); 
    setFromOwner(false); setSearchText('');
  };

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <Link to="/" className="logo" onClick={() => setIsSearched(false)}>Гдето<span>.</span></Link>
          <nav className="nav">
            <Link to="/add" className="add-btn">+ Подать объявление</Link>
            <Link to="/login" className="login-btn">Личный кабинет</Link>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <section className="hero">
                  <div className="hero-content">
                    <h1>Недвижимость в Казахстане</h1>
                    <Filter 
                      dealType={dealType} setDealType={setDealType} rentPeriod={rentPeriod} setRentPeriod={setRentPeriod}
                      propertyType={propertyType} setPropertyType={setPropertyType} selectedCity={selectedCity} setSelectedCity={setSelectedCity}
                      rooms={rooms} setRooms={setRooms} priceFrom={priceFrom} setPriceFrom={setPriceFrom}
                      priceTo={priceTo} setPriceTo={setPriceTo} showAdvanced={showAdvanced} setShowAdvanced={setShowAdvanced}
                      areaFrom={areaFrom} setAreaFrom={setAreaFrom} areaTo={areaTo} setAreaTo={setAreaTo}
                      floorFrom={floorFrom} setFloorFrom={setFloorFrom} floorTo={floorTo} setFloorTo={setFloorTo}
                      notFirstFloor={notFirstFloor} setNotFirstFloor={setNotFirstFloor} notLastFloor={notLastFloor} setNotLastFloor={setNotLastFloor}
                      furnished={furnished} setFurnished={setFurnished} withPets={withPets} setWithPets={setWithPets}
                      withKids={withKids} setWithKids={setWithKids} searchText={searchText} setSearchText={setSearchText}
                      hasPhoto={hasPhoto} setHasPhoto={setHasPhoto} fromOwner={fromOwner} setFromOwner={setFromOwner}
                      clearAllFilters={clearAllFilters} handleSearch={() => { setIsSearched(true); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                      filteredCount={filteredProperties.length} kazakhstanCities={kazakhstanCities}
                    />
                  </div>
                </section>

                {!isSearched ? (
                  <section className="home-section">
                    <div className="section-header"><h2>Горячие предложения</h2></div>
                    <div className="compact-grid">
                      {hotOffers.map(p => <PropertyCard key={p.id} property={p} isList={false} generateTitle={generateTitle} />)}
                    </div>
                  </section>
                ) : (
                  <section className="listings-section">
                    <div className="section-header" style={{ alignItems: 'center' }}>
                      <h2>Найдено {filteredProperties.length} объявлений</h2>
                      <div style={{ display: 'flex', gap: '15px' }}>
                        <select className="filter-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                          <option value="new">Сначала новые</option>
                          <option value="cheap">Сначала дешевые</option>
                          <option value="expensive">Сначала дорогие</option>
                        </select>
                        <button className="reset-btn" onClick={() => setIsSearched(false)}>Сбросить поиск</button>
                      </div>
                    </div>
                    <div className="list-container">
                      {filteredProperties.length > 0 ? (
                        filteredProperties.map((p) => (
                          <PropertyCard 
                            key={p.id} property={p} isList={true} generateTitle={generateTitle} 
                            isFavorite={favorites.includes(p.id)} toggleFavorite={toggleFavorite} 
                          />
                        ))
                      ) : (
                        <div className="no-results"><h3>Ничего не найдено</h3></div>
                      )}
                    </div>
                  </section>
                )}
              </>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/property/:id" element={<PropertyPage favorites={favorites} toggleFavorite={toggleFavorite} />} />
            <Route path="/add" element={<AddProperty />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
