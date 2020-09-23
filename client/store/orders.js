import axios from 'axios'

// ACTIONS
const GET_ORDERS = 'GET_ORDERS'

// ACTION CREATORS
const gotOrders = orders => ({type: GET_ORDERS, orders})

// THUNK CREATORS
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
    default:
      return state
  }
}
