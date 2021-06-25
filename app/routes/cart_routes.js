// Require express
const express = require('express')
const passport = require('passport')

// We will require our product model
const Cart = require('./../models/cart')

// require custom errors
const {
  handle404,
  requireOwnership
} = require('../../lib/custom_errors')

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

router.post('/cart', requireToken, (req, res, next) => {
  // const owner = req.user._id
  console.log('This is req: ', req.user._id)
  req.body.owner = req.user._id
  Cart.create(req.body)
    // .then(newCart =>
    //   console.log(newCart)
    //   // {newCart.owner: req.body
    // )
    .then(cart => {
      res.status(201).json({ cart: cart.toObject() })
    })
    .catch(next)
})

router.patch('/cart/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  console.log(id)
  console.log(typeof req.body.product)
  Cart.findById(id)
    .then(handle404)
    .then(cart => {
      console.log(req.body)
      cart.products.push(req.body.product.id)
      return cart.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
router.patch('/cart-delete/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  console.log(id)
  console.log(typeof req.body.product)
  Cart.findById(id)
    .then(cart => {
      console.log(req.body)
      const index = cart.products.indexOf(req.body.product.id)
      if (index > -1) {
        cart.products.splice(index, 1)
      }

      return cart.save()
    })
    .then(cart => console.log(cart.toJSON()))
    .then(() => res.sendStatus(204))
    .catch(next)
})
router.get('/cart', requireToken, (req, res, next) => {
  Cart.find({owner: req.user.id})
    .populate('products')
    .then(carts => {
      return carts.map(cart => cart.toObject())
    })
    .then(carts => res.status(200).json({ carts: carts }))
    .catch(next)
})
router.get('/cart/:id', requireToken, (req, res, next) => {
  Cart.findById(req.params.id)
    .populate('products')
    .then(handle404)
    .then(cart => res.status(200).json({ cart: cart.toObject() }))
    .catch(next)
})

module.exports = router
