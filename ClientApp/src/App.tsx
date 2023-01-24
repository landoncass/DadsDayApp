import React from 'react'
import { AllDaysOut } from './pages/AllDaysOut'
import logo2 from './images/Logo2.png'

export function App() {
  return (
    <div>
      <header>
        <img src={logo2} height="auto" align="center" />
      </header>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item">
            <img src={logo2} />
          </a>

          <a className="navbar-item">Home</a>
          <a className="navbar-item">Your Days Out</a>
          <a className="navbar-item">Add a Day Out</a>
        </div>
      </nav>
      <body className="componentView">{AllDaysOut()}</body>
      <footer>
        <p>Built with SDG in St Petersburg, Florida.</p>
      </footer>
    </div>
  )
}
