const Sequelize = require('sequelize')
const db = require('../db')

const Products = db.define('products', {
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true},
  },
  stockQty: {
    type: Sequelize.NUMBER,
    allowNull: false,
    validate: {notEmpty: true},
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {notEmpty: true},
  },
  imageUrl: {
    type: Sequelize.TEXT,
  },
  Description: {
    type: Sequelize.TEXT,
  },
})

module.exports = Products
