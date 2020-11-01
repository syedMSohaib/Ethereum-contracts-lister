import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import './Autocomplete.css'
import axios from 'axios'
import utils from '../../Utils'
import Select from 'react-select'

class Autocomplete extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: '',
    }
  }

  // Event fired when the input value is changed
  onChange = (e) => {
    const { suggestions } = this.props
    const userInput = e.currentTarget.value

    // Filter our suggestions that don't contain the user's input
    this.search(userInput)

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      showSuggestions: true,
      userInput: e.currentTarget.value,
    })
  }

  // Event fired when the user clicks on a suggestion
  onClick = (e, data) => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      // userInput: e.currentTarget.innerText,
    });

    this.props.return(data);
  }

  // Event fired when the user presses a key down
  onKeyDown = (e) => {
    const { activeSuggestion, filteredSuggestions } = this.state

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion],
      })
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 })
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 })
    }
  }

  search = (q) => {
    axios
      .get(`${utils.BASE_URL}/blocks/search?q=${q ? q : this.state.userInput}`)
      .then((response) => {
        this.setState({ filteredSuggestions: response.data })
      })
  }

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput,
      },
    } = this

    let suggestionsListComponent

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {

              console.log(suggestion);
              let className

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = 'suggestion-active'
              }

              return (
                <li className={className} key={suggestion} onClick={(e) => onClick(e, suggestion)}>
                  <div
                    className="ether-search media rounded p-2 ui-menu-item-wrapper"
                    style={{ zIndex: 1000000000000 }}
                  >
                    <div className="media-body text-truncate">
                      <h6 className="d-flex align-items-center text-size-1 mb-0">
                        <div className="text-truncate mr-2">{suggestion.blockNumber}</div>
                        {
                            suggestion['TotalTxn'] ? <span className="badge bg-soft-secondary mr-2">
                              Txn: {suggestion.TotalTxn}
                          </span> : ''
                        }
                      </h6>
                      {
                          suggestion['transactionHash'] ? <span className="text-secondary text-truncate font-size-1">
                              Txn: {suggestion.transactionHash}
                          </span> : ''
                        }                      
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        )
      }
    }

    return (
      <Fragment>
        <div className="input-group input-group-shadow">
          <input
            id="txtSearchInput"
            type="text"
            className="form-control searchautocomplete ui-autocomplete-input list-unstyled py-3 mb-0"
            autoComplete="off"
            spellCheck="false"
            placeholder="Search by Txn Hash / Block"
            aria-describedby="button-header-search"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            name="q"
          />
          <div className="input-group-append">
            <button
              className="btn btn-secondary btn-secondary-darkmode"
              type="button"
              onClick={onKeyDown}
            >
              <i className="fa fa-search" />
            </button>
          </div>
        </div>
        {suggestionsListComponent}
      </Fragment>
    )
  }
}

export default Autocomplete
