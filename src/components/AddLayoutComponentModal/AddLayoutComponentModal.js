import React from 'react'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'

import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import Dropdown from '../../ui/Dropdown'
import {
  COMPONENT_TYPES, COMPONENT_LABELS,
} from '../GridLayout/GridLayout.helpers'

export default class AddLayoutComponentModal extends React.PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    componentType: COMPONENT_LABELS.CHART,
    error: '',
  }

  onComponentTypeChange = (componentType) => {
    this.setState(() => ({ componentType }))
  }

  onSubmit = () => {
    const { componentType } = this.state
    const { onSubmit, onClose } = this.props

    if (_isEmpty(componentType) || !COMPONENT_LABELS[componentType]) {
      this.setState(() => ({ error: 'Invalid Component' }))
      return
    }

    onSubmit(componentType)
    onClose()
  }

  render() {
    const { onClose } = this.props
    const { componentType, error } = this.state

    return (
      <Modal
        onClose={onClose}
        label='Add Component'
        className='hfui-addlayoutcomponentmodal__wrapper'
        actions={(
          <Button
            green
            onClick={this.onSubmit}
            label={[
              <i key='icon' className='icon-plus' />,
              <p key='text'>Add Component</p>,
            ]}
          />
        )}
      >
        <Dropdown
          value={componentType}
          onChange={this.onComponentTypeChange}
          options={Object.values(COMPONENT_TYPES).map(type => ({
            label: COMPONENT_LABELS[type],
            value: type,
          }))}
        />

        {!_isEmpty(error) && (
          <p className='error'>{error}</p>
        )}
      </Modal>
    )
  }
}
