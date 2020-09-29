module.exports = (req, res, next) => {
  if (
    req.user &&
    (req.user.isAdmin || req.user.dataValues.id === Number(req.params.id))
  ) {
    next()
  } else {
    const error = new Error('Not authorized to access page.')
    error.status = 401
    next(error)
  }
}
