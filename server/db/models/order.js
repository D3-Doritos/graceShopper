const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  total: {
    type: Sequelize.INTEGER
  },
  isComplete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})
// total should be virtual field
// update stock qty

module.exports = Order
