/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SingleProduct} from './singleProduct'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleProduct', () => {
  let singleProduct

  beforeEach(() => {
    singleProduct = shallow(<SingleProduct price="299" />)
  })

  it('renders the price in an h3', () => {
    expect(singleProduct.find('h3').text()).to.be.equal('299')
  })
})
