/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Product = db.model('product')
const Order = db.model('order')
const Product_Order = db.model('product_order')

describe('Product Order', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Product Order Creation', () => {
    let user1
    let product1
    let productOrder1
    let order1

    beforeEach(async () => {
      user1 = await User.create({
        username: 'CodyThePug',
        firstName: 'cody',
        lastName: 'pug',
        email: 'cody@puppybook.com',
        password: 'bones'
      })
      product1 = await Product.create({
        productName: 'Pizza',
        qty: '100',
        price: '300'
      })
      order1 = await Order.create({
        total: '300',
        isComplete: false,
        userId: '1'
      })
      productOrder1 = await Product_Order.create({
        orderId: '1',
        productId: '1',
        qty: '2',
        historicalPrice: '300'
      })
    })

    it('returns quanitiy of 2', () => {
      expect(productOrder1.qty).to.be.equal(2)
    })

    it('returns price of 300', () => {
      expect(productOrder1.historicalPrice).to.be.equal(300)
    })
  }) // end describe('Product Order Creation')
}) // end describe('Product Order model')
