const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const authMiddleware = require('../middleware/authMiddleware');
const { geocodeAddress } = require('../utils/geocoding');

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
    const { dealType, rentPeriod, propertyType, city, rooms, price, area, address, floor, totalFloors, complex, description, images, withPets, withKids, furnished, authorType, sellerName, phone, email } = req.body;
    
    // Geocode the address to get coordinates
    const coords = await geocodeAddress(address, city);
    
    const property = new Property({
      dealType,
      rentPeriod,
      propertyType,
      city,
      rooms,
      price,
      area,
      address,
      floor,
      totalFloors,
      complex,
      description,
      images,
      coords,
      withPets: withPets || false,
      withKids: withKids || false,
      furnished: furnished || 'Нет',
      authorType: authorType || 'Хозяин',
      sellerName,
      phone,
      email,
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

    // If address or city changed, re-geocode
    if (req.body.address || req.body.city) {
      const address = req.body.address || property.address;
      const city = req.body.city || property.city;
      req.body.coords = await geocodeAddress(address, city);
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
