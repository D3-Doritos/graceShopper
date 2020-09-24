import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId)
  }

  render() {
    console.log('USER--------->', this.props.user)
    return (
      <div>
        <img src={this.props.singleProduct.imageUrl} height={200} width={200} />
        <h3>{this.props.singleProduct.name}</h3>
        <h4>{this.props.singleProduct.price}</h4>
        <h4>{this.props.singleProduct.description}</h4>
        {this.props.user.isAdmin ? <h3>ADMIN</h3> : <h3>user</h3>}
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleProduct: state.singleProduct,
    user: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    getSingleProduct: productId => dispatch(fetchProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
