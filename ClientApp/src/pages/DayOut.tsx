import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { DayOutType } from '../types'

async function loadOneDayOut(id: string | undefined) {
  const response = await fetch(`/api/daysout/${id}`)

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

const NullDayOut: DayOutType = {
  location: '',
  date: '',
  description: '',
  user: '',
}

export function DayOut() {

  const { id } = useParams <{id: string}>()

  const {data: dayout = NullDayOut} = useQuery<DayOutType>(
    ['one-dayout', id],
    () => loadOneDayOut(id)
  )

  return (
    <div className="componentPage">
      
        <section className="section is-large has-background-light m-auto">
  
        <h1 className="title">
          {dayout.location}
        </h1>
      
      <h2 className="subtitle">
      {dayout.date}
      
      <p>
        {dayout.description}
      </p>
      <p>
        {dayout.user}
      </p>
      </h2>
      </section>
      </div>
  )
}