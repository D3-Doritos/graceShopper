const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

// GET mounted on /users/
router.get('/', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'username', 'firstName', 'lastName', 'email']
      })
      res.json(users)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    console.log('ERROR: ', err)
    next(err)
  }
})

// router.param -- to keep code more dry

// GET mounted on /users/:id
router.get('/:id/cart', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.id,
        isComplete: false
      },
      include: {
        all: true
      }
    })
    if (cart) {
      res.json(cart)
    } else {
      res.send('Cart is empty')
    }
  } catch (error) {
    next(error)
  }
})

// GET mounted on /users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'firstName', 'lastName', 'email'],
      include: {
        all: true
      }
    })
    res.json(user)
  } catch (err) {
    console.log('ERROR: ', err)
    next(err)
  }
})

// POST mounted on /users/
router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.json(newUser)
  } catch (error) {
    console.log('ERROR: ', error)
    next(error)
  }
})

// Adding single Order(Cart) to User
router.put('/:id/addOrder/:orderId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    const order = await Order.findByPk(req.params.orderId)

    if (!user || !order) {
      res.sendStatus(404)
    }

    await user.addOrder(order)

    const updatedUser = await User.findByPk(req.params.id, {
      include: Order
    })

    res.json(updatedUser)
  } catch (error) {
    console.log('ERROR: ', error)
    next(error)
  }
})

// PUT mounted on /users/:id
router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) {
      res.sendStatus(404)
    }
    const updatedUser = await user.update(req.body)
    res.json(updatedUser)
  } catch (error) {
    console.log('ERROR: ', error)
    next(error)
  }
})

// Deleting Order from User
router.delete(
  '/:id/deleteOrder/:orderId',
  /*adminhook*/ async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id)
      const order = await Order.findByPk(req.params.orderId)

      if (!order || !user) {
        res.sendStatus(404)
      }
      await user.removeOrder(order)

      const updatedUser = await User.findByPk(req.params.id, {
        include: Order
      })

      res.json(updatedUser)
    } catch (error) {
      console.log('ERROR: ', error)
      next(error)
    }
  }
)

// DELETE mounted on /users/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) {
      res.sendStatus(404)
    }
    await user.destroy()
    res.sendStatus(200)
  } catch (error) {
    console.log('ERROR: ', error)
    next(error)
  }
})
