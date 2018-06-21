import React, { Component } from 'react'
import { Card, CardHeader, CardImage, Content, CardContent } from 'bloomer'

import Lightbox from 'react-image-lightbox'
import Database from './Database'
import 'react-image-lightbox/style.css'

class Pet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      petData: this.props.petData,
      isExpanded: false,
      favorite: this.props.favorite
    }
    this.favorited = this.favorited.bind(this)
    this.db = new Database()
  }

  favorited (id) {
    if (window.localStorage.uid && this.props.favorite) {
      this.props.removeFav(id)
    } else if (window.localStorage.uid) {
      this.props.addFav(id)
    } else { return null }
  }

  expander () {
    this.setState({ isExpanded: !this.state.isExpanded })
  }

  render () {
    const pet = this.state.petData.dog
    const photoUrl = this.state.petData.photos.map(photo => {
      return photo.url
    })

    let sex
    if (pet.sex === 'F') { sex = 'Female' } else { sex = 'Male' }
    let size
    if (pet.size === 'M') { size = 'Medium' } else if (pet.size === 'L') { size = 'Large' } else if (pet.size === 'S') { size = 'Small' } else if (pet.size === 'XL') { size = 'Extra Large' } else { size = pet.size }
    let long = pet.description
    let short
    if (pet.description.length > 275) {
      short = pet.description.slice(0, 275) + '...' + `<div class='expander'>(Click to Expand)<div>`
    } else { short = pet.description }

    function createMarkup (description) {
      return {__html: description}
    }
    return (
      <Card id={pet.id} className='card' onDoubleClick={() => this.favorited(pet.id)}>
        <CardHeader>
          {Boolean(this.props.favorite) && <img className='favorite' src='https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2013/png/iconmonstr-bookmark-27.png&r=255&g=208&b=20' alt='favorited' />}
        </CardHeader>
        <CardImage className='image-container'>
          <LightboxExample images={photoUrl} name={pet.name} />
          {window.localStorage.email && <div className='bookmark' onClick={() => this.favorited(pet.id)} />}
        </CardImage>
        <CardContent>
          <div className='pet-name'>{pet.name}</div>
          <div className='pet-breed'>{pet.breed}</div>
          <div className='pet-stats'>
            <small className='small'>Sex:</small> {sex} - <small className='small'>Size:</small> {size}
          </div>
          <Content className='clear' onClick={() => this.expander()}>
            {!this.state.isExpanded && <div className='pet-text' dangerouslySetInnerHTML={createMarkup(short)} />}
            {this.state.isExpanded && <div className='pet-text' dangerouslySetInnerHTML={createMarkup(long)} />}
            <small className='float-left small'>{pet.shelterId}</small>
            <p className='float-right small'>{pet.contact.city}, {pet.contact.state} {pet.contact.zip}</p>
          </Content>
        </CardContent>
      </Card>
    )
  }
}

export default Pet

class LightboxExample extends Component {
  constructor (props) {
    super(props)
    this.state = {
      photoIndex: 0,
      isOpen: false,
      images: this.props.images
    }
  }

  render () {
    const { photoIndex, isOpen } = this.state

    return (
      <div>
        <a type='button' onClick={() => this.setState({ isOpen: true })}>
          <img className='image-photo' src={this.state.images[0]} alt={this.props.name} />
        </a>

        {isOpen && (
          <Lightbox className='top'
            mainSrc={this.state.images[photoIndex]}
            nextSrc={this.state.images[(photoIndex + 1) % this.state.images.length]}
            prevSrc={this.state.images[(photoIndex + this.state.images.length - 1) % this.state.images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + this.state.images.length - 1) % this.state.images.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({photoIndex: (photoIndex + 1) % this.state.images.length})
            }
          />
        )}
      </div>
    )
  }
}
