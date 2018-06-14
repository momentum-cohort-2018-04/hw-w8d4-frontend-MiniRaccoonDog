import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'bulma'

class Login extends Component {
  constructor () {
    super()
    this.setState = {
      user: window.localStorage.user ? window.localStorage.user : ''
    }
  }

  render () {
    return (
      <div>
        <h1>This is the LOGIN Page</h1>
        <Link to='/register'><Button>Button</Button></Link>
      </div>)
  }
}

export default Login
