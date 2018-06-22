import React from 'react'

import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Button, Welcome } from '@storybook/react/demo'
import { MemoryRouter as Router } from 'react-router-dom'

import Main from '../Main'
import Login from '../Login'
import Register from '../Register'

addDecorator(story => (<Router>{story()}</Router>))

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role='img' aria-label='so cool'>
        😀 😎 👍 💯
      </span>
    </Button>
  ))

storiesOf('Main', module)
  .add('basic render', () => <Main />)

storiesOf('Login', module)
  .add('basic render', () => <Login />)

storiesOf('Register', module)
  .add('basic render', () => <Register />)
