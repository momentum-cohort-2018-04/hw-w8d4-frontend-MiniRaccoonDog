import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
import {Title, Button, Box, Field, Control, Label, Input, Help} from 'bloomer'
import firebase from 'firebase'
import Database from './Database'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      passwordDup: '',
      invalidRegistration: ''
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.addUser = this.addUser.bind(this)
    this.setState = this.setState.bind(this)
    this.db = new Database()
  }

  changeHandler (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  submitRegister (event) {
    event.preventDefault()
    if (this.state.password === this.state.passwordDup && this.state.email) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(response => {
          console.log('register response', response)
          this.props.history.push('/')
        })
        .catch(function (error) {
          this.setState({invalidRegistration: error.message})
        })
    } else {
      this.setState({invalidRegistration: true})
      console.log('did not run email auth')
    }
  }

  render () {
    return (
      <div className='inputwindow'>
        <Box>
          <Title>Register</Title>
          <Field>
            <Label>Email</Label>
            <Control>
              <Input type='text' name='email' placeholder='Text Input' onChange={(event) => this.changeHandler(event)} />
            </Control>
          </Field>

          <Field>
            <Label>Password</Label>
            <Control>
              <Input type='password' name='password' placeholder='Text Input' onChange={(event) => this.changeHandler(event)} />
            </Control>
          </Field>

          <Field>
            <Label>Confirm Password</Label>
            <Control>
              <Input type='password' name='passwordDup' placeholder='Text Input' onChange={(event) => this.changeHandler(event)} />
            </Control>
            {this.state.password !== '' && this.state.password === this.state.passwordDup && <Help isColor='success'>Your Passwords Match!</Help>}
            {this.state.invalidRegistration && <Help isColor='danger'>{this.state.invalidRegistration}</Help>}
          </Field>
          <Field isGrouped>
            <Control>
              {this.state.password === this.state.passwordDup && this.state.password !== '' && this.state.email !== '' ? <Button isColor='success' type='button' onClick={(event) => this.submitRegister(event)}>Submit</Button>
                : <Button isStatic isColor='success' type='button' onClick={(event) => this.submitRegister(event)}>Submit</Button>
              }
            </Control>
            <Control>
              <Button isOutlined isColor='danger' type='button' onClick={() => this.props.history.push('/')}>Cancel</Button>
            </Control>
          </Field>
        </Box>
      </div>
    )
  }
}

export default Register
