import React, { Component } from 'react'
import { Card, CardHeader, CardHeaderTitle, CardImage, Image, Title, Subtitle, Media, MediaContent, Content, CardContent } from 'bloomer'

class Pet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: window.localStorage.user ? window.localStorage.user : '',
      petData: this.props.petData
    }
    console.log('petData', this.state.petData)
  }

  render () {
    const pet = this.state.petData.dog
    const photos = this.state.petData.photos.map(photo => {
      return (<img className='image-photo' isRatio='4:3' src={photo.url} />)
      // alt use Image from Bloomer
    })
    function createMarkup () {
      return {__html: pet.description}
    }
    return (
      <Card id={pet.id} className='card'>
        <CardHeader>
          <CardHeaderTitle>
            Component
          </CardHeaderTitle>
        </CardHeader>
        <CardImage className='image-container'>
          {photos}
        </CardImage>
        <CardContent>
          <Media>
            <MediaContent>
              <Title isSize={4}>{pet.name}</Title>
              <Subtitle isSize={6}>{pet.breed}  Sex:{pet.sex}  Size:{pet.size}</Subtitle>
            </MediaContent>
          </Media>
          <Content>
            <div dangerouslySetInnerHTML={createMarkup()} />
            <br />
            <small>{pet.shelterId}</small>
          </Content>
          <Content>
            {/* <p>{console.log(pet.contact)}</p> */}
            <p>{pet.contact.city}, {pet.contact.state} {pet.contact.zip}</p>
          </Content>
        </CardContent>
      </Card>)
  }
}

export default Pet
