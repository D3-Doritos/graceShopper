import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/products'

class Products extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
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
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(Products)
