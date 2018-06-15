import React, { Component } from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import Main from './Main'
import Login from './Login'
import Register from './Register'

import Extract from './Extract'
// import {Box} from 'bloomer'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <Route exact path='/' render={(props) => <Main {...props} />} />
        <Route exact path='/login' render={(props) => <Login {...props} />} />
        <Route exact path='/register' render={(props) => <Register {...props} />} />
        <Route exact path='/extract' render={(props) => <Extract {...props} />} />
      </div>
    )
  }
}

export default App
