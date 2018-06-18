import React, { Component } from 'react'
import Pet from './Pet'
import { Box } from 'bloomer'

class Favorites extends Component {
  render () {
    let favArray = this.props.petData.filter((pet) => this.props.favorites.indexOf(pet.dog.id) !== -1)

    if (favArray.length === 0) {
      return (
        <Box className='center'>
          <img src='https://i.imgflip.com/5f3wz.jpg' alt='sad dog' />
          <h2>You have no Favorite dogs at the moment. Return to browsing and try liking a few!</h2></Box>)
    } else {
      return favArray.map((each, index) => {
        return <Pet key={index} {...this.props} petData={each} favorite={1} addFav={this.props.addFav} removeFav={this.props.removeFav} />
      })
    }
  }
}

export default Favorites
