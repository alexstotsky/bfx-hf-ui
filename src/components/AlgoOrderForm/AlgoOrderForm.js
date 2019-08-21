/* eslint-disable no-sparse-arrays */
import React, { PureComponent } from 'react'
import Modal from 'react-modal'
import { Icon } from '@blueprintjs/core'
import { NotificationManager } from 'react-notifications'
import WSHFActions from '../../redux/actions/ws-hf-server'
import { store } from '../../StoreWrapper'

const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    bottom: 'auto',
    width: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#161E24',
    border: 'none',
    position: 'relative',
  },
  overlay: {
    background: 'rgba(0,0,0,0.5)',
  },
}

export default class ModalForm extends PureComponent {
  state = {
    modalIsOpen: false,
    fileName: '',
  }

  toggleModal() {
    const { modalIsOpen } = this.state
    this.setState({
      modalIsOpen: !modalIsOpen,
      fileName: '',
    })
  }

  handleFile(e) {
    if (e.target.files[0]) {
      const { name } = e.target.files[0]
      this.setState({ fileName: name })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { algoName, algoDesc } = e.target
    const { data } = this.props
    const { name } = data

    // store.dispatch({
    //   type: 'ADD_ALGO_ORDER',
    //   payload: {
    //     algoOrder: [42, 'bfx-ping_pong', false, null, 1561361614648],
    //   },
    // })

    WSHFActions.send(['as', ['submit.ao', [, name,
      {
        _margin: false,
        _derivative: false,
        tradeBeyondEnd: false,
        orderType: 'EXCHANGE LIMIT',
        priceTarget: 'OB_MID',
        priceCondition: 'MATCH_MIDPOINT',
        amount: 0.0001,
        sliceAmount: 0.00005,
        sliceInterval: 10000,
        symbol: 'tBTCUSD',
        cancelDelay: 1000,
        submitDelay: 2000,
        priceDelta: 0,
      }]]])

    NotificationManager.success(`${name} order started succesfuly`)
    this.toggleModal()
  }

  render() {
    const { modalIsOpen, fileName } = this.state || {}
    const { data } = this.props
    const { name } = data
    switch (name) {
      case 'Ping/Pong': {
        return (
          <div>
  <button
              type='button'
              className='hfui__stop-order-btn'
              onClick={() => this.toggleModal()}
            >
              New Order
            </button>
  <Modal
              isOpen={modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel='Example Modal'
            >
              <Icon
                className='hfui__close-modal-button'
                icon='cross'
                key='cross'
                onClick={() => this.toggleModal()}
              />
              <div>Create Algo Order</div>
              <form className='hfui_modal-algo-form' onSubmit={e => this.handleSubmit(e)}>
                {/* <input name='algoName' type='text' placeholder='Name of algo order' />
                <input name='algoDesc' type='text' placeholder='Short description' />
                <label>
                  <div className='button'>Upload File</div>
                  <div className='filesContainer'>{fileName}</div>
                  <input type='file' accept='.js' size='60' onChange={e => this.handleFile(e)} />
                </label> */}
                <input type='text' placeholder='amount btc' />
                <input type='text' placeholder='slice amount' />
                <input type='text' placeholder='AMOUNT DISTORTION %' />
                <input type='text' placeholder='SLICE INTERVAL (SEC)' />
                <input type='text' placeholder='SLICE DISTORTION %' />

                <input name='algo_order_submit' type='submit' value='Submit' className='hfui__add-order-btn' />
              </form>
            </Modal>
</div>
        )
      }
      case 'TWAP': {
        return (
          <div>
  <button
            type='button'
            className='hfui__stop-order-btn'
            onClick={() => this.toggleModal()}
          >
            New Order
          </button>
  <Modal
            isOpen={modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel='Example Modal'
          >
            <Icon
              className='hfui__close-modal-button'
              icon='cross'
              key='cross'
              onClick={() => this.toggleModal()}
            />
            <div>Create Algo Order</div>
            <form className='hfui_modal-algo-form' onSubmit={e => this.handleSubmit(e)}>
              {/* <input name='algoName' type='text' placeholder='Name of algo order' />
              <input name='algoDesc' type='text' placeholder='Short description' />
              <label>
                <div className='button'>Upload File</div>
                <div className='filesContainer'>{fileName}</div>
                <input type='file' accept='.js' size='60' onChange={e => this.handleFile(e)} />
              </label> */}
              <input type='text' placeholder='AMOUNT BTC' />
              <input type='text' placeholder='SLICE AMOUNT' />
              <input type='text' placeholder='AMOUNT DISTORTION %' />
              <input type='text' placeholder='SLICE INTERVAL (SEC)' />
              <input type='text' placeholder='SUBMIT DELAY (SEC)' />
              <input type='text' placeholder='CANCEL DELAY (SEC)' />

              <input name='algo_order_submit' type='submit' value='Submit' className='hfui__add-order-btn' />
            </form>
          </Modal>
</div>
        )
      }
      case 'Iceberg': {
        return (
          <div>
  <button
          type='button'
          className='hfui__stop-order-btn'
          onClick={() => this.toggleModal()}
        >
          New Order
        </button>
  <Modal
          isOpen={modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel='Example Modal'
        >
          <Icon
            className='hfui__close-modal-button'
            icon='cross'
            key='cross'
            onClick={() => this.toggleModal()}
          />
          <div>Create Algo Order</div>
          <form className='hfui_modal-algo-form' onSubmit={e => this.handleSubmit(e)}>
            {/* <input name='algoName' type='text' placeholder='Name of algo order' />
            <input name='algoDesc' type='text' placeholder='Short description' />
            <label>
              <div className='button'>Upload File</div>
              <div className='filesContainer'>{fileName}</div>
              <input type='file' accept='.js' size='60' onChange={e => this.handleFile(e)} />
            </label> */}
            <input type='text' placeholder='AMOUNT BTC' />
            <input type='text' placeholder='SLICE AMOUNT' />
            <input type='text' placeholder='SLICE AMOUNT AS %' />
            <input type='text' placeholder='AMOUNT DISTORTION %' />
            <input type='text' placeholder='SUBMIT DELAY (SEC)' />
            <input type='text' placeholder='CANCEL DELAY (SEC)' />

            <input name='algo_order_submit' type='submit' value='Submit' className='hfui__add-order-btn' />
          </form>
        </Modal>
</div>
        )
      }
      case 'Accumulate/Distribute': {
        return (
          <div>
  <button
        type='button'
        className='hfui__stop-order-btn'
        onClick={() => this.toggleModal()}
      >
        New Order
      </button>
  <Modal
        isOpen={modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <Icon
          className='hfui__close-modal-button'
          icon='cross'
          key='cross'
          onClick={() => this.toggleModal()}
        />
        <div>Create Algo Order</div>
        <form className='hfui_modal-algo-form' onSubmit={e => this.handleSubmit(e)}>
          {/* <input name='algoName' type='text' placeholder='Name of algo order' />
          <input name='algoDesc' type='text' placeholder='Short description' />
          <label>
            <div className='button'>Upload File</div>
            <div className='filesContainer'>{fileName}</div>
            <input type='file' accept='.js' size='60' onChange={e => this.handleFile(e)} />
          </label> */}
          <input type='text' placeholder='AMOUNT BTC' />
          <input type='text' placeholder='SLICE AMOUNT' />
          <input type='text' placeholder='AMOUNT DISTORTION %' />
          <input type='text' placeholder='SLICE INTERVAL (SEC)' />
          <input type='text' placeholder='SUBMIT DELAY (SEC)' />
          <input type='text' placeholder='CANCEL DELAY (SEC)' />

          <input name='algo_order_submit' type='submit' value='Exchange submit' className='hfui__add-order-btn' />
        </form>
      </Modal>
</div>
        )
      }
      default: {
        return (
          <div>
  <button
            type='button'
            className='hfui__stop-order-btn'
            onClick={() => this.toggleModal()}
          >
              New Order
          </button>
</div>
        )
      }
    }
  }
}
