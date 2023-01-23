import React, { useState } from 'react'

export function PersonalDayOut() {
  return (
    <main>
      <h1>Here's a list of some of your favorite Days Out: </h1>
      <input type="text" placeholder="Search" />
      <ul>
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
          <div className="box">
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
          </div>
        </li>
        <li>
          <div className="box">
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
          </div>
        </li>
      </ul>
      <h1>Here are your most recent Days Out: </h1>
      <ul>
        <li>
          <div className="box">
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
          </div>
        </li>
        <li>
          <div className="box">
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
          </div>
        </li>
      </ul>
    </main>
  )
}
