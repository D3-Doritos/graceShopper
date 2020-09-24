const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: {
        all: true
      }
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
})

//GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: {
        all: true
      }
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})

//POST /api/products
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

//PUT /api/products/:id
router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (!product) res.sendStatus(404)
    const updatedProduct = await product.update(req.body)
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
})

//DELETE /api/products/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (!product) res.sendStatus(404)
    await product.destroy()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
