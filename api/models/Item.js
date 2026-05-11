const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Le nom du bijou est obligatoire"],
    trim: true 
  },
  type: { 
    type: String, 
    enum: ['Bague', 'Collier', 'Boucles', 'Bracelet'], 
    default: 'Bague' 
  },
  material: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true,
    min: 0 
  },
  imageUrl: { 
    type: String, 
    default: "" 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Item', ItemSchema);