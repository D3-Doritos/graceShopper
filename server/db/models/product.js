const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  },
  qty: {
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
    type: Sequelize.TEXT,
    defaultValue: 'https://i.ebayimg.com/images/g/A0kAAOSwZ41eeIYb/s-l640.jpg'
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Product
