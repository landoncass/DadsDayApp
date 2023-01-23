import React from 'react'
import { AllDaysOut } from './pages/Landing'
import logo2 from './images/Logo2.png'

export function App() {
  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <img src={logo2} />
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">Home</a>
          </div>
        </div>
      </nav>

      <body>{AllDaysOut()}</body>
      <footer>
        <p>Built with SDG in St Petersburg, Florida.</p>
      </footer>
    </div>
  )
}