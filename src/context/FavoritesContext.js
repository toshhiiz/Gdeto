import React, { createContext, useState, useContext, useEffect } from 'react';
import { getFavorites, setFavorites } from '../utils/storage';

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavList] = useState([]);

  // Load favorites from storage on mount
  useEffect(() => {
    const storedFavorites = getFavorites();
    setFavList(storedFavorites);
  }, []);

  const addFavorite = (propertyId) => {
    setFavList((prev) => {
      const updated = [...new Set([...prev, propertyId])];
      setFavorites(updated);
      return updated;
    });
  };

  const removeFavorite = (propertyId) => {
    setFavList((prev) => {
      const updated = prev.filter((id) => id !== propertyId);
      setFavorites(updated);
      return updated;
    });
  };

  const toggleFavorite = (propertyId) => {
    if (favorites.includes(propertyId)) {
      removeFavorite(propertyId);
    } else {
      addFavorite(propertyId);
    }
  };

  const isFavorite = (propertyId) => favorites.includes(propertyId);

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};
