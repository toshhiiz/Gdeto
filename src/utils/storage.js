import { STORAGE_KEYS } from '../constants/config';

/**
 * Get item from local storage
 */
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from storage: ${key}`, error);
    return defaultValue;
  }
};

/**
 * Set item in local storage
 */
export const setInStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to storage: ${key}`, error);
  }
};

/**
 * Remove item from local storage
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from storage: ${key}`, error);
  }
};

/**
 * Get favorites from storage
 */
export const getFavorites = () => {
  return getFromStorage(STORAGE_KEYS.FAVORITES, []);
};

/**
 * Set favorites in storage
 */
export const setFavorites = (favorites) => {
  setInStorage(STORAGE_KEYS.FAVORITES, favorites);
};

/**
 * Get user from storage
 */
export const getUser = () => {
  return getFromStorage(STORAGE_KEYS.USER, null);
};

/**
 * Set user in storage
 */
export const setUser = (user) => {
  setInStorage(STORAGE_KEYS.USER, user);
};

/**
 * Get auth token from storage
 */
export const getToken = () => {
  return getFromStorage(STORAGE_KEYS.AUTH_TOKEN, null);
};

/**
 * Set auth token in storage
 */
export const setToken = (token) => {
  setInStorage(STORAGE_KEYS.AUTH_TOKEN, token);
};

/**
 * Clear auth data
 */
export const clearAuth = () => {
  removeFromStorage(STORAGE_KEYS.USER);
  removeFromStorage(STORAGE_KEYS.AUTH_TOKEN);
};
