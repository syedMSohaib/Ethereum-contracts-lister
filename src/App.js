import React, { Component } from 'react'
import Header from './components/Header'
import axios from 'axios'
import './App.css'
import Block from './components/Block'
import Transaction from './components/Transaction'
import Footer from './components/Footer'

const BASE_URL = 'http://localhost:1337'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blocks: [],
    }
  }

  componentDidMount() {
    this.fetchBlocks()
  }

  fetchBlocks = () => {
    axios
      .get(`${BASE_URL}/blocks/fetch`)
      .then((response) => {
        this.setState({ blocks: response.data })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <Header />
        <section className="bg-light">
          <div className="row justify-content-center align-items-center mb-4">
            <div className="mt-4  col-md-12 col-lg-6 col-offset-md-4">
              <div className="pr-lg-4 pr-xll-5">
                <h1 className="h4 font-weight-medium mb-2">
                  Ethereum Testnet Explorer
                </h1>
                <form className="mb-3" method="GET" _lpchecked={1}>
                  <div className="input-group input-group-shadow">
                    <input
                      id="txtSearchInput"
                      type="text"
                      className="form-control searchautocomplete ui-autocomplete-input list-unstyled py-3 mb-0"
                      autoComplete="off"
                      spellCheck="false"
                      placeholder="Search by Address / Txn Hash / Block / Token / Ens"
                      aria-describedby="button-header-search"
                      name="q"
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-secondary btn-secondary-darkmode"
                        type="submit"
                      >
                        <i className="fa fa-search" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="container space-bottom-1 mt-5">
            <div className="row mb-5">
              <Block blocks={this.state.blocks} />
              <Transaction blocks={this.state.blocks} />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }
}
