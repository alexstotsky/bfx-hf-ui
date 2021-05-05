import React from 'react'

import SwitchMode from '../SwitchMode'

import MarketSelect from '../MarketSelect'
// import RefillIcon from '../../ui/Icons/RefillIcon'
import ExchangeInfoBarItem from './ExchangeInfoBarItem'
import quotePrefix from '../../util/quote_prefix'

import { propTypes, defaultProps } from './ExchangeInfoBar.props'
import './style.css'

import { EXCHANGE_INFO_BAR_CONTAINER } from './ExchangeInfoBar.constants'

export default class ExchangeInfoBar extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  componentDidMount() {
    const { activeExchange, activeMarket, addTickerRequirement } = this.props
    addTickerRequirement(activeExchange, activeMarket)
  }

  toggleTradingMode() {
    const { openTradingModeModal } = this.props
    openTradingModeModal()
  }

  render() {
    const {
      onChangeMarket,
      activeMarket,
      ticker,
      activeExchange,
      markets,
      openNotifications,
      showTicker,
      showNotifications,
      showAddComponent,
      onAddComponent,
      showSave,
      onSave,
      buttons: Buttons,
      // onRefillClick,
    } = this.props
    const {
      lastPrice, dailyChange, dailyChangePerc, high, low, volume,
    } = ticker

    const marketsForActiveExchange = markets[activeExchange] || []

    return (
      <div className='hfui-exchangeinfobar__wrapper'>
        <div className='hfui-exchangeinfobar__left'>
          <ExchangeInfoBarItem
            label='Market'
            className='hfui-exchangeinfobar__currency-selector'
            tag='div'
            value={(
              <MarketSelect
                markets={marketsForActiveExchange}
                value={activeMarket}
                onChange={(market) => {
                  onChangeMarket(activeExchange, market, activeMarket)
                }}
                renderWithFavorites
              />
            )}
          />
        </div>
        {(showTicker) && (
          <ul>
            <ExchangeInfoBarItem
              text
              vertical
              label='Last Price'
              value={lastPrice || '-'}
              valuePrefix={quotePrefix(activeMarket.quote)}
            />

            <ExchangeInfoBarItem
              text
              vertical
              label='24h Change'
              value={dailyChange || '-'}
              valuePrefix={quotePrefix(activeMarket.quote)}
              dataClassName={
                dailyChange
                  ? dailyChange < 0 ? 'hfui-red' : 'hfui-green'
                  : ''
              }
            />

            <ExchangeInfoBarItem
              text
              vertical
              label='24h Change %'
              valueSuffix='%'
              value={dailyChangePerc ? dailyChangePerc * 100 : '-'}
              dataClassName={
                dailyChangePerc
                  ? dailyChangePerc < 0 ? 'hfui-red' : 'hfui-green'
                  : ''
              }
            />

            <ExchangeInfoBarItem
              text
              vertical
              label='24h High'
              valuePrefix={quotePrefix(activeMarket.quote)}
              value={high || '-'}
            />

            <ExchangeInfoBarItem
              text
              vertical
              label='24h Low'
              valuePrefix={quotePrefix(activeMarket.quote)}
              value={low || '-'}
            />

            <ExchangeInfoBarItem
              text
              vertical
              label='24h Volume'
              value={volume || '-'}
            />
          </ul>
        )}

        <div className='hfui-exchangeinfobar__right'>
          {Buttons && (
            <div className='hfui-exchangeinfobar__buttons'>
              <Buttons />
            </div>
          )}
          <div className='hfui-tradingpaper__control'>
            <div className='hfui-tradingpaper__control-toggle'>
              <p>Paper Trading</p>
              <SwitchMode />
            </div>
            {/* <div className='hfui-tradingpaper__control-refill'>
              <RefillIcon onClick={onRefillClick} />
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}
