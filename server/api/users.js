const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// GET mounted on /users/
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'firstName', 'lastName', 'email']
    })
    res.json(users)
  } catch (err) {
    console.log('ERROR: ', err)
    next(err)
  }
})

// router.param -- to keep code more dry

// GET mounted on /users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'firstName', 'lastName', 'email']
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
