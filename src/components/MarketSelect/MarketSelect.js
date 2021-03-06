import React from 'react'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'
import Dropdown from '../../ui/Dropdown'
import FavoriteIcon from '../../ui/Icons/FavoriteIcon'

import './style.css'

export default class MarketSelect extends React.PureComponent {
  static propTypes = {
    value: PropTypes.instanceOf(Object).isRequired,
    onChange: PropTypes.func.isRequired,
    markets: PropTypes.instanceOf(Array).isRequired,
    renderLabel: PropTypes.bool,
    className: PropTypes.instanceOf(Object),
    currentMode: PropTypes.string,
    savePairs: PropTypes.func.isRequired,
    authToken: PropTypes.string.isRequired,
    favoritePairs: PropTypes.instanceOf(Array),
    renderWithFavorites: PropTypes.bool,
  }
  static defaultProps = {
    className: {},
    favoritePairs: [],
    currentMode: '',
    renderLabel: false,
    renderWithFavorites: false,
  }

  favoriteSelect(pair, isPairSelected) {
    const {
      savePairs,
      authToken,
      favoritePairs = [],
      currentMode,
    } = this.props
    if (isPairSelected) {
      savePairs([...favoritePairs, pair], authToken, currentMode)
    } else {
      const filteredPairs = favoritePairs.filter(p => p !== pair)
      savePairs(filteredPairs, authToken, currentMode)
    }
  }

  render() {
    const {
      value,
      onChange,
      markets,
      className,
      renderLabel,
      favoritePairs,
      renderWithFavorites,
      authToken,
      savePairs,
      currentMode,
      ...otherProps
    } = this.props

    const options = markets.map(m => ({
      label: m.uiID || `${m.base}/${m.quote}`,
      value: m.uiID,
    }))
    const sortedOptions = options.sort((a, b) => favoritePairs.includes(b.value) - favoritePairs.includes(a.value))

    return (
      <Dropdown
        label={renderLabel ? 'Market' : undefined}
        searchable
        searchModifier={(searchValue) => searchValue.replace(/[\s/]/g, '')}
        className={ClassNames('hfui-marketselect', className)}
        onChange={(val) => {
          onChange(markets.find(m => m.uiID === val))
        }}
        value={value.uiID}
        options={sortedOptions}
        optionRenderer={renderWithFavorites ? (optionValue, optionLabel) => {
          const isSelected = favoritePairs.includes(optionValue)
          return (
            <div className='hfui-marketselect__option'>
              <div className='hfui-marketselect__text'>{optionLabel}</div>
              <div
                className='hfui-marketselect__icon'
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  this.favoriteSelect(optionValue, !isSelected)
                }}
              >
                <FavoriteIcon
                  value={optionValue}
                  nonFilled={!isSelected}
                  isSelected={isSelected}
                  selectedColor='#F7F7F9'
                />
              </div>
            </div>
          )
        } : undefined}
        {...otherProps}
      />
    )
  }
}
