import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import './App.css'

import Database from './Database'
import Main from './Main'
import Login from './Login'
import Register from './Register'
import Favorites from './Favorites'

import { Title, Modal, ModalBackground, ModalContent } from 'bloomer'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: firebase.auth().currentUser,
      url: window.location.href,
      favorites: [],
      petData: [],
      isLoading: true,
      fullData: false,
      welcome: true,
      first: true
    }
    this.logout = this.logout.bind(this)
    this.updateUserFavorites = this.updateUserFavorites.bind(this)
    this.getUserFavorites = this.getUserFavorites.bind(this)
    this.addtoFavorites = this.addtoFavorites.bind(this)
    this.removefromFavorites = this.removefromFavorites.bind(this)
    this.db = new Database()
    this.firstTimer()
  }

  makeEntry () {
    const zip = window.localStorage.zip ? window.localStorage.zip : ''
    this.db.getPets(zip)
      .then((response) => {
        if (response.length >= 200) {
          this.setState({
            petData: response,
            fullData: true
          })
        } else {
          this.setState({petData: response})
        }
      })
      .then(
        this.setState({isLoading: false})
      )
  }

  firstTimer () {
    window.setTimeout(() => { this.setState({first: false}) }, 1500)
  }

  updateUserFavorites (body) {
    this.db.writeUser(window.localStorage.uid, body, window.localStorage.zip)
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
    window.setTimeout(() => { this.setState({welcome: false}) }, 3000)

    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user: user,
        uid: user ? user.uid : '',
        first: true
      })
      window.localStorage.uid = this.state.uid
      if (user) { this.getUserFavorites(this.state.uid) }
    })
    window.setTimeout(() => { this.makeEntry() }, 2500)
  }

  logout () {
    const body = this.state.favorites.join(';')
    this.updateUserFavorites(body)
    firebase.auth().signOut().then(() => {
      console.log(this.state.url)
      console.log('Sign-out successful')
      window.localStorage.clear()
      window.location.href = this.state.url
    }).catch(function (error) {
      console.log('an error on logout', error)
    })
  }
  render () {
    return (
      <div className='app'>
        {this.state.first && this.state.welcome && <Modal isActive>
          <ModalBackground className='lowertop' />
          <ModalContent className='top'>
            <div className='welcome-window'><div className='welcome-title'>Local Tail</div>
              <div className='welcome-animation' /></div>
          </ModalContent>
        </Modal>}
        {!this.state.welcome && <div className='menu neartop'>
          {this.state.user ? <button className='menu-button float-left' onClick={this.logout}>Logout</button> : <Link to='/login'><button className='menu-button'>Login</button></Link>}
          {this.state.user && <Link to='/'><button className='menu-button'>Main</button></Link>}
          {this.state.user && <Link to='/favorites'><button className='menu-button float-right' >Favorites</button></Link>}
        </div>}
        <Loader isLoading={this.state.isLoading}>
          <div className='pet-container'>
            <Route exact path='/' render={(props) =>
              <Main {...props} petData={this.state.petData} favorites={this.state.favorites} addFav={this.addtoFavorites} removeFav={this.removefromFavorites} />} />
          </div>
          <Route exact path='/favorites' render={(props) => <Favorites petData={this.state.petData} favorites={this.state.favorites} addFav={this.addtoFavorites} removeFav={this.removefromFavorites} {...props} />} />
          <Route exact path='/login' render={(props) => <Login {...props} />} />
          <Route exact path='/register' render={(props) => <Register {...props} />} />
        </Loader>
        {/* <Route exact path='/favorites' render={(props) => <Favorites petData={this.state.petData} favorites={this.state.favorites} addFav={this.addtoFavorites} removeFav={this.removefromFavorites} {...props} />} />
        <Route exact path='/login' render={(props) => <Login {...props} />} />
        <Route exact path='/register' render={(props) => <Register {...props} />} /> */}
      </div>)
  }
}

export default App

class Loader extends Component {
  render () {
    if (this.props.isLoading) {
      return (
        <div>
          <Title isSize={1} className='title-loader' >Content <br />Loading...</Title>
          <div className='custom-loader' />
        </div>
      )
    } else return (<div>{this.props.children}</div>)
  }
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.array.isRequired
  // children: PropTypes.object.isRequired
}
