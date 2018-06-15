import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
import {Title, Button, Box, Field, Control, Label, Input, Help} from 'bloomer'
import firebase from 'firebase'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      passwordDup: '',
      invalidRegistration: false
    }
    this.changeHandler = this.changeHandler.bind(this)
  }

  changeHandler (event) {
    this.setState({[event.target.name]: event.target.value})
  }

  submitRegister (event) {
    event.preventDefault()
    if (this.state.password === this.state.passwordDup && this.state.email) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(response => (
          this.props.history.push('/')
        ))
        .catch(function (error) {
        // Handle Errors here.
          var errorCode = error.code
          console.log(errorCode)
          var errorMessage = error.message
          // ...
          console.log(errorMessage)
          this.setState({invalidRegistration: true})
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
            {this.state.invalidRegistration && <Help isColor='danger'>Please Verify All Fields and Resubmit</Help>}
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
