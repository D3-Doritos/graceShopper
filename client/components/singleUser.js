import React from 'react'
import {connect} from 'react-redux'

class SingleUser extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  render() {
    console.log(this.props)
    return (
      <div>
        <h3>This is the single user page</h3>
        <h4>Username: {this.props.user.username}</h4>
        <h4>First Name: {this.props.user.firstName}</h4>
        <h4>Last Name: {this.props.user.lastName}</h4>
        <h4>Email: {this.props.user.email}</h4>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(SingleUser)
