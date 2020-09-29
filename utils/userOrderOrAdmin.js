const {Order} = require('../server/db/models')

module.exports = async (req, res, next) => {
  const order = await Order.findByPk(req.params.id, {
    include: {
      all: true
    }
  })
  if (order.userId) {
    if (
      (req.user && req.user.isAdmin) ||
      (order.userId && order.userId === Number(req.user.id))
    ) {
      next()
    } else {
      const error = new Error('Not authorized to access page.')
      error.status = 401
      next(error)
    }
  } else {
    next()
  }
}
