import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import singleProduct from './singleProduct'
import singleOrder from './singleOrder'
import orders from './orders'
import allUsers from './allUsers'

const reducer = combineReducers({
  user,
  allUsers,
  orders,
  products,
  singleProduct,
  singleOrder
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
