import React, { Component } from 'react'
// import { Card, CardHeader, CardHeaderTitle, CardImage, Image, Title, Subtitle, Media, MediaContent, Content, CardContent } from 'bloomer'
import Database from './Database'
import Pet from './Pet'

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      useremail: window.localStorage.email ? window.localStorage.email : '',
      petData: []
    }
    this.db = new Database()
  }

  componentDidMount () {
    this.makeEntry()
  }
  makeEntry () {
    this.db.getPets().then((response) => {
      console.log('make Entry', response)
      this.setState({petData: response})
    })
  }

  render () {
    // return null
    return this.state.petData.map((each, index) => {
      return <Pet key={index} {...this.props} petData={each} />
    })
  }
}

export default Main
