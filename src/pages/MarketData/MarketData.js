import React from 'react'
import Joyride, { STATUS } from 'react-joyride'
import Layout from '../../components/Layout'
import GridLayoutPage from '../../components/GridLayoutPage'
import { propTypes } from './MarketData.props'
import './style.css'

export default class MarketData extends React.PureComponent {
  static propTypes = propTypes

  state = {
    steps: [
      {
        locale: { last: 'Finish' },
        target: '.hfui-button.green',
        content: 'To customize your layout, you can add components to it',
      },
    ],
  }
  constructor(props) {
    super(props)
    this.onGuideFinish = this.onGuideFinish.bind(this)
  }
  onGuideFinish(data) {
    const { finishGuide } = this.props
    const { status } = data
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED]
    const CLOSE = 'close'
    if (finishedStatuses.includes(status) || data.action === CLOSE) {
      finishGuide()
    }
  }
  render() {
    const commonComponentProps = {
      dark: true,
      darkHeader: true,
      showMarket: true,
      canChangeMarket: true,
      showChartMarket: true,
    }
    const { steps } = this.state
    const { isGuideActive, firstLogin } = this.props
    return (
      <Layout>
        <Layout.Header />
        <Layout.Main>
          {firstLogin && (
            <Joyride
              callback={this.onGuideFinish}
              steps={steps}
              run={isGuideActive}
              continuous
              showProgress
              showSkipButton
              styles={{
                options: {
                  zIndex: 10000,
                },
              }}
            />
          )}
          <GridLayoutPage
            defaultLayoutID='Default Market Data'
            tradesProps={commonComponentProps}
            bookProps={commonComponentProps}
            chartProps={commonComponentProps}
          />
        </Layout.Main>
        <Layout.Footer />
      </Layout>
    )
  }
}
