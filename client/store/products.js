import axios from 'axios'

// ACTIONS
const GET_PRODUCTS = 'GET_PRODUCTS'

// ACTION CREATORS
const gotProducts = products => ({type: GET_PRODUCTS, products})

// THUNK CREATORS
export const fetchProducts = () => async dispatch => {
  try {
    const products = await axios.get('/api/products')
    console.log('products.....', products)
    dispatch(gotProducts(products.data))
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
    default:
      return state
  }
}
