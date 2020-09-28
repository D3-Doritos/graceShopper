import axios from 'axios'
import history from '../history'
import {getCart} from './singleOrder'

/**
 * ACTION TYPES
 */
const CREATE_USER = 'CREATE_USER'
const GET_USER = 'GET_USER'
const EDIT_USER = 'EDIT_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const createdUser = user => ({type: CREATE_USER, user})
const gotUser = user => ({type: GET_USER, user})
const editedUser = user => ({type: EDIT_USER, user})
const removedUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(gotUser(res.data || defaultUser))
    dispatch(getCart(res.data.id))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (
  username,
  firstName,
  lastName,
  email,
  password,
  method
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {
      username,
      firstName,
      lastName,
      email,
      password
    })
  } catch (authError) {
    return dispatch(gotUser({error: authError}))
  }

  try {
    dispatch(gotUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removedUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const createUser = userParams => async dispatch => {
  try {
    const newUser = await axios.post('/api/users/', userParams)
    dispatch(createdUser(newUser.data))
  } catch (error) {
    console.error(error)
  }
}

export const editUser = userParams => async dispatch => {
  try {
    const updatedUser = await axios.put(
      `/api/users/${userParams.id}`,
      userParams
    )
    dispatch(editedUser(updatedUser.data))
  } catch (error) {
    console.error(error)
  }
}

export const getUser = userId => async dispatch => {
  try {
    const user = await axios.get(`api/users/${userId}`)
    dispatch(gotUser(user.data))
  } catch (error) {
    console.error(error)
  }
}
/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case CREATE_USER:
      return action.user
    case EDIT_USER:
      return action.user
    default:
      return state
  }
}
