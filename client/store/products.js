import axios from 'axios'

// ACTIONS
const GET_PRODUCTS = 'GET_PRODUCTS'
const CREATED_PRODUCT = 'CREATED_PRODUCT'

// ACTION CREATORS
const gotProducts = products => ({type: GET_PRODUCTS, products})
const createdProduct = product => ({
  type: CREATED_PRODUCT,
  product
})

// THUNK CREATORS
export const fetchProducts = () => async dispatch => {
  try {
    const products = await axios.get('/api/products')
    dispatch(gotProducts(products.data))
  } catch (error) {
    console.error(error)
  }
}

export const createProduct = product => async dispatch => {
  try {
    const newProduct = await axios.post('/api/products', product)
    dispatch(createdProduct(newProduct.data))
  } catch (error) {
    console.error(error)
  }
}

// REDUCER
const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case CREATED_PRODUCT:
      return [action.product, ...state]
    default:
      return state
  }
}
