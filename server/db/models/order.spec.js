/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Product = db.model('product')
const Order = db.model('order')

describe('Order', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Order Creation', () => {
    let user1
    let product1
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
    })

    it('returns quanitiy of 2', () => {
      expect(order1.total).to.be.equal(300)
    })

    it('returns price of 300', () => {
      expect(order1.isComplete).to.be.equal(false)
    })
  }) // end describe('Product Order Creation')
}) // end describe('Product Order model')
