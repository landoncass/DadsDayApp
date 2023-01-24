import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { DayOutType } from '../types'

export function AllDaysOut() {
  // const { data: daysOut = [] } = useQuery<DayOutType[]>(
  //   'daysOut',
  //   async function () {
  //     const response = await fetch('/api/DaysOut')

  //     return response.json()
  //   }
  // )

  // console.log({ daysOut })

  return (
    <main>
      <div className="pageHeader">
        <h1 align="center">See what other dads have done recently: </h1>
        <p>
          <input type="text" placeholder="Search" />
        </p>
      </div>
      <ul className="DaysOutList">
        <li>
          <div className="card">
            <div className="card-content">
              <div className="content">
                <p>
                  <strong>Where’d you go:</strong> Skyzone
                </p>
                <p>
                  <strong>When:</strong> 12/2/2022
                </p>
                <p>
                  <strong>How was it:</strong> Benny really liked jumping on the
                  trampoline with the ball. I hurt my knee, but we’ll ...
                </p>
                <p>
                  <strong>User:</strong> Greg
                </p>
                <p>Read more</p>
              </div>
            </div>
          </div>
        </li>

        <li>
          <div className="card">
            <div className="card-content">
              <div className="content">
                <p>
                  <strong>Where’d you go:</strong> Skyzone
                </p>
                <p>
                  <strong>When:</strong> 12/2/2022
                </p>
                <p>
                  <strong>How was it:</strong> Benny really liked jumping on the
                  trampoline with the ball. I hurt my knee, but we’ll ...
                </p>
                <p>
                  <strong>User:</strong> Greg
                </p>
                <p>Read more</p>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="card">
            <div className="card-content">
              <div className="content">
                <p>
                  <strong>Where’d you go:</strong> Skyzone
                </p>
                <p>
                  <strong>When:</strong> 12/2/2022
                </p>
                <p>
                  <strong>How was it:</strong> Benny really liked jumping on the
                  trampoline with the ball. I hurt my knee, but we’ll ...
                </p>
                <p>
                  <strong>User:</strong> Greg
                </p>
                <p>Read more</p>
              </div>
            </div>
          </div>
        </li>

        <li>
          <div className="card">
            <div className="card-content">
              <div className="content">
                <p>
                  <strong>Where’d you go:</strong> Skyzone
                </p>
                <p>
                  <strong>When:</strong> 12/2/2022
                </p>
                <p>
                  <strong>How was it:</strong> Benny really liked jumping on the
                  trampoline with the ball. I hurt my knee, but we’ll ...
                </p>
                <p>
                  <strong>User:</strong> Greg
                </p>
                <p>Read more</p>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="card">
            <div className="card-content">
              <div className="content">
                <p>
                  <strong>Where’d you go:</strong> Skyzone
                </p>
                <p>
                  <strong>When:</strong> 12/2/2022
                </p>
                <p>
                  <strong>How was it:</strong> Benny really liked jumping on the
                  trampoline with the ball. I hurt my knee, but we’ll ...
                </p>
                <p>
                  <strong>User:</strong> Greg
                </p>
                <p>Read more</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
      {/* <AllDaysOut /> */}
    </main>
  )
}
