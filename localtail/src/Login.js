import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
import {Title, Button, Box, Field, Control, Label, Input, Help} from 'bloomer'
// import { Button, Box } from 'bloomer'

import firebase from 'firebase'
// const provider = new firebase.auth.GoogleAuthProvider()

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: window.localStorage.user ? window.localStorage.user : '',
      email: '',
      password: '',
      loginFailed: false
    }
  }

  changeHandler (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  submitLogin (event) {
    event.preventDefault()
    // firebase.auth().signInWithRedirect(provider)
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(response =>
        this.props.history.push('/'))
      .catch(function (error) {
      // Handle Errors here.
        var errorCode = error.code
        console.log('sing in error code', errorCode)
        var errorMessage = error.message
        console.log('sing in error code', errorMessage)
        this.setState({loginFailed: true})
      // ...
      })
  }

  render () {
    console.log(this.state)
    return (
      <div className='inputwindow' >
        <Box>
          {/* <Button isColor='primary' onClick={this.submitLogin}>Login with Google</Button>} */}
          <Title>Login</Title>
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
            {this.state.loginFailed && <Help isColor='danger'>Invalid Credentials</Help>}
          </Field>

          <Field isGrouped>
            <Control>
              {this.state.password && this.state.password !== '' && this.state.email !== '' ? <Button isColor='success' type='button' onClick={(event) => this.submitLogin(event)}>Submit</Button>
                : <Button isStatic isColor='success' type='button' onClick={(event) => this.submitLogin(event)}>Submit</Button>}
            </Control>
            <Control>
              <Button isOutlined isColor='danger' type='button' onClick={() => this.props.history.goBack}>Cancel</Button>
            </Control>
          </Field>

          <Control>
            <Label>No Login? Register Here:</Label>
            <Button isColor='success' type='button' onClick={() => this.props.history.push('/register')}>Register</Button>
          </Control>
        </Box>
      </div>
    )
  }
}

export default Login
