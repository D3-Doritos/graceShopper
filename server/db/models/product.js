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
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {min: 0}
  },
  imageUrl: {
    type: Sequelize.TEXT
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Product
