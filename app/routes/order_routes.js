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
  Order.find({ owner: req.body.owner })
    .populate('cart')
    .then(handle404)
    .then(foundOrders => {
      return foundOrders.map(orders => orders.toObject())
    })
    .then(orders => res.status(200).json({ orders }))
})

// This will get a single user order
router.get('/order/:id', requireToken, (req, res, next) => {
  Order.findById(req.params.id)
    .populate('cart')
    .then(handle404)
    .then(order => res.status(200).json({ order }))
    .catch(next)
})

// This will add new orders to the users order collection
router.patch('/add-order/:id', requireToken, (req, res, next) => {
  Order.findById(req.params.id)
    .then(handle404)
    .then(orders => {
      console.log(req.body)
      orders.cart.push(req.body.cart.products.id)
      return orders.save()
    })
    .then(updatedorders => res.status(204).json({ updatedorders }))
    .catch(next)
})

// This will remove an order form user order collection
router.patch('/remove-order/:id', requireToken, (req, res, next) => {
  Order.findById(req.params.id)
    .then(handle404)
    .then(order => {
      const orderIndex = order.cart.indexOf(req.body.cart.id)
      order.cart.splice(orderIndex, 1)
      return order.save()
    })
    .then((updatedorders) => res.status(204).json({ updatedorders }))
    .catch(next)
})

// This will delete an order from user order collection
router.delete('/order/:id', requireToken, (req, res, next) => {
  Order.findById(req.params.id)
    .then(handle404)
    .then(foundOrder => {
      foundOrder.deleteOne()
    })
    .then(() => res.status(204).json())
})

module.exports = router
