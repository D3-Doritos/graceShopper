import React from 'react'
import {connect} from 'react-redux'
import {fetchOrder} from '../store/singleOrder'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getOrder(this.props.match.params.orderId)
  }

  render() {
    return (
      <div>
        <h3>Thank you for your purchase!</h3>
        <h4>Your total was: ${(this.props.order.total / 100).toString()}</h4>
      </div>
    )
  }
}

const mapState = state => {
  return {
    order: state.orders
  }
}

const mapDispatch = dispatch => {
  return {
    getOrder: orderId => dispatch(fetchOrder(orderId))
  }
}

export default connect(mapState, mapDispatch)(Checkout)
