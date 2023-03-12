import React from 'react'
import { Link } from 'react-router-dom'
import { CSSStarsProperties, DayOutType } from '../types'
import { Stars } from './Stars'


export function SingleDayOutFromList({ dayOut }: { dayOut: DayOutType }) {
  const urlForShowingDayOut = `/daysout/${dayOut.id}`
  return (
    <li key={dayOut.id}>
      <div className="column">
        <div className="card card-equal-height">
          <div className="card-image">
            <figure className="image is-2by2">
              <img src={dayOut.photoURL} />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">
                  <strong>Where:</strong> <Link to={urlForShowingDayOut}>{dayOut.location}</Link>
                </p>
              </div>
            </div>
            <div className="content"><p>
            </p>
              <p>
                <strong>Address:</strong> {dayOut.address}
              </p>
              <p>
                <strong>Description:</strong> {dayOut.description}
              </p>
              <p>
                <Stars dayOut={dayOut} />
                <strong>Reviews </strong> ({dayOut.reviews.length})
              </p>
            </div>
          </div>
        </div>
      </div>
    </li >
  )
}