import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Pet from './Pet'

class Main extends Component {
  constructor () {
    super()
    this.state = {
      lastDogIndex: 20
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  handleScroll () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const windowHeight = window.innerHeight
    const bodyHeight = document.body.clientHeight - windowHeight
    const scrollPercentage = scrollTop / bodyHeight
    if (scrollPercentage > 0.9) {
      console.log('HandleScroll!')
      this.setState(prevState => ({
        lastDogIndex: Math.min(prevState.lastDogIndex + 20, this.props.petData.length)
      }))
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render () {
    return this.props.petData.slice(0, this.state.lastDogIndex).map((each, index) => {
      if (this.props.favorites && (this.props.favorites.indexOf(each.dog.id) !== -1)) {
        return <Pet key={index} {...this.props} petData={each} favorite={1} addFav={this.props.addFav} removeFav={this.props.removeFav} />
      } else {
        return <Pet key={index} {...this.props} petData={each} favorite={0} />
      }
    })
  }
}

export default Main

Main.propTypes = {
  petData: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  addFav: PropTypes.func.isRequired,
  removeFav: PropTypes.func.isRequired
}
