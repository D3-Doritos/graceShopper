import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts, createProduct} from '../store/products'

class Products extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  handleSubmit(event) {
    event.preventDefault()
    const productName = event.target.productName.value
    const qty = event.target.qty.value
    const price = event.target.price.value
    const imageUrl = event.target.imageUrl.value
    const description = event.target.description.value
    this.props.createAProduct({
      productName,
      qty,
      price,
      imageUrl,
      description
    })
  }

  render() {
    return (
      <div>
        <div>
          {this.props.user.isAdmin ? (
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="productName">
                  <small>Product Name</small>
                </label>
                <input name="productName" type="productName" />
              </div>
              <div>
                <label htmlFor="qty">
                  <small>Stock Quantity</small>
                </label>
                <input name="qty" type="qty" />
              </div>
              <div>
                <label htmlFor="price">
                  <small>Price</small>
                </label>
                <input name="price" type="price" />
              </div>
              <div>
                <label htmlFor="imageUrl">
                  <small>Image Url</small>
                </label>
                <input name="imageUrl" type="imageUrl" />
              </div>
              <div>
                <label htmlFor="description">
                  <small>Description</small>
                </label>
                <input name="description" type="description" />
              </div>
              <div>
                <button type="submit">Create Product</button>
              </div>
            </form>
          ) : (
            <div />
          )}
        </div>
        <div>
          {this.props.products.map(product => {
            return (
              <div key={product.id}>
                <div>{product.name}</div>
                <img src={product.imageUrl} height={200} width={200} />
                <div>{product.description}</div>
                <Link to={`/products/${product.id}`}>Link to Product</Link>
                <br />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    createAProduct: product => dispatch(createProduct(product))
  }
}

export default connect(mapState, mapDispatch)(Products)
