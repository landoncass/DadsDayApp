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
              <strong>Where:</strong> <Link to={urlForShowingDayOut}>{dayOut.location}</Link>
            </p>
            <p>
              <strong>City located:</strong> {dayOut.date}
            </p>
            <p>
              <strong>Description:</strong> {dayOut.description}
            </p>
            
            
          </div>
        </div>
      </div>
    </li>
  )
}
