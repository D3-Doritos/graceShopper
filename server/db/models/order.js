const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  total: {
    type: Sequelize.FLOAT
  }
})

module.exports = Order
