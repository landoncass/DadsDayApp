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
  reviews: [],
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
      <p>
        ({dayout.reviews.length})
      </p>
      <ul className="reviews">
        {dayout.reviews.map(review =>
          <li>
            <div className="author">
              Landon said:<em>{review.summary}</em>
            </div>
            <div className="body">
              <p>{review.body}</p>
            </div>
             
            <div className="meta">
            <span
              className="stars"
              style={{ '--rating': review.stars } as CSSStarsProperties}
              aria-label={`Star rating of this location is ${review.stars} out of 5.`}
            ></span>
            <time>{review.createdAt}</time>
          </div>


          </li>
          )}

      </ul> 
      </h2>
      </section>
      </div>
  )
}