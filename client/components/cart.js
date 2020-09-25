import React from 'react'
import {connect} from 'react-redux'
import {getCart, updateCart} from '../store/singleOrder'
import {Link} from 'react-router-dom'
import user from '../store/user'

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const userCart = this.props.getTheCart(this.props.match.params.userId)
    console.log('user cart----', userCart)
  }
  render() {
    return (
      <div>
        <h1>Cart test</h1>
        {this.props.cart.products ? (
          this.props.cart.products.map(product => {
            return (
              <div key={product.id}>
                <div>{product.name}</div>
                <img src={product.imageUrl} height={200} width={200} />
                <div>{product.description}</div>
                <Link to={`/products/${product.id}`}>Link to Product</Link>
                <br />
              </div>
            )
          })
        ) : (
          <h2>Cart is empty</h2>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.order
  }
}
const mapDispatch = dispatch => {
  return {
    getTheCart: userId => dispatch(getCart(userId)),
    updateCart: (orderId, cart) => dispatch(updateCart(orderId, cart))
  }
}

export default connect(mapState, mapDispatch)(Cart)
