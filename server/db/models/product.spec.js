/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Product Creation', () => {
    let product1

    beforeEach(async () => {
      product1 = await Product.create({
        productName: 'Pizza',
        qty: '100',
        price: '300'
      })
    })

    it('returns quanitiy of 100', () => {
      expect(product1.qty).to.be.equal(100)
    })

    it('returns price of 300', () => {
      expect(product1.price).to.be.equal(300)
    })
  }) // end describe('Product check')
}) // end describe('Product model')

// NOTE: attempted to test sequelize validation for qty < 0. Validation seems to be working, but unsure of how to signify the returned errorr as a passing test
