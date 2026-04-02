const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  dealType: { type: String, enum: ['Аренда', 'Продажа'], required: true },
  rentPeriod: { type: String, default: 'Помесячно' },
  propertyType: { type: String, required: true },
  city: { type: String, required: true },
  rooms: { type: Number, required: true },
  price: { type: Number, required: true },
  area: { type: Number, required: true },
  address: { type: String, required: true },
  floor: { type: Number },
  totalFloors: { type: Number },
  complex: { type: String }, // Housing complex/building name
  description: String,
  images: [String],
  coords: { type: [Number], default: [51.1694, 71.4702] }, // [lat, lng], default: Astana center
  withPets: { type: Boolean, default: false },
  withKids: { type: Boolean, default: false },
  furnished: { type: String, default: 'Нет' }, // 'Да'/'Нет'
  authorType: { type: String, default: 'Хозяин' }, // 'Хозяин'/'Агентство'
  sellerName: { type: String }, // Имя продавца/агентства
  phone: { type: String }, // Телефон продавца
  email: { type: String }, // Email продавца
  views: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', PropertySchema);
