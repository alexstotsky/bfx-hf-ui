import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import StatusBar from './StatusBar'
import { getNumberOfLayouts, getRemoteVersion } from '../../redux/selectors/ui'
import { getSocket, getAPIClientState } from '../../redux/selectors/ws'

const mapStateToProps = (state = {}) => {
  const socket = getSocket()(state)
  const { status: wsStatus } = socket

  return {
    wsConnected: wsStatus === 'online',
    nLayouts: getNumberOfLayouts(state),
    remoteVersion: getRemoteVersion(state),
    apiClientState: getAPIClientState(state),
  }
}

const mapDispatchToProps = dispatch => ({
  navigate: (route) => {
    dispatch(push(route))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar)
