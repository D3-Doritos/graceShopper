import axios from 'axios'

// ACTIONS
const GET_PRODUCT = 'GET_PRODUCT'

// ACTION CREATORS
const gotProduct = product => ({type: GET_PRODUCT, product})

// THUNK CREATORS
export const fetchProduct = productId => async dispatch => {
  try {
    const product = await axios.get(`/api/product/${productId}`)
    dispatch(gotProduct(product.data))
  } catch (error) {
    console.error(error)
  }
}

// REDUCER
const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}
