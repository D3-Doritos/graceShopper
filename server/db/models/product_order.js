const Sequelize = require('sequelize')
const db = require('../db')

const Product_Order = db.define('product_order', {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {min: 0}
  },
  historicalPrice: {
    type: Sequelize.INTEGER,
    validate: {min: 0}
  }
})

// after save hook
// get order
// all instances associated
// map through this table
// calculate prices
// add and update orders instance

module.exports = Product_Order
