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
  description: String,
  images: [String],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', PropertySchema);
