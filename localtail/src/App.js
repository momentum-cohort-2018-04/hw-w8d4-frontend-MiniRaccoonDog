import React, { Component } from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import firebase from 'firebase'

import Main from './Main'
import Login from './Login'
import Register from './Register'
import Extract from './Extract'

import { Button } from 'bloomer'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: firebase.auth().currentUser,
      email: ''
    }
    this.logout = this.logout.bind(this)
  }
  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user: user,
        email: user.email
      })
      window.localStorage.email = this.state.email
    })
  }
  logout () {
    console.log('logout')
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      console.log('Sign-out successful')
      window.localStorage.clear()
    }).catch(function (error) {
      // An error happened.
      console.log('an error on logout', error)
    })
  }
  render () {
    return (
      <div className='app'>
        <Button onClick={this.logout}>Logout</Button>
        <Route exact path='/' render={(props) => <Main {...props} />} />
        <Route exact path='/login' render={(props) => <Login {...props} />} />
        <Route exact path='/register' render={(props) => <Register {...props} />} />
        <Route exact path='/extract' render={(props) => <Extract {...props} />} />
      </div>
    )
  }
}

export default App
