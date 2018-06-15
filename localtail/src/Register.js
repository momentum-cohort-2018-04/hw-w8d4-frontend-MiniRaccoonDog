import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
import {Title, Button, Box, Field, Control, Label, Input, Help} from 'bloomer'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      user: window.localStorage.user ? window.localStorage.user : '',
      username: '',
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
    if (this.state.password === this.state.passwordDup && this.state.username) {
      const body = {
        username: this.state.username,
        password: this.state.password
      }
      console.log('login body', body)
    } else {
      this.setState({invalidRegistration: true})
    }
  }

  render () {
    return (
      <div className='inputwindow'>
        <Box>
          <Title>Register</Title>
          <Field>
            <Label>Username</Label>
            <Control>
              <Input type='text' name='username' placeholder='Text Input' onChange={(event) => this.changeHandler(event)} />
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
              {this.state.password === this.state.passwordDup && this.state.password !== '' && this.state.username !== '' ? <Button isColor='success' type='button' onClick={(event) => this.submitRegister(event)}>Submit</Button>
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
