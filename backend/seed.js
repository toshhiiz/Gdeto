require('dotenv').config();
const mongoose = require('mongoose');
const Property = require('./models/Property');

// Use MONGO_URL from environment
const mongoUri = process.env.MONGO_URL || process.env.MONGO_URI;

if (!mongoUri) {
  console.error('❌ Error: MONGO_URI or MONGO_URL not found in environment');
  process.exit(1);
}

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

async function seedDatabase() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected');

    // Clear existing properties
    console.log('🗑️  Clearing existing properties...');
    const deleteResult = await Property.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing properties`);

    // Insert test properties
    console.log('📝 Adding test properties...');
    const result = await Property.insertMany(testProperties);
    console.log(`✅ Added ${result.length} properties to database\n`);
    
    result.forEach((prop, index) => {
      console.log(`${index + 1}. ${prop.rooms}-room ${prop.propertyType} in ${prop.city} (₸${prop.price})`);
      console.log(`   ID: ${prop._id}`);
    });

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
