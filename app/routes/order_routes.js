const express = require('express')
const passport = require('passport')

const Order = require('./../models/order')

const {
  handle404,
  requireOwnership
} = require('../../lib/custom_errors')

const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// This will create the orders
router.post('/order', requireToken, (req, res, next) => {
  const owner = req.user._id
  Order.create(owner)
    .then(order => {
      res.status(204).json({ order: order.toObject() })
    })
    .catch(next)
})

// This route will get all of the users orders
router.get('/order', requireToken, (req, res, next) => {
  Order.find()
    .then(handle404)
    .then(foundOrders => {
      requireOwnership(req, foundOrders)
    })
    .then(authOrders => {
      return authOrders.map(order => order.toObject())
    })
    .then(orders => res.status(200).json({ orders }))
})

module.exports = router
