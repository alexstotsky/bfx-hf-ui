import React from 'react'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'

import Input from '../../ui/Input'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'

export default class CreateNewLayoutModal extends React.PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    label: '',
    error: '',
  }

  onLabelChange = (label) => {
    this.setState(() => ({ label }))
  }

  onSubmit = () => {
    const { label } = this.state
    const { onSubmit, onClose } = this.props

    if (_isEmpty(label)) {
      this.setState(() => ({ error: 'Label empty' }))
      return
    }

    onSubmit(label)
    onClose()
  }

  render() {
    const { onClose } = this.props
    const { label, error } = this.state

    return (
      <Modal
        onClose={onClose}
        label='Add Layout'
        actions={(
          <Button
            green
            onClick={this.onSubmit}
            label={[
              <i key='icon' className='icon-plus' />,
              <p key='text'>Add Layout</p>,
            ]}
          />
        )}
      >
        <Input
          type='text'
          value={label}
          placeholder='Layout Name'
          onChange={this.onLabelChange}
        />

        {!_isEmpty(error) && (
          <p className='error'>{error}</p>
        )}
      </Modal>
    )
  }
}
