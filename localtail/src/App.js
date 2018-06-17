import React, { Component } from 'react'
import './App.css'
import {Route, Link} from 'react-router-dom'
import firebase from 'firebase'

import Database from './Database'
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
      email: '',
      favorites: []
    }
    this.logout = this.logout.bind(this)
    this.updateUserFavorites = this.updateUserFavorites.bind(this)
    this.getUserFavorites = this.getUserFavorites.bind(this)
    this.addtoFavorites = this.addtoFavorites.bind(this)
    this.removefromFavorites = this.removefromFavorites.bind(this)
    this.db = new Database()
  }

  updateUserFavorites (body) {
    this.db.writeUser(window.localStorage.uid, body)
  }

  addtoFavorites (dogID) {
    const updatedFavs = this.state.favorites
    updatedFavs.push(dogID)
    this.setState({favorites: updatedFavs})
  }

  removefromFavorites (dogID) {
    const updatedFavs = this.state.favorites
    updatedFavs.splice(updatedFavs.indexOf(dogID), 1)
    this.setState({favorites: updatedFavs})
  }

  getUserFavorites (uid) {
    this.db.getUser(uid)
      .then((response) => {
        this.setState({ favorites: response })
      })
  }
  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      this.setState({
        user: user,
        email: user ? user.email : '',
        uid: user ? user.uid : ''
      })
      window.localStorage.email = this.state.email ? this.state.email : ''
      window.localStorage.uid = this.state.uid
      if (user) { this.getUserFavorites(this.state.uid) }
    })
  }

  logout () {
    const body = this.state.favorites.join(';')
    this.updateUserFavorites(body)
    firebase.auth().signOut().then(function () {
      console.log('Sign-out successful')
      window.localStorage.clear()
    }).catch(function (error) {
      console.log('an error on logout', error)
    })
  }
  render () {
    return (
      <div className='app'>
        {this.state.user ? <Button onClick={this.logout}>Logout</Button> : <Link to='/login'><Button>Login</Button></Link>}
        <Route exact path='/' render={(props) => <Main {...props} email={this.state.email} favorites={this.state.favorites} addFav={this.addtoFavorites} removeFav={this.removefromFavorites} />} />
        <Route exact path='/login' render={(props) => <Login {...props} />} />
        <Route exact path='/register' render={(props) => <Register {...props} />} />
        <Route exact path='/extract' render={(props) => <Extract {...props} />} />
      </div>
    )
  }
}

export default App
