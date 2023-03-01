import React, { useEffect } from 'react'
import { AllDaysOut } from './pages/AllDaysOut'
import logo2 from './images/Logo2.png'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { PersonalDayOut } from './pages/PersonalDayOut'
import { NewDayOut } from './pages/NewDayOut'
import { DayOut } from './pages/DayOut'
import { SignUp } from './pages/signup'
import { SignIn } from './pages/login'
import { getUser, isLoggedIn, logout } from './auth'
import { LoggedInUser } from './types'
import ScrollToTop from './components/ScrollToTop'
import { EditDayOut } from './components/EditDayOut'


function LoggedInNav() {
  const user = getUser()
  function handleLogout() {
    logout()
    window.location.assign('/')
  }
  return (
    <><Link to=""><p className='navbar-item'>Welcome {user.fullName}!</p></Link>

      <Link to="/new">
        <a className="navbar-item">Add a Day Out</a>
      </Link>
      <Link to=""><a
        href="/"
        className="navbar-item"
        onClick={function (event) {
          event.preventDefault()
          handleLogout()
        }}
      >
        Sign out
      </a></Link>
      )



    </>
  )
}

function SignedOutNav() {
  return (
    <>
      <Link to="/signup">
        <a className="navbar-item">Sign Up</a>
      </Link>

      <Link to="/signin">
        <a className="navbar-item">Sign In</a></Link>
    </>
  )

}
export function App() {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
          <Link to="/"><a className="navbar-item">Home</a></Link>
          {isLoggedIn() ? <LoggedInNav /> : <SignedOutNav />}

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
          <Route path="/daysout/:id/edit" element={<EditDayOut />} />
        </Routes>
      </div>
      <footer>
        <p>Built with SDG in St Petersburg, Florida.</p>
      </footer>
    </div>
  )
}
