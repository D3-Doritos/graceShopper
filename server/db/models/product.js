const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  },
  stockQty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {min: 0}
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT
  },
  Description: {
    type: Sequelize.TEXT
  }
})

module.exports = Product
