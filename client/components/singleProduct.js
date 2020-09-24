import React from 'react'
import {connect} from 'react-redux'
import store from '../store'
import fetchProduct from '../store/singleProduct'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    // this.props.getSingleProduct(1)
    console.log('mounted productid ---', productId)
  }

  render() {
    return (
      <div>
        <h3>Single Product Page</h3>
        {/* <h3>`${this.props.singleProduct.price}`</h3> */}
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleProduct: state.singleProduct
  }
}
const mapDispatch = dispatch => {
  return {
    getSingleProduct: productId => dispatch(fetchProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
