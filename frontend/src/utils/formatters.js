/**
 * Format price to locale string with currency
 */
export const formatPrice = (price) => {
  return price.toLocaleString('ru-RU') + ' ₸';
};

/**
 * Format date to readable format
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Сегодня';
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Вчера';
  }

  return date.toLocaleDateString('ru-RU', { 
    day: 'numeric', 
    month: 'short' 
  });
};

/**
 * Truncate text to maximum length
 */
export const truncateText = (text, maxLength = 150) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Format area with unit
 */
export const formatArea = (area) => {
  return area + ' м²';
};

/**
 * Generate property title
 */
export const generatePropertyTitle = (property) => {
  if (!property) return 'Объект недвижимости';
  const type = property.type || property.propertyType || 'Объект';
  const rooms = property.rooms || 0;
  const area = property.area || 0;
  const floor = property.floor || 0;
  const totalFloors = property.totalFloors || 0;
  
  if (type === 'Квартира') {
    return `${rooms}-комнатная квартира, ${formatArea(area)}, ${floor}/${totalFloors} этаж`;
  }
  return `${rooms}-комнатный ${(type || 'объект').toLowerCase()}, ${formatArea(area)}`;
};

/**
 * Extract city name
 */
export const getCityName = (city) => {
  return city === 'Все города' ? 'Казахстан' : city;
};

/**
 * Format view count
 */
export const formatViews = (views) => {
  if (views < 1000) return views.toString();
  return (views / 1000).toFixed(1) + 'K';
};

/**
 * Parse rooms filter value
 */
export const parseRoomsValue = (roomsString) => {
  if (roomsString === 'Любая' || roomsString === 'Тип жилья') return null;
  if (roomsString === '5+') return 5;
  return parseInt(roomsString);
};
