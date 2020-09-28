import React from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/allUsers'

class AllUsers extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getAllUsers()
  }

  render() {
    return (
      <div>
        <h3>All Users Page</h3>
        {this.props.allUsers.map(user => {
          return (
            <div key={user.id}>
              <h3>Username: {user.username}</h3>
              <h3>First Name: {user.firstName}</h3>
              <h3>Last Name: {user.lastName}</h3>
              <h3>Email: {user.email}</h3>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    allUsers: state.allUsers
  }
}

const mapDispatch = dispatch => {
  return {
    getAllUsers: () => dispatch(fetchAllUsers())
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
