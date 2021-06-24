const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  date: Date,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
  }]
})

module.exports = mongoose.model('Order', orderSchema)
