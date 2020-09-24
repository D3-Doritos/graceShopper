import axios from 'axios'

// ACTIONS
const GOT_PRODUCT = 'GOT_PRODUCT'
const UPDATED_PRODUCT = 'UPDATED_PRODUCT'

// ACTION CREATORS
const gotProduct = product => ({type: GOT_PRODUCT, product})
const updatedProduct = product => ({
  type: UPDATED_PRODUCT,
  product
})

// THUNK CREATORS
export const fetchProduct = productId => async dispatch => {
  try {
    const product = await axios.get(`/api/products/${productId}`)
    dispatch(gotProduct(product.data))
  } catch (error) {
    console.error(error)
  }
}

export const updateProduct = product => async dispatch => {
  try {
    const theUpdatedProduct = await axios.put(
      `/api/products/${product.id}`,
      product
    )
    dispatch(updatedProduct(theUpdatedProduct.data))
  } catch (error) {
    console.error(error)
  }
}

// REDUCER
const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PRODUCT:
      return action.product
    case UPDATED_PRODUCT:
      return action.product
    default:
      return state
  }
}
