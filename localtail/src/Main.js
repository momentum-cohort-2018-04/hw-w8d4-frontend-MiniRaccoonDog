import React, { Component } from 'react'

class Main extends Component {
  constructor () {
    super()
    this.setState = {
      user: window.localStorage.user ? window.localStorage.user : ''
    }
  }

  render () {
    return <div>This is the Main Page</div>
  }
}

export default Main
