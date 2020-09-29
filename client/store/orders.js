import axios from 'axios'

// ACTIONS
const GET_ORDERS = 'GET_ORDERS'
const EDIT_ORDER = 'EDIT_ORDER'

// ACTION CREATORS
const gotOrders = orders => ({type: GET_ORDERS, orders})

const editedOrder = order => ({type: EDIT_ORDER, order})

// THUNK CREATORS
export const editOrder = (orderId, total) => async dispatch => {
  try {
    const updatedOrder = await axios.put(`/api/orders/${orderId}`, total)
    dispatch(editedOrder(updatedOrder.data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchOrders = () => async dispatch => {
  try {
    const orders = await axios.get(`/api/orders`)
    dispatch(gotOrders(orders.data))
  } catch (error) {
    console.error(error)
  }
}

// REDUCER
const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case EDIT_ORDER:
      return action.order
    default:
      return state
  }
}
