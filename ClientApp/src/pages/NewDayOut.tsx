import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { APIError, DayOutType } from '../types'

async function submitNewDayOut(dayOutToCreate: DayOutType) {
  const response = await fetch('/api/daysout', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(dayOutToCreate),
  })

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}
export function NewDayOut() {
  let navigate = useNavigate()

  const [newDayOut, setNewDayOut] = useState<DayOutType>({
    id: undefined,
    location: '',
    date: '',
    description: '',
    user: '',
  })

  const [errorMessage, setErrorMessage] = useState('')

  const createNewDayOut = useMutation(submitNewDayOut, {
    onSuccess: function () {
      navigate('/')
    },
    onError: function (apiError: APIError) {
      setErrorMessage(Object.values(apiError.errors).join(''))
    },
  })

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    createNewDayOut.mutate(newDayOut)
  }

  function handleStringFieldChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedDayOut = { ...newDayOut, [fieldName]: value }

    setNewDayOut(updatedDayOut)
  }

  return (
    <div className="newDay">
      <div className="pageHeader">
        <h1 className="text-center">Add a Day Out</h1>
      </div>
      <form onSubmit={handleFormSubmit}>
      {errorMessage ? <p className='form-error'>{errorMessage}</p> : null}
      <div className="field" >
          <label className="label" htmlFor="location">
            Where'd you go?
          </label>
          <div className="control is-expanded">
            <input
              className="input"
              type="text"
              name="location"
              value={newDayOut.location}
              onChange={handleStringFieldChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="date">
            When did you go?
          </label>
          <div className="control is-expanded">
            <input
              className="input"
              type="text"
              name="date"
              value={newDayOut.date}
              onChange={handleStringFieldChange}
            ></input>
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="description">
            Leave a review
          </label>
          <div className="control is-expanded">
            <textarea
            className="input"
              name="description"
              value={newDayOut.description}
              onChange={handleStringFieldChange}
            ></textarea>
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="user">
            Your name
          </label>
          <div className="control">
            <input
              type="text"
              name="user"
              value={newDayOut.user}
              onChange={handleStringFieldChange}
            ></input>
          </div>
        </div>
        <div className="form-input">
          <label className="label" htmlFor="picture">
            Picture
          </label>
          <div className="control">
            <input type="file" name="picture" />
          </div>
        </div>
        <br></br>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" onClick={handleFormSubmit}>Submit</button>
          </div>
          <div className="control">
            <button className="button is-link is-light">Cancel</button>
          </div>
        </div>
        </form>
      </div>
      
      
  )
}
