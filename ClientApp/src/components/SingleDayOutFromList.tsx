import React from 'react'
import { Link } from 'react-router-dom'
import { DayOutType } from '../types'

export function SingleDayOutFromList({ dayOut }: { dayOut: DayOutType }) {
  const urlForShowingDayOut = `/daysout/${dayOut.id}`
  
  return (
    <li>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <p>
              <strong>Where’d you go:</strong> <Link to={urlForShowingDayOut}>{dayOut.location}</Link>
            </p>
            <p>
              <strong>When:</strong> {dayOut.date}
            </p>
            <p>
              <strong>How was it:</strong> {dayOut.description}
              ...
            </p>
            <p>
              <strong>User:</strong> {dayOut.user}
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}
