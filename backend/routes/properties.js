const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const authMiddleware = require('../middleware/authMiddleware');

// Получить все объявления
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'name email phone');
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Получить одно объявление
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner');
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Создать объявление (требует аутентификации)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, price, location, type, area, rooms, images } = req.body;
    
    const property = new Property({
      title,
      description,
      price,
      location,
      type,
      area,
      rooms,
      images,
      owner: req.userId,
    });

    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Обновить объявление
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    if (property.owner.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    Object.assign(property, req.body);
    await property.save();
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Удалить объявление
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    if (property.owner.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Property.deleteOne({ _id: req.params.id });
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
