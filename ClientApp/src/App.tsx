import React from 'react'
import { AllDaysOut } from './pages/Landing page'
import logo from './images/Logo.png'

export function App() {
  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <img src={logo} />
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">Home</a>
          </div>
        </div>
      </nav>

      <body>
        <main>
          <h1>See what other dads have done recently: </h1>
          <input type="text" placeholder="Search" />
          <ul>
            <li>
              <div className="box">
                <p>
                  <strong>Where’d you go:</strong> Skyzone
                </p>
                <p>
                  <strong>When:</strong> 12/2/2022
                </p>
                <p>
                  <strong>How was it:</strong> Benny really liked jumping on the
                  trampoline with the ball. I hurt my knee, but we’ll ...
                </p>
                <p>
                  <strong>User:</strong> Greg
                </p>
              </div>
            </li>

            <li>
              <div className="box">
                <p>
                  <strong>Where’d you go:</strong> Skyzone
                </p>
                <p>
                  <strong>When:</strong> 12/2/2022
                </p>
                <p>
                  <strong>How was it:</strong> Benny really liked jumping on the
                  trampoline with the ball. I hurt my knee, but we’ll ...
                </p>
                <p>
                  <strong>User:</strong> Greg
                </p>
              </div>
            </li>
            <li>
              <div className="box">
                <p>
                  <strong>Where’d you go:</strong> Skyzone
                </p>
                <p>
                  <strong>When:</strong> 12/2/2022
                </p>
                <p>
                  <strong>How was it:</strong> Benny really liked jumping on the
                  trampoline with the ball. I hurt my knee, but we’ll ...
                </p>
                <p>
                  <strong>User:</strong> Greg
                </p>
              </div>
            </li>

            <li>
              <div className="box">
                <p>
                  <strong>Where’d you go:</strong> Skyzone
                </p>
                <p>
                  <strong>When:</strong> 12/2/2022
                </p>
                <p>
                  <strong>How was it:</strong> Benny really liked jumping on the
                  trampoline with the ball. I hurt my knee, but we’ll ...
                </p>
                <p>
                  <strong>User:</strong> Greg
                </p>
              </div>
            </li>
            <li>
              <div className="box">
                <p>
                  <strong>Where’d you go:</strong> Skyzone
                </p>
                <p>
                  <strong>When:</strong> 12/2/2022
                </p>
                <p>
                  <strong>How was it:</strong> Benny really liked jumping on the
                  trampoline with the ball. I hurt my knee, but we’ll ...
                </p>
                <p>
                  <strong>User:</strong> Greg
                </p>
              </div>
            </li>
          </ul>
          {/* <AllDaysOut /> */}
        </main>
      </body>
      <footer>
        <p>Built with SDG in St Petersburg, Florida.</p>
      </footer>
    </div>
  )
}
