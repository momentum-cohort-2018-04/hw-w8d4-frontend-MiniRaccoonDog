import React, { Component } from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import Main from './Main'
import Login from './Login'
import Register from './Register'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Route path='/' render={() => <Main />} />
        <Route path='/login' render={() => <Login />} />
        <Route path='/register' render={() => <Register />} />
      </div>
    )
  }
}

export default App
