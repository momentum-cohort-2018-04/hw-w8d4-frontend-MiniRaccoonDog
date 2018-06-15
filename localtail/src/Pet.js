import React, { Component } from 'react'
import { Card, CardHeader, CardHeaderTitle, CardImage, Image, Title, Subtitle, Media, MediaContent, Content, CardContent } from 'bloomer'
import Database from './Database'

class Pet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: window.localStorage.user ? window.localStorage.user : '',
      petData: this.props.petData
    }
    this.db = new Database()
  }

  render () {
    const pet = this.state.petData
    return (
      <Card id={pet.id}>
        <CardHeader>
          <CardHeaderTitle>
            Component
          </CardHeaderTitle>
        </CardHeader>
        <CardImage>
          <Image isRatio='4:3' src='https://via.placeholder.com/1280x960' />
        </CardImage>
        <CardContent>
          <Media>
            <MediaContent>
              <Title isSize={4}>{pet.name}</Title>
              <Subtitle isSize={6}>{pet.breed}  Sex:{pet.sex}  Size:{pet.size}</Subtitle>
            </MediaContent>
          </Media>
          <Content>
            {pet.description}
            <br />
            <small>{pet.shelterId}</small>
          </Content>
          <Content>
            <p>{console.log(pet.contact)}</p>
            {/* <p>{pet.contactcity}, {pet.contact.state} {pet.contact.zip}</p> */}
          </Content>
        </CardContent>
      </Card>)
  }
}

export default Pet
