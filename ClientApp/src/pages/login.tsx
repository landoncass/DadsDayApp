import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { recordAuthentication } from '../auth'
import { APIError, LoginSuccess, LoginUserType } from '../types'

export function SignIn() {
  const [errorMessage, setErrorMessage] = useState('')

  const [user, setUser] = useState<LoginUserType>({
    email: '',
    password: '',
  })

  function handleStringFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedUser = { ...user, [fieldName]: value }

    setUser(updatedUser)
  }

  async function loginUser(user: LoginUserType): Promise<LoginSuccess> {
    const response = await fetch('/api/Sessions', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user),
    })

    if (response.ok) {
      return response.json()
    } else {
      throw await response.json()
    }
  }

  const loginUserMutation = useMutation(loginUser, {
    onSuccess: function (apiResponse) {
      // TODO: record the authentication information we receive

      recordAuthentication(apiResponse)
      window.location.assign('/')
    },
    onError: function (error: APIError) {
      setErrorMessage(Object.values(error.errors).join(' '))
    },
  })

  return (
    <div className="componentPage">
      <h1 className="title is-1">Sign In</h1>


      <form

        onSubmit={function (event) {
          event.preventDefault()
          loginUserMutation.mutate(user)
        }}
      >
        {
          errorMessage ? <p className='form-error'>{errorMessage}</p> : null
        }

        <div className="field">
          <label className="label" htmlFor="email">Email</label>
          <input type="email" name="email" value={user.email} onChange={handleStringFieldChange} />
        </div>
        <p className="field">
          <label className="label" htmlFor="password">Password</label>
          <input type="password" name="password" value={user.password} onChange={handleStringFieldChange} />
        </p>
        <p>
          <input type="submit" value="Submit" />
        </p>
      </form>
    </div>
  )
}
