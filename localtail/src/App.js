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

import { Pagination, PageList, Button } from 'bloomer'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: firebase.auth().currentUser,
      email: '',
      favorites: [],
      petData: []
    }
    this.logout = this.logout.bind(this)
    this.updateUserFavorites = this.updateUserFavorites.bind(this)
    this.getUserFavorites = this.getUserFavorites.bind(this)
    this.addtoFavorites = this.addtoFavorites.bind(this)
    this.removefromFavorites = this.removefromFavorites.bind(this)
    this.db = new Database()
  }

  makeEntry () {
    this.db.getPets()
      .then((response) => {
        this.setState({petData: response})
      })
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
      // console.log(user)
      this.setState({
        user: user,
        uid: user ? user.uid : ''
      })
      window.localStorage.email = this.state.email ? this.state.email : ''
      window.localStorage.uid = this.state.uid
      if (user) { this.getUserFavorites(this.state.uid) }
    })
    this.makeEntry()
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
    const page1 = this.state.petData.slice(0, 10)
    const page2 = this.state.petData.slice(10, 19)
    const page3 = this.state.petData.slice(20, 29)
    const page4 = this.state.petData.slice(30, 39)
    const page5 = this.state.petData.slice(40, 49)

    return (
      <div className='app'>
        <div className='header-image'>
          <Pagination className='float-right'>
            {this.state.user ? <Button className='pagination-button' onClick={this.logout}>Logout</Button> : <Link to='/login'><Button className='pagination-button'>Login</Button></Link>}
            <PageList >
              <Link to='/'><Button className='pagination-button'>1</Button></Link>
              <Link to='/2'><Button className='pagination-button'>2</Button></Link>
              <Link to='/3'><Button className='pagination-button'>3</Button></Link>
              <Link to='/4'><Button className='pagination-button'>4</Button></Link>
              <Link to='/5'><Button className='pagination-button'>5</Button></Link>
            </PageList>
          </Pagination>
          {this.state.user && <Link to='/favorites'><Button className='favorite-button' >Favorites</Button></Link>}
        </div>

        <Route exact path='/' render={(props) => <Main {...props} petData={page1} favorites={this.state.favorites} addFav={this.addtoFavorites} removeFav={this.removefromFavorites} />} />
        <Route exact path='/2' render={(props) => <Main {...props} petData={page2} favorites={this.state.favorites} addFav={this.addtoFavorites} removeFav={this.removefromFavorites} />} />
        <Route exact path='/3' render={(props) => <Main {...props} petData={page3} favorites={this.state.favorites} addFav={this.addtoFavorites} removeFav={this.removefromFavorites} />} />
        <Route exact path='/4' render={(props) => <Main {...props} petData={page4} favorites={this.state.favorites} addFav={this.addtoFavorites} removeFav={this.removefromFavorites} />} />
        <Route exact path='/5' render={(props) => <Main {...props} petData={page5} favorites={this.state.favorites} addFav={this.addtoFavorites} removeFav={this.removefromFavorites} />} />
        <Route exact path='/favorites' render={(props) => <Favorites petData={this.state.petData} favorites={this.state.favorites} addFav={this.addtoFavorites} removeFav={this.removefromFavorites} {...props} />} />
        <Route exact path='/login' render={(props) => <Login {...props} />} />
        <Route exact path='/register' render={(props) => <Register {...props} />} />
        <Route exact path='/extract' render={(props) => <Extract {...props} />} />
      </div>)
  }
}

export default App
