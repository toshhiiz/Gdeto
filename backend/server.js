require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Статические файлы для загруженных изображений
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
    seedDatabaseIfEmpty(); // Auto-seed on startup
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Auto-seed function
async function seedDatabaseIfEmpty() {
  try {
    const Property = require('./models/Property');
    const count = await Property.countDocuments();
    
    if (count === 0) {
      console.log('📝 Database is empty. Seeding with test properties...');
      
      const testProperties = [
        {
          dealType: 'Аренда',
          rentPeriod: 'Помесячно',
          propertyType: 'Квартира',
          city: 'Астана',
          rooms: 2,
          area: 60,
          floor: 14,
          totalFloors: 22,
          price: 250000,
          address: 'Есильский р-н, Мангилик Ел 40',
          complex: 'ЖК Светлый',
          description: 'Светлая евродвушка в новом доме. Современный минимализм, панорамные окна.',
          images: ['/room3.jpg', '/bedroom.jpg', '/kitchen1.jpg', '/toilet3.jpg'],
          isHot: true
        },
        {
          dealType: 'Продажа',
          propertyType: 'Квартира',
          city: 'Алматы',
          rooms: 3,
          area: 110,
          floor: 5,
          totalFloors: 9,
          price: 65000000,
          address: 'Бостандыкский р-н, Аль-Фараби 15',
          complex: 'ЖК Premium',
          description: 'Премиальная 3-комнатная квартира с дизайнерским ремонтом. Встроенная техника.',
          images: ['/room2.jpg', '/room3.jpg', '/bedroom1.jpg', '/kitchen2.jpg', '/toilet2.jpg'],
          isHot: true
        },
        {
          dealType: 'Аренда',
          rentPeriod: 'Посуточно',
          propertyType: 'Квартира',
          city: 'Шымкент',
          rooms: 1,
          area: 35,
          floor: 3,
          totalFloors: 5,
          price: 12000,
          address: 'Аль-Фарабийский р-н, Тауке хана 43',
          description: 'Уютная студия в центре. Есть всё необходимое для комфортного проживания.',
          images: ['/room2.jpg', '/kitchen3.jpg', '/toilet3.jpg'],
          isHot: false
        }
      ];
      
      await Property.insertMany(testProperties);
      console.log('✅ Added 3 test properties to database');
    } else {
      console.log(`✅ Database contains ${count} properties`);
    }
  } catch (error) {
    console.error('Auto-seed error:', error.message);
  }
}

// Подключаем маршруты
app.use('/api/auth', require('./routes/auth'));
app.use('/api/properties', require('./routes/properties'));
app.use('/api/favorites', require('./routes/favorites'));
app.use('/api/upload', require('./routes/upload'));

// Test endpoint
app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));