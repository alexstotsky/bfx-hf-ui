import React from 'react'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'

import Button from '../../ui/Button'
import Input from '../../ui/Input'

export default class AuthenticationInit extends React.PureComponent {
  static propTypes = {
    onInit: PropTypes.func.isRequired,
  }

  state = {
    error: '',
    password: '',
    confirmPassword: '',
  }

  onPasswordChange = (password) => {
    this.setState(() => ({ password }))
  }

  onConfirmPasswordChange = (confirmPassword) => {
    this.setState(() => ({ confirmPassword }))
  }

  onSubmit = () => {
    const { password, confirmPassword } = this.state
    const { onInit } = this.props

    if (password !== confirmPassword) {
      this.setState(() => ({ error: 'Passwords do not match' }))
      return
    }

    this.setState(() => ({ error: '' }))
    onInit(password)
  }

  render() {
    const { password, confirmPassword, error } = this.state
    const submitReady = (
      (!_isEmpty(password) && !_isEmpty(confirmPassword))
      && (password === confirmPassword)
    )

    return (
      <div className='hfui-authenticationpage__content'>
        <h2>Honey Framework UI</h2>
        <p>Create a password to encrypt your API credentials &amp; strategies. All data is stored locally, and your password is hashed.</p>

        <form className='hfui-authenticationpage__inner-form'>
          <Input
            type='text'
            name='username'
            placeholder='Username'
            autocomplete='username'
            style={{ display: 'none' }}
          />

          <Input
            type='password'
            value={password}
            placeholder='Password'
            autocomplete='new-password'
            onChange={this.onPasswordChange}
          />

          <Input
            type='password'
            value={confirmPassword}
            autocomplete='new-password'
            placeholder='Confirm password'
            onChange={this.onConfirmPasswordChange}
          />

          <Button
            green
            onClick={this.onSubmit}
            disabled={!submitReady}
            label='Save Credentials'
          />

          {error && (
            <p className='hfui-authenticationpage__inner-error'>
              {error}
            </p>
          )}
        </form>
      </div>
    )
  }
}
