import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'
import firebase from 'firebase'
import './App.css'

import Database from './Database'
import Main from './Main'
import Login from './Login'
import Register from './Register'
import Extract from './Extract'
import Favorites from './Favorites'

import { Title, Modal, ModalBackground, ModalClose, ModalContent, Box } from 'bloomer'
// import { Pagination, PageList, Button, Title, Modal, ModalBackground, ModalClose, ModalContent, Box } from 'bloomer'
// import { Navbar, NavbarBrand, NavbarMenu, NavbarEnd, NavbarStart } from 'bloomer'
class App extends Component {
  constructor () {
    super()
    this.state = {
      user: firebase.auth().currentUser,
      email: '',
      favorites: [],
      petData: [],
      isLoading: true,
      fullData: false,
      welcome: true
    }
    this.logout = this.logout.bind(this)
    this.updateUserFavorites = this.updateUserFavorites.bind(this)
    this.getUserFavorites = this.getUserFavorites.bind(this)
    this.addtoFavorites = this.addtoFavorites.bind(this)
    this.removefromFavorites = this.removefromFavorites.bind(this)
    this.db = new Database()
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
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user: user,
        uid: user ? user.uid : ''
      })
      window.localStorage.email = this.state.email ? this.state.email : ''
      window.localStorage.uid = this.state.uid
      if (user) { this.getUserFavorites(this.state.uid) }
      this.makeEntry()
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
        {/* <Modal isActive >
          <ModalBackground />
          <ModalContent>
            <div className='welcome-window'><div className='welcome-title'>Local Tail</div>
              <div className='welcome-animation' /></div>
          </ModalContent>
          <ModalClose />
        </Modal> */}
        <div className='menu'>
          {this.state.user ? <button className='menu-button float-left' onClick={this.logout}>Logout</button> : <Link to='/login'><button className='menu-button'>Login</button></Link>}
          {this.state.user && <Link to='/favorites'><button className='menu-button float-right' >Favorites</button></Link>}
        </div>
        <Loader isLoading={this.state.isLoading}>
          <div className='pet-container'>
            <Route exact path='/' render={(props) =>
              <Main {...props} petData={this.state.petData} favorites={this.state.favorites} addFav={this.addtoFavorites} removeFav={this.removefromFavorites} />} />
          </div>
        </Loader>
        <Route exact path='/favorites' render={(props) => <Favorites petData={this.state.petData} favorites={this.state.favorites} addFav={this.addtoFavorites} removeFav={this.removefromFavorites} {...props} />} />
        <Route exact path='/login' render={(props) => <Login {...props} />} />
        <Route exact path='/register' render={(props) => <Register {...props} />} />
        <Route exact path='/extract' render={(props) => <Extract {...props} />} />
      </div>)
  }
}

export default App

class Loader extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     isLoading: this.props.isLoading
  //   }
  // }

  // componentDidMount () {
  //   this.setState({isLoading: this.props.isLoading})
  // }

  render () {
    if (this.props.isLoading) {
      return (
        <div>
          <Title className='title-loader' >Content Loading...</Title>
          <div className='custom-loader' />
          {/* <div className='loader' /> */}
        </div>
      )
    } else return (<div>{this.props.children}</div>)
  }
}
