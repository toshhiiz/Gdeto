// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Cities
export const KAZAKHSTAN_CITIES = ['Все города', 'Астана', 'Алматы', 'Шымкент', 'Актобе', 'Караганда', 'Атырау'];

// Property Types
export const PROPERTY_TYPES = ['Тип жилья', 'Квартира', 'Дом', 'Студия', 'Офис'];

// Deal Types
export const DEAL_TYPES = {
  RENT: 'Аренда',
  SALE: 'Продажа'
};

// Rent Periods
export const RENT_PERIODS = {
  MONTHLY: 'Помесячно',
  DAILY: 'Посуточно'
};

// Room Options
export const ROOM_OPTIONS = ['Любая', '1', '2', '3', '4', '5+'];

// Furnished Options
export const FURNISHED_OPTIONS = ['Не важно', 'Да', 'Нет'];

// Author Types
export const AUTHOR_TYPES = {
  AGENCY: 'Агентство',
  OWNER: 'Хозяин'
};

// Sorting Options
export const SORT_OPTIONS = [
  { value: 'new', label: 'Сначала новые' },
  { value: 'cheap', label: 'Сначала дешевые' },
  { value: 'expensive', label: 'Сначала дорогие' }
];

// Items Per Page
export const ITEMS_PER_PAGE = 10;

// Local Storage Keys
export const STORAGE_KEYS = {
  FAVORITES: 'gdeto_favorites',
  USER: 'gdeto_user',
  AUTH_TOKEN: 'gdeto_token',
  FILTERS: 'gdeto_filters'
};

// API Endpoints
export const API_ENDPOINTS = {
  PROPERTIES: '/properties',
  PROPERTY: (id) => `/properties/${id}`,
  FAVORITES: '/favorites',
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_ME: '/auth/me',
  AUTH_LOGOUT: '/auth/logout',
  UPLOAD: '/upload'
};

// Toast Messages
export const TOAST_MESSAGES = {
  SUCCESS_ADD_FAVORITE: 'Добавлено в избранное!',
  SUCCESS_REMOVE_FAVORITE: 'Удалено из избранного',
  SUCCESS_LOGIN: 'Успешный вход!',
  SUCCESS_REGISTER: 'Успешная регистрация!',
  ERROR_LOAD_PROPERTIES: 'Ошибка загрузки объявлений',
  ERROR_LOAD_PROPERTY: 'Ошибка загрузки объявления',
  ERROR_AUTH: 'Ошибка авторизации',
  ERROR_NETWORK: 'Ошибка сети'
};

// Validation Patterns
export const VALIDATION = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+7|7|8)?[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})$/,
  PRICE_MIN: 1000,
  PRICE_MAX: 1000000000,
  AREA_MIN: 10,
  AREA_MAX: 10000
};
