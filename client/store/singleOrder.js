import axios from 'axios'

// ACTIONS
const GET_ORDER = 'GET_ORDER'

// ACTION CREATORS
const gotOrder = order => ({type: GET_ORDER, order})

// THUNK CREATORS
export const fetchOrder = orderId => async dispatch => {
  try {
    const order = await axios.get(`/api/order/${orderId}`)
    dispatch(gotOrder(order.data))
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
    default:
      return state
  }
}
