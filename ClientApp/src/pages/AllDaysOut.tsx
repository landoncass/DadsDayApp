import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { DayOutType } from '../types'
import { SingleDayOutFromList } from '../components/SingleDayOutFromList'

export function AllDaysOut() {
  const [filterText, setFilterText] = useState('')
  const { data: daysOut = [] } = useQuery<DayOutType[]>(
    ['daysOut', filterText],
    async function () {
      const response = await fetch(
        filterText.length === 0
          ? '/api/DaysOut'
          : `/api/DaysOut?filter=${filterText}`
      )

      return response.json()
    }
  )

  return (
    <div className="componentPage">
      <div className="pageHeader">
        <h1 className="has-text-centered is-size-1">See what other dads have done recently: </h1>
        <br />
        <input
          className="input is-large input is-rounded"
          type="text"
          placeholder="Search"
          value={filterText}
          onChange={function (event) {
            setFilterText(event.target.value)
          }}
        />
      </div>
      <ul className="DaysOutList">
        {daysOut.map(function (dayOut) {
          return <SingleDayOutFromList key={dayOut.id} dayOut={dayOut} />
        })}
      </ul>
    </div>
  )
}
