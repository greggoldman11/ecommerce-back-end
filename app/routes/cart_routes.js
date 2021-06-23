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
  // req.body.cart.owner = req.user.id
  console.log('This is req: ', req.body)
  Cart.create()
    .then(cart => {
      res.status(201).json()
    })
    .catch(next)
})

module.exports = router
