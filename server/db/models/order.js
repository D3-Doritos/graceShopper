const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  total: {
    type: Sequelize.INTEGER
  },
  isComplete: {
    // true or false
  }
})
// total should be virtual field
module.exports = Order
