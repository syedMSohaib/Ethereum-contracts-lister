import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import AllBlock from './components/AllBlock'
import AllTransaction from './components/AllTransaction'
import { HashRouter, Route, hashHistory } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <HashRouter basename={'/ethereum-contract-lister'} history={hashHistory}>
        <Header />
        <Switch>
          <Route path="/blocks">
            <AllBlock />
          </Route>
          <Route path="/transactions">
            <AllTransaction />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </HashRouter>
    )
  }
}
