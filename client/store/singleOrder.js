import axios from 'axios'

// ACTIONS
const GET_ORDER = 'GET_ORDER'
const GET_CART = 'GET_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const UPDATE_CART = 'UPDATE_CART'

// ACTION CREATORS
const gotOrder = order => ({type: GET_ORDER, order})
const gotCart = cart => ({type: GET_CART, cart})
const addedProduct = cart => ({type: ADD_PRODUCT, cart})
const removedProduct = cart => ({type: REMOVE_PRODUCT, cart})
const updatedCart = cart => ({type: UPDATE_CART, cart})

// THUNK CREATORS
export const fetchOrder = orderId => async dispatch => {
  try {
    const order = await axios.get(`/api/order/${orderId}`)
    dispatch(gotOrder(order.data))
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

export const removeProduct = (orderId, productId) => async dispatch => {
  try {
    const updatedOrder = await axios.delete(
      `/api/orders/${orderId}/deleteProduct/${productId}`
    )
    dispatch(removedProduct(updatedOrder.data))
  } catch (error) {
    console.error(error)
  }
}

export const updateCart = (orderId, newCart) => async dispatch => {
  try {
    const theUpdatedCart = await axios.put(`/api/orders/${orderId}`, newCart)
    dispatch(updatedCart(theUpdatedCart.data))
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
    case GET_CART:
      return action.cart
    case ADD_PRODUCT:
      return action.cart
    case REMOVE_PRODUCT:
      return action.cart
    default:
      return state
  }
}
