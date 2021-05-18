import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'
import Scrollbars from 'react-custom-scrollbars'
import OnClickOutside from 'react-onclickoutside'

import './style.css'

class Dropdown extends React.PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    highlight: PropTypes.bool,
    fallback: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.instanceOf(Array).isRequired,
  }

  static defaultProps = {
    value: '',
    label: '',
    fallback: '',
    isOpen: false,
    disabled: false,
    highlight: false,
  }

  state = {
    open: false,
  }

  handleClickOutside() {
    this.setState(() => ({ open: false }))
  }

  onSelect(value) {
    const { onChange } = this.props
    onChange(value)

    this.setState(() => ({ open: false }))
  }

  onToggleOpen = () => {
    this.setState(({ open }) => ({ open: !open }))
  }

  render() {
    const { open } = this.state
    const {
      label, value, options, highlight, fallback, disabled, isOpen, icon,
    } = this.props

    return (
      <div className='hfui-dropdown__wrapper'>
        {label && (
          <p>{label}</p>
        )}

        <div className='hfui-dropdown__button-wrapper'>
          <div
            onClick={disabled ? () => {} : this.onToggleOpen}
            className={ClassNames('hfui-dropdown__button', {
              highlight: open || highlight,
              disabled,
            })}
          >
            {icon && (
              <i className={`icon-${icon}`} />
            )}

            <p
              className={ClassNames({
                'with-icon': icon,
              })}
            >
              {(options.find(o => o.value === value) || {}).label || fallback || 'Select an option'}
            </p>

            <i className='icon-arrow-down-passive' />
          </div>

          {(open || isOpen) && (
            <ul
              className={ClassNames({ 'with-icon': icon })}
            >
              <Scrollbars autoHeight style={{ maxHeight: '300px' }}>
                {options.map(o => (
                  o.value === '_label' ? (
                    <li
                      key={o.label}
                      className='label'
                    >
                      {o.label}
                    </li>
                  ) : (
                    <li
                      key={o.value}
                      onClick={this.onSelect.bind(this, o.value)}
                    >
                      {o.label}
                    </li>
                  )
                ))}
              </Scrollbars>
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default OnClickOutside(Dropdown)
