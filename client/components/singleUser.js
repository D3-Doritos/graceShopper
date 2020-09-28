import React from 'react'
import {connect} from 'react-redux'
import {getUser} from '../store/user'

class SingleUser extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getTheUser()
  }

  render() {
    console.log(this.props.user)
    return <h3>This is the single user page</h3>
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getTheUser: userId => dispatch(getUser(userId))
  }
}

export default connect(mapState, mapDispatch)(SingleUser)
