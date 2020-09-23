const Sequelize = require('sequelize')
const db = require('../db')

const Product_Order = db.define('product_order', {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = Product_Order
