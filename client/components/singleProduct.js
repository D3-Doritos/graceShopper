import React from 'react'
import {connect} from 'react-redux'
import {
  fetchProduct,
  updateProduct,
  deleteProduct
} from '../store/singleProduct'
import {getCart, addProduct, createCart} from '../store/singleOrder'
import {me} from '../store/user'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDeleted: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.getMe()
    this.props.getSingleProduct(this.props.match.params.productId)
    if (this.props.user.id) {
      this.props.getTheCart(this.props.user.id)
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const productName = event.target.productName.value
    const qty = event.target.qty.value
    const price = event.target.price.value
    const description = event.target.description.value
    const imageUrl = event.target.imageUrl.value
    this.props.updateSingleProduct({
      productName,
      qty,
      price,
      description,
      imageUrl,
      id: this.props.match.params.productId
    })
  }

  handleClick(event) {
    event.preventDefault()
    if (this.props.user.id) {
      this.props.getTheCart(this.props.user.id)
      if (!this.props.singleOrder) {
        this.props.createCart({userId: this.props.user.id, isComplete: false})
      }
      this.props.addTheProduct(
        this.props.singleOrder.id,
        this.props.singleProduct.id
      )
      this.props.getTheCart(this.props.user.id)
    } else {
      if (window.localStorage.cart) {
        const cart = JSON.parse(window.localStorage.cart)
        if (cart[this.props.singleProduct.id]) {
          let qty = cart[this.props.singleProduct.id]
          const newQty = qty + 1
          cart[this.props.singleProduct.id] = newQty
        } else {
          cart[this.props.singleProduct.id] = 1
        }
        const stringedCart = JSON.stringify(cart)
        window.localStorage.setItem('cart', stringedCart)
      }
      if (!window.localStorage.cart) {
        const id = this.props.singleProduct.id
        const cart = {}
        cart[id] = 1
        const stringCart = JSON.stringify(cart)
        window.localStorage.setItem('cart', stringCart)
      }
    }
  }

  handleDelete(event) {
    event.preventDefault()
    this.props.deleteTheProduct(this.props.singleProduct)
    this.setState({isDeleted: true})
  }

  render() {
    return (
      <div>
        {this.state.isDeleted ? (
          <h3>No Product!</h3>
        ) : (
          <div>
            <img
              src={this.props.singleProduct.imageUrl}
              height={200}
              width={200}
            />
            <h3>{this.props.singleProduct.name}</h3>
            <h4>{(this.props.singleProduct.price / 100).toString()}</h4>
            <h4>{this.props.singleProduct.description}</h4>
          </div>
        )}
        {this.props.user.isAdmin ? (
          <div>
            <form onSubmit={this.handleSubmit} name={name}>
              <div>
                <label htmlFor="productName">
                  <small>Product Name</small>
                </label>
                <input name="productName" type="text" />
              </div>
              <div>
                <label htmlFor="qty">
                  <small>Quantity</small>
                </label>
                <input name="qty" type="text" />
              </div>
              <div>
                <label htmlFor="price">
                  <small>Price</small>
                </label>
                <input name="price" type="text" />
              </div>
              <div>
                <label htmlFor="description">
                  <small>Description</small>
                </label>
                <input name="description" type="text" />
              </div>
              <div>
                <label htmlFor="imageUrl">
                  <small>Image Url</small>
                </label>
                <input name="imageUrl" type="text" />
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
              <div />
            </form>
            <div>
              <button onClick={this.handleDelete}>Delete From DB</button>
            </div>
            <div>
              <button onClick={this.handleClick}>Add to Cart</button>
            </div>
          </div>
        ) : (
          <div>
            <h3>{this.props.user.firstName}'s favorite flavor!</h3>
            <div>
              <button onClick={this.handleClick}>Add to Cart</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleProduct: state.singleProduct,
    user: state.user,
    singleOrder: state.singleOrder
  }
}
const mapDispatch = dispatch => {
  return {
    getSingleProduct: productId => dispatch(fetchProduct(productId)),
    updateSingleProduct: product => dispatch(updateProduct(product)),
    addTheProduct: (orderId, productId) =>
      dispatch(addProduct(orderId, productId)),
    getTheCart: userId => dispatch(getCart(userId)),
    deleteTheProduct: product => dispatch(deleteProduct(product)),
    getMe: () => dispatch(me()),
    createCart: cart => dispatch(createCart(cart))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
