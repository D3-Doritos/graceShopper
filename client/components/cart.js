import React from 'react'
import {connect} from 'react-redux'
import {
  getCart,
  updateCart,
  removeProduct,
  addQty,
  subtractQty
} from '../store/singleOrder'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleSubtract = this.handleSubtract.bind(this)
  }
  componentDidMount() {
    const userCart = this.props.getTheCart(this.props.match.params.userId)
  }

  handleClick(event) {
    event.preventDefault()
    this.props.deleteProduct(this.props.cart.id, event.target.value)
  }

  handleAdd(event) {
    event.preventDefault()
    this.props.addQty(this.props.cart.id, event.target.value)
  }

  handleSubtract(event) {
    event.preventDefault()
    this.props.subtractQty(this.props.cart.id, event.target.value)
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
                <div>Price: ${product.product_order.historicalPrice}</div>
                <div>Quantity: {product.product_order.qty}</div>
                <div>{product.description}</div>
                <Link to={`/products/${product.id}`}>Link to Product</Link>
                <button
                  type="submit"
                  value={product.id}
                  onClick={this.handleClick}
                >
                  Remove Item
                </button>

                <button
                  type="submit"
                  value={product.id}
                  onClick={this.handleAdd}
                >
                  {' '}
                  Add Qty
                </button>

                <button
                  type="submit"
                  value={product.id}
                  onClick={this.handleSubtract}
                >
                  {' '}
                  Subtract Qty
                </button>

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
    cart: state.singleOrder,
    user: state.user
  }
}
const mapDispatch = dispatch => {
  return {
    getTheCart: userId => dispatch(getCart(userId)),
    updateCart: (orderId, cart) => dispatch(updateCart(orderId, cart)),
    deleteProduct: (orderId, productId) =>
      dispatch(removeProduct(orderId, productId)),
    addQty: (orderId, productId) => dispatch(addQty(orderId, productId)),
    subtractQty: (orderId, productId) =>
      dispatch(subtractQty(orderId, productId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
