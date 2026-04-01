export const mockProperties = [
  { 
    id: 1, dealType: 'Аренда', rentPeriod: 'Помесячно', city: 'Астана', type: 'Квартира', 
    rooms: 2, area: 60, floor: 14, totalFloors: 22, price: 250000, owner: false, 
    authorType: 'Агентство', photo: true, photoCount: 4, furnished: 'Да', 
    withPets: false, withKids: true, address: 'Есильский р-н, Мангилик Ел 40', 
    complex: 'ЖК Светлый', description: 'Светлая евродвушка в новом доме. Современный минимализм, панорамные окна.', 
    date: '1 апр.', views: 342, isHot: true, 
    img: '/images/room3.jpg', 
    images: [
      '/images/room3.jpg',
      '/images/bedroom.jpg',
      '/images/kitchen1.jpg',
      '/images/toilet3.jpg'
    ], coords: [51.0906, 71.4182] 
  },
  { 
    id: 2, dealType: 'Продажа', city: 'Алматы', type: 'Квартира', 
    rooms: 3, area: 110, floor: 5, totalFloors: 9, price: 65000000, owner: true, 
    authorType: 'Хозяин', photo: true, photoCount: 5, furnished: 'Да', 
    address: 'Бостандыкский р-н, Аль-Фараби 15', 
    complex: 'ЖК Premium', description: 'Премиальная 3-комнатная квартира с дизайнерским ремонтом. Встроенная техника.', 
    date: '31 мар.', views: 890, isHot: true, 
    img: '/images/room2.jpg', 
    images: [
      '/images/room2.jpg',
      '/images/room3.jpg',
      '/images/bedroom1.jpg',
      '/images/kitchen2.jpg',
      '/images/toilet2.jpg'
    ], coords: [43.2189, 76.9297] 
  },
  { 
    id: 3, dealType: 'Аренда', rentPeriod: 'Посуточно', city: 'Шымкент', type: 'Квартира', 
    rooms: 1, area: 35, floor: 3, totalFloors: 5, price: 12000, owner: true, 
    authorType: 'Хозяин', photo: true, photoCount: 3, furnished: 'Да', 
    withPets: true, withKids: true, address: 'Аль-Фарабийский р-н, Тауке хана 43', 
    complex: '', description: 'Уютная студия в центре. Есть всё необходимое для комфортного проживания.', 
    date: '1 апр.', views: 156, isHot: false, 
    img: '/images/room2.jpg', 
    images: [
      '/images/room2.jpg',
      '/images/kitchen3.jpg',
      '/images/toilet3.jpg'
    ], coords: [42.3155, 69.5869] 
  }
];

export const generateTitle = (p) => {
  if (p.type === 'Квартира') return `${p.rooms}-комнатная квартира, ${p.area} м², ${p.floor}/${p.totalFloors} этаж`;
  return `${p.rooms}-комнатный ${p.type.toLowerCase()}, ${p.area} м²`;
};