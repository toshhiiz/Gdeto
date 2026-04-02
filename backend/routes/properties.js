const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const authMiddleware = require('../middleware/authMiddleware');

// Получить все объявления
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'name email');
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Получить одно объявление
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Validate if it's a valid MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ error: 'Объявление не найдено' });
    }
    const property = await Property.findById(id).populate('owner');
    if (!property) {
      return res.status(404).json({ error: 'Объявление не найдено' });
    }
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Создать объявление (требует аутентификации)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { dealType, rentPeriod, propertyType, city, rooms, price, area, address, description, images } = req.body;
    
    const property = new Property({
      dealType,
      rentPeriod,
      propertyType,
      city,
      rooms,
      price,
      area,
      address,
      description,
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
    let property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Объявление не найдено' });
    }

    if (property.owner.toString() !== req.userId) {
      return res.status(403).json({ error: 'Нет прав для изменения' });
    }

    property = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

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
      return res.status(404).json({ error: 'Объявление не найдено' });
    }

    if (property.owner.toString() !== req.userId) {
      return res.status(403).json({ error: 'Нет прав для удаления' });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Объявление удалено' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
