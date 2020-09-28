const router = require('express').Router()
const {Order, Product, Product_Order} = require('../db/models')
module.exports = router

//GET /api/orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: {
        all: true
      }
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

// GET mounted on api/orders/:id
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: {
        all: true
      }
    })
    res.json(order)
  } catch (err) {
    console.log('ERROR: ', err)
    next(err)
  }
})

// POST mounted on api/orders/
router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body)
    res.json(newOrder)
  } catch (error) {
    console.log('ERROR: ', error)
    next(error)
  }
})

// Adding single products to cart (order)
router.put('/:id/addProduct/:productId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: {
        all: true
      }
    })
    const product = await Product.findByPk(req.params.productId)

    if (!order || !product) {
      res.sendStatus(404)
    }

    // if (order.products.includes(product)) {
    //   console.log('inside stuff')
    //   const orderedProduct = await Product_Order.findOne({
    //     where: {
    //       orderId: req.params.id,
    //       productId: req.params.productId,
    //     },
    //   })
    //   const newQty = orderedProduct.qty + 1
    //   await orderedProduct.update({
    //     qty: newQty,
    //   })
    // } else {
    //   console.log('inside the else')
    await order.addProduct(product)
    // }

    const updatedOrder = await Order.findByPk(req.params.id, {
      include: Product
    })

    res.json(updatedOrder)
  } catch (error) {
    console.log('ERROR: ', error)
    next(error)
  }
})

router.put('/:id/addQty/:productId', async (req, res, next) => {
  try {
    const productOrder = await Product_Order.findOne({
      where: {orderId: req.params.id, productId: req.params.productId}
    })
    const currQty = productOrder.qty
    await productOrder.update({qty: currQty + 1})
    const updatedOrder = await Product_Order.findOne({
      where: {orderId: req.params.id, productId: req.params.productId}
    })
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
})

router.put('/:id/subtractQty/:productId', async (req, res, next) => {
  try {
    const productOrder = await Product_Order.findOne({
      where: {orderId: req.params.id, productId: req.params.productId}
    })
    const currQty = productOrder.qty
    await productOrder.update({qty: currQty - 1})
    const updatedOrder = await Product_Order.findOne({
      where: {orderId: req.params.id, productId: req.params.productId}
    })
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
})

// PUT mounted on /order/:id
router.put('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id)
    if (!order) {
      res.sendStatus(404)
    }
    const updatedOrder = await order.update(req.body)
    res.json(updatedOrder)
  } catch (error) {
    console.log('ERROR: ', error)
    next(error)
  }
})

// Deleting Single Products from Cart (Order)
router.delete('/:id/deleteProduct/:productId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id)
    const product = await Product.findByPk(req.params.productId)

    if (!order || !product) {
      res.sendStatus(404)
    }
    await order.removeProduct(product)

    const updatedOrder = await Order.findByPk(req.params.id, {
      include: Product
    })

    res.json(updatedOrder)
  } catch (error) {
    console.log('ERROR: ', error)
    next(error)
  }
})

// DELETE mounted on /order/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id)
    if (!order) {
      res.sendStatus(404)
    }
    await order.destroy()
    res.sendStatus(200)
  } catch (error) {
    console.log('ERROR: ', error)
    next(error)
  }
})
