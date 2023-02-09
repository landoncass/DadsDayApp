import React from 'react'
import { AllDaysOut } from './pages/AllDaysOut'
import logo2 from './images/Logo2.png'
import { Link, Route, Routes } from 'react-router-dom'
import { PersonalDayOut } from './pages/PersonalDayOut'
import { NewDayOut } from './pages/NewDayOut'
import { DayOut } from './pages/DayOut'
import { SignUp } from './pages/signup'
import { SignIn } from './pages/login'

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

          <Link to="/">
            <a className="navbar-item">Home</a>
          </Link>

          <Link to="/signup">
            <a className="navbar-item">Sign Up</a>
          </Link>

          <Link to="/signin">
            <a className="navbar-item">Sign In</a></Link>

          <Link to="/new">
            <a className="navbar-item">Add a Day Out</a>
          </Link>
          
        </div>
      </nav>
      <div className="componentView">
        <Routes>
          <Route index element={<AllDaysOut />} />
          <Route path="personal" element={<PersonalDayOut />} />
          <Route path="new" element={<NewDayOut />} />
          <Route path="/daysout/:id" element={<DayOut />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        
        </Routes>
      </div>
      <footer>
        <p>Built with SDG in St Petersburg, Florida.</p>
      </footer>
    </div>
  )
}
