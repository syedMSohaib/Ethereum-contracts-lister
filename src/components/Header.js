import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <nav className="navbar navbar-light bg-dark static-top">
      <div className="container">
        <a className="white navbar-brand" href="#">
          Ethereum Contract Lister
        </a>
        <div className="pull-right">
          <Link className="white mr-3" to="/">
            Home {'  |'}
          </Link>
          <Link className="white mr-3" to="/blocks">
            Blocks {'  |'}
          </Link>
          <Link className="white mr-3" to="/transactions">
            Transaction {'  |'}
          </Link>

          <a className="white" href="#">
            Made with ❤ by Syed M Sohaib
          </a>

        </div>
      </div>
    </nav>
  )
}
