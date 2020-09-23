const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router

// GET /api/cart
router.get('/cart', async (req, res, next) => {
  try {
    const cart = await Cart.findByPk()
  } catch (error) {
    next()
  }
})
