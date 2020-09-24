import axios from 'axios'

// ACTIONS
const GET_ORDER = 'GET_ORDER'
const ADD_PRODUCT = 'ADD_PRODUCT'
const GET_CART = 'GET_CART'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

// ACTION CREATORS
const gotOrder = order => ({type: GET_ORDER, order})
const addedProduct = cart => ({type: ADD_PRODUCT, cart})
const gotCart = order => ({type: GET_CART, order})
const removedProduct = cart => ({type: REMOVE_PRODUCT, cart})

// THUNK CREATORS
export const fetchOrder = orderId => async dispatch => {
  try {
    const order = await axios.get(`/api/order/${orderId}`)
    dispatch(gotOrder(order.data))
  } catch (error) {
    console.error(error)
  }
}

export const addProduct = (orderId, productId) => async dispatch => {
  try {
    const cartProduct = await axios.put(
      `/api/orders/${orderId}/addProduct/${productId}`
    )
    dispatch(addedProduct(cartProduct.data))
  } catch (error) {
    console.error(error)
  }
}

export const getCart = userId => async dispatch => {
  try {
    const cart = await axios.get(`/api/users/${userId}/cart`)
    dispatch(gotCart(cart.data))
  } catch (error) {
    console.error(error)
  }
}

export const removeProduct = (orderId, productId) => async dispatch => {
  try {
    const updatedOrder = await axios.delete(
      `/api/orders/${orderId}/deleteProduct/${productId}`
    )
    dispatch(removedProduct(updatedOrder))
  } catch (error) {
    console.error(error)
  }
}

// REDUCER
const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    case ADD_PRODUCT:
      return action.cart
    case REMOVE_PRODUCT:
      return action.cart
    default:
      return state
  }
}
