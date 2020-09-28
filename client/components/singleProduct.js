import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct, updateProduct} from '../store/singleProduct'
import {getCart, addProduct} from '../store/singleOrder'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
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
    this.props.addTheProduct()
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <img src={this.props.singleProduct.imageUrl} height={200} width={200} />
        <h3>{this.props.singleProduct.name}</h3>
        <h4>{this.props.singleProduct.price}</h4>
        <h4>{this.props.singleProduct.description}</h4>
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
            <button onClick={this.handleClick}>Add to Cart</button>
          </div>
        ) : (
          <h3>user</h3>
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
    getTheCart: userId => dispatch(getCart(userId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
