import React, { Component } from 'react'
import axios from 'axios'
import Block from './Block'
import Transaction from './Transaction'
import '../App.css'
import utils from '../Utils'
import Autocomplete from './lib/Autocomplete'
import TxnDetail from './TxnDetail'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blocks: [],
      suggestions: [],
      isLoading: false,
      showDetail: false,
    }
    this.lastRequestId = null
  }

  componentDidMount() {
    this.fetchBlocks()
  }

  fetchBlocks = () => {
    axios
      .get(`${utils.BASE_URL}/blocks/fetch`)
      .then((response) => {
        this.setState({ blocks: response.data })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  callback = (data) => {
    console.log(data)
    this.setState({ showDetail: true, detailData: data })
  }

  render() {
    return (
      <div>
        <section className="bg-light">
          <div className="row justify-content-center align-items-center mb-4">
            <div className="mt-4  col-md-12 col-lg-6 col-offset-md-4">
              <div className="pr-lg-4 pr-xll-5">
                <h1 className="h4 font-weight-medium mb-2">
                  Ethereum Testnet Explorer
                </h1>
                <form className="mb-3" method="GET" _lpchecked={1}>
                  <Autocomplete return={this.callback} suggestions={[]} />
                </form>
              </div>
            </div>
          </div>
          <div className="container space-bottom-1 mt-5">
            <div className="row mb-5">
              {this.state.showDetail ? (
                <React.Fragment>
                  <button onClick={() => { this.setState({ showDetail: false}) }}>Back</button>
                  <TxnDetail detailData={this.state.detailData}/>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Block blocks={this.state.blocks} />
                  <Transaction blocks={this.state.blocks} />
                </React.Fragment>
              )}
            </div>
          </div>
        </section>
      </div>
    )
  }
}
