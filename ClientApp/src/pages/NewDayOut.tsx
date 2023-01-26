import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { DayOutType } from '../types'

async function submitNewDayOut(dayOutToCreate: DayOutType) {
  const response = await fetch('/api/daysout', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(dayOutToCreate),
  })

  return response.json()
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

  const createNewDayOut = useMutation(submitNewDayOut, {
    onSuccess: function () {
      navigate('/')
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
    <div className="componentPage">
      <div className="pageHeader">
        <h1 align="center">Add a Day Out</h1>
      </div>
      <form onSubmit={handleFormSubmit}>
        <p className="form-input">
          <label htmlFor="location">Where'd you go?</label>
          <input
            type="text"
            name="location"
            value={newDayOut.location}
            onChange={handleStringFieldChange}
          />
        </p>
        <p className="form-input">
          <label htmlFor="date">When did you go?</label>
          <input
            type="text"
            name="date"
            value={newDayOut.date}
            onChange={handleStringFieldChange}
          ></input>
        </p>

        <p className="form-input">
          <label htmlFor="description">Leave a review</label>
          <textarea
            name="description"
            value={newDayOut.description}
            onChange={handleStringFieldChange}
          ></textarea>
        </p>

        <p className="form-input">
          <label htmlFor="user">Your name</label>
          <input
            type="text"
            name="user"
            value={newDayOut.user}
            onChange={handleStringFieldChange}
          ></input>
        </p>
        <p className="form-input">
          <label htmlFor="picture">Picture</label>
          <input type="file" name="picture" />
        </p>
        <p>
          <input type="submit" value="Submit" />
        </p>
      </form>
    </div>
  )
}
