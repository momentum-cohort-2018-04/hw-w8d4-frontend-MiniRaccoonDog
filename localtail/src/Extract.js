import React, { Component } from 'react'
import { Card, CardHeader, CardHeaderTitle } from 'bloomer'
import Database from './Database'

import petfinderParse from './petfinderParse'
import petfinderData from './petfinderData'

class Extract extends Component {
  constructor () {
    super()
    this.state = {
      user: window.localStorage.user ? window.localStorage.user : '',
      petData: {}
    }
    this.db = new Database()
  }

  componentDidMount () {
    const output = petfinderParse(petfinderData)
    this.db.writeDatabase(output)
  }

  render () {
    return (
      <Card>
        <CardHeader>
          <CardHeaderTitle>
            EXTRACTION COMMENCING
          </CardHeaderTitle>
        </CardHeader>
      </Card>)
  }
}

export default Extract
