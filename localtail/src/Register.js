import React, { Component } from 'react'

class Register extends Component {
  constructor () {
    super()
    this.setState = {
      user: window.localStorage.user ? window.localStorage.user : ''
    }
  }

  render () {
    return <div>This is the LOGIN Page</div>
  }
}

export default Register
