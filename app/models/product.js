const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }
})
module.exports = mongoose.model('Product', productSchema)
