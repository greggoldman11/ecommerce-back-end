// Require express
const express = require('express')
const passport = require('passport')

// We will require our product model
const Product = require('./../models/product')

// require custom errors
const {
  handle404,
  requireOwnership
} = require('../../lib/custom_errors')

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// Create product
router.post('/products', requireToken, (req, res, next) => {
  req.body.product.owner = req.user.id

  Product.create(req.body.product)
    .then(product => {
      res.status(201).json({ product: product.toObject() })
    })
    .catch(next)
})

// Index all products
router.get('/products', (req, res, next) => {
  Product.find()
    .then(products => {
      return products.map(product => product.toObject())
    })
    .then(products => res.status(200).json({ products: products }))
    .catch(next)
})

// Show product
// router.get()

// Update product
// router.patch()

// This will delete book
// router.delete()

module.exports = router
