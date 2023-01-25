import React from 'react'
import { DayOutType } from '../types'

export function SingleDayOutFromList({ dayOut }: { dayOut: DayOutType }) {
  return (
    <li>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <p>
              <strong>Where’d you go:</strong> {dayOut.location}
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
