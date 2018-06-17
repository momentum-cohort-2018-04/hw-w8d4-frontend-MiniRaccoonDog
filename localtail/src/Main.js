import React, { Component } from 'react'
import Database from './Database'
import Pet from './Pet'

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      petData: [],
      favorites: this.props.favorites
    }
    this.db = new Database()
  }

  componentDidMount () {
    this.setState({favorites: this.props.favorites})
    this.makeEntry()
  }
  makeEntry () {
    this.db.getPets().then((response) => {
      this.setState({petData: response})
    })
  }

  render () {
    console.log(this.state)
    return this.state.petData.map((each, index) => {
      if (this.props.favorites && (this.props.favorites.indexOf(each.dog.id) !== -1)) {
        return <Pet key={index} {...this.props} petData={each} favorite={1} addFav={this.props.addFav} removeFav={this.props.removeFav} />
      } else {
        return <Pet key={index} {...this.props} petData={each} favorite={0} />
      }
    })
  }
}

export default Main
