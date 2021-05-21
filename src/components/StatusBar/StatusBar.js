import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

import NavbarButton from '../NavbarButton'
import MANIFEST from '../../../package.json'

import './style.css'

export default class StatusBar extends React.PureComponent {
  static propTypes = {
    wsConnected: PropTypes.bool,
    remoteVersion: PropTypes.string,
    apiClientState: PropTypes.number,
  }

  static defaultProps = {
    remoteVersion: '',
    wsConnected: false,
    apiClientState: null,
  }

  render() {
    const {
      wsConnected,
      remoteVersion,
      apiClientState,
    } = this.props

    const apiClientConnected = apiClientState === 2
    const apiClientConnecting = apiClientState === 1
    const apiClientDisconnected = !apiClientState

    return (
      <div className='hfui-statusbar__wrapper'>
        <div className='hfui-statusbar__inner'>
          <div className='hfui-statusbar__left'>
            <p>
              {remoteVersion && remoteVersion !== MANIFEST.version ? (
                <NavbarButton
                  label='Update to latest version'
                  external='https://github.com/bitfinexcom/bfx-hf-ui/releases'
                />
              ) : null}
              &nbsp;
              v
              {MANIFEST.version}
            </p>

            <p>
              {apiClientConnected
                ? 'UNLOCKED FOR BITFINEX'
                : 'LOCKED'}
            </p>
          </div>

          <div className='hfui-statusbar__right'>
            <p>
              {apiClientConnected
                ? 'HF Connected'
                : apiClientConnecting
                  ? 'HF Connecting'
                  : 'HF Disconnected'}
            </p>

            <span className={ClassNames('hfui-statusbar__statuscircle', {
              green: apiClientConnected,
              yellow: apiClientConnecting,
              red: apiClientDisconnected,
            })}
            />

            <p>{wsConnected ? 'WS Connected' : 'WS Disconnected'}</p>

            <span className={ClassNames('hfui-statusbar__statuscircle', {
              green: wsConnected,
              red: !wsConnected,
            })}
            />
          </div>
        </div>
      </div>
    )
  }
}
