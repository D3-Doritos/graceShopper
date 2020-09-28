import axios from 'axios'

// ACTION TYPE
const GET_ALL_USERS = 'GET_ALL_USERS'

// ACTION CREATOR
const gotAllUsers = users => ({type: GET_ALL_USERS, users})

// THUNK
export const fetchAllUsers = () => async dispatch => {
  try {
    const allUsers = await axios.get('/api/users')
    dispatch(gotAllUsers(allUsers.data))
  } catch (error) {
    console.error(error)
  }
}

// INITIAL STATE
const initialState = []

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    default:
      return state
  }
}
