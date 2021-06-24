const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
  }]
},
{
  timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)
