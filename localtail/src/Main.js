import React, { Component } from 'react'
import Pet from './Pet'

class Main extends Component {
  render () {
    console.log(this.props.petData)
    return this.props.petData.map((each, index) => {
      if (this.props.favorites && (this.props.favorites.indexOf(each.dog.id) !== -1)) {
        return <Pet key={index} {...this.props} petData={each} favorite={1} addFav={this.props.addFav} removeFav={this.props.removeFav} />
      } else {
        return <Pet key={index} {...this.props} petData={each} favorite={0} />
      }
    })
  }
}

export default Main
