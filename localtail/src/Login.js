import React, { Component } from 'react'
import {Title, Button, Box, Field, Control, Label, Input, Help} from 'bloomer'
import Autocomplete from './Autocomplete'
import firebase from 'firebase'
import Database from './Database'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: window.localStorage.user ? window.localStorage.user : '',
      email: '',
      password: '',
      zipcode: '',
      loginFailed: false,
      error: ''
    }
    this.setState = this.setState.bind(this)
    this.getZip = this.getZip.bind(this)

    this.db = new Database()
  }

  changeHandler (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  getZip (value) {
    this.setState({zipcode: value})
  }

  submitLogin (event) {
    event.preventDefault()
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(response => {
        window.localStorage.zip = this.state.zipcode
        this.props.history.push('/')
      })
      .catch((error) => {
        this.setState({
          loginFailed: true,
          error: error.message
        })
      })
  }

  render () {
    console.log(this.state)
    return (
      <div className='inputwindow' >
        <Box className='entry'>
          <Title>Login</Title>
          <Field>
            <Label>Email</Label>
            <Control>
              <Input type='text' name='email' placeholder='Text Input' onChange={(event) => this.changeHandler(event)} />
            </Control>
          </Field>
          <Field>
            <Autocomplete getZip={this.getZip} />
            {/* <Control>
              <Input type='number' name='zipcode' placeholder='Enter 5-Digit Zipcode' onChange={(event) => this.changeHandler(event)} />
            </Control> */}
          </Field>
          <Field>
            <Label>Password</Label>
            <Control>
              <Input type='password' name='password' placeholder='Text Input' onChange={(event) => this.changeHandler(event)} />
            </Control>
            {this.state.loginFailed && <Help isColor='danger'>Invalid Credentials {this.state.error}</Help>}
          </Field>
          <Field isGrouped>
            <Control>
              {this.state.password && this.state.password !== '' && this.state.email !== '' ? <Button isColor='success' type='button' onClick={(event) => this.submitLogin(event)}>Submit</Button>
                : <Button isStatic isColor='success' type='button' onClick={(event) => this.submitLogin(event)}>Submit</Button>}
            </Control>
            <Control>
              <Button isOutlined isColor='danger' type='button' onClick={() => this.props.history.push('/')}>Cancel</Button>
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
