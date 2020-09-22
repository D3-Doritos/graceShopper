const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')
const Product = require('./product')
const Order = require('./order')

const Cart = db.define('cart', {
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {min: 0}
  }
})
const Product_Order = db.define('product_order', {
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {min: 0}
  }
})

User.belongsToMany(Product, {through: Cart})
Product.belongsToMany(User, {through: Cart})

Order.belongsToMany(Product, {through: Product_Order})
Product.belongsToMany(Order, {through: Product_Order})

User.hasMany(Order)
Order.belongsTo(User)

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Order
}
