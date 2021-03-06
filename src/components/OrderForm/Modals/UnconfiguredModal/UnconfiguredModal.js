import React from 'react'

import OrderFormModal from '../../OrderFormModal'
import { propTypes, defaultProps } from './UnconfiguredModal.props'

export default class UnconfiguredModal extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { onClick, isPaperTrading } = this.props

    return (
      <OrderFormModal
        title='NOT CONFIGURED'
        titleColor='#f05359'
        icon='icon-api'
        onClick={onClick}
        content={[
          <p key='a' className='underline'>
            Submit
            {isPaperTrading ? ' Paper Trading ' : ' '}
            API keys
          </p>,
        ]}
      />
    )
  }
}
