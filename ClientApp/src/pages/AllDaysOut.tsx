import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { DayOutType } from '../types'
import { SingleDayOutFromList } from '../components/SingleDayOutFromList'

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
          return <SingleDayOutFromList key={dayOut.id} dayOut={dayOut} />
        })}
      </ul>
    </div>
  )
}
