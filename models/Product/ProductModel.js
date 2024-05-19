const mongoose = require('mongoose'); // Apague se já estiver requerido

// Declare o Schema do modelo Mongo
const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  sold: {
    type: Number,
    default: 0,
  },
  images: {
    type: Array,
  },
  color: {
    type: String, // Corrigido de "typpe" para "type"
    required: true,
  },
  ratings: [
    {
      star: Number,
      postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
}, { timestamps: true });

// Exportar o modelo
module.exports = mongoose.model('Product', ProductSchema);
