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
  console.log(req.body)
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
router.get('/products/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(handle404)
    .then(product => res.status(200).json({ product: product.toObject() }))
    .catch(next)
})

// Update product
router.patch('/products/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.product.owner

  Product.findById(req.params.id)
    .then(handle404)
    .then(product => {
      requireOwnership(req, product)
      return product.updateOne(req.body.product)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// This will delete product
router.delete('/products/:id', requireToken, (req, res, next) => {
  Product.findById(req.params.id)
    .then(handle404)
    .then(product => {
      requireOwnership(req, product)
      product.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
