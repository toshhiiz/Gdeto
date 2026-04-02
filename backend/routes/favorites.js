const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware');

// Schema для избранного (временное хранилище в памяти, или можно создать модель)
const favoritesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Favorite = mongoose.model('Favorite', favoritesSchema);

// Получить избранное пользователя
router.get('/', authMiddleware, async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.userId }).populate('propertyId');
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Добавить в избранное
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { propertyId } = req.body;

    const existingFavorite = await Favorite.findOne({ userId: req.userId, propertyId });
    if (existingFavorite) {
      return res.status(400).json({ msg: 'Объявление уже в избранном' });
    }

    const favorite = new Favorite({ userId: req.userId, propertyId });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Удалить из избранного
router.delete('/:propertyId', authMiddleware, async (req, res) => {
  try {
    const favorite = await Favorite.findOne({ userId: req.userId, propertyId: req.params.propertyId });
    if (!favorite) {
      return res.status(404).json({ error: 'Объявление не в избранном' });
    }

    await Favorite.deleteOne({ _id: favorite._id });
    res.json({ msg: 'Удалено из избранного' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
