import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { DayOutType } from '../types'

// function daysOutList() {
//   const [daysOut, setDaysOut] = useState([])

//   return ()
// }

export function AllDaysOut() {
  const { data: daysOut = [] } = useQuery<DayOutType[]>(
    'daysOut',
    async function () {
      const response = await fetch('/api/DaysOut')

      return response.json()
    }
  )

  return (
    <div className="componentPage">
      <div className="pageHeader">
        <h1 align="center">See what other dads have done recently: </h1>
        <input type="text" placeholder="Search" />
      </div>
      <ul className="DaysOutList">
        {daysOut.map(function (dayOut) {
          return (
            <li key={dayOut.id}>
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
                    <p>Read more</p>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
