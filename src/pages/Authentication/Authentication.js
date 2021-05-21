import React from 'react'
import PropTypes from 'prop-types'

import HFIcon from '../../ui/HFIcon'
import { version } from '../../../package.json'

import AuthenticationInitForm from './AuthenticationInitForm'
import AuthenticationUnlockForm from './AuthenticationUnlockForm'
import AuthenticationConnectingForm from './AuthenticationConnectingForm'

import './style.css'

export default class Authentication extends React.PureComponent {
  static propTypes = {
    configured: PropTypes.bool,
    wsConnected: PropTypes.bool,
    isPaperTrading: PropTypes.bool,
    onInit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onUnlock: PropTypes.func.isRequired,
  }

  static defaultProps = {
    configured: false,
    wsConnected: false,
    isPaperTrading: false,
  }

  render() {
    const {
      onInit,
      onReset,
      onUnlock,
      configured,
      wsConnected,
      isPaperTrading,
    } = this.props

    return (
      <div className='hfui-authenticationpage__wrapper'>
        <div className='hfui-authenticationpage__inner'>
          <div className='hfui-authenticationpage__inner-left'>
            <HFIcon />
            <div className='hfui-authenticationpage__inner-left-version-container'>
              <div className='hfui-authenticationpage__inner-left-version'>
                <h6>Crafted by Bitfinex</h6>
                <p>
                  v
                  {version}
                </p>
              </div>
            </div>
          </div>

          {!wsConnected ? (
            <AuthenticationConnectingForm />
          ) : configured ? (
            <AuthenticationUnlockForm
              onUnlock={onUnlock}
              onReset={onReset}
              isPaperTrading={isPaperTrading}
            />
          ) : (
            <AuthenticationInitForm
              onInit={onInit}
            />
          )}
        </div>
      </div>
    )
  }
}
