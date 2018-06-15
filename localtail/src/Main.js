import React, { Component } from 'react'
import { Card, CardHeader, CardHeaderTitle, CardImage, Image, Title, Subtitle, Media, MediaContent, Content, CardContent } from 'bloomer'
import Database from './Database'
import Pet from './Pet'

class Main extends Component {
  constructor () {
    super()
    this.state = {
      user: window.localStorage.user ? window.localStorage.user : '',
      petData: {}
    }
    this.db = new Database()
  }

  componentDidMount () {
    this.makeEntry()
  }
  makeEntry () {
    this.db.getPets().then((response) => {
      console.log(response)
      console.log('??', response[0])
      this.setState({petData: response[0]})
    })
  }

  render () {
    // const pet = this.state.petData
    return null
  }
}

export default Main
