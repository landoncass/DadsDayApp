import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { DayOutType } from '../types'
import { SingleDayOutFromList } from '../components/SingleDayOutFromList'
import Map, { NavigationControl } from 'react-map-gl'

export function AllDaysOut() {
  const token = import.meta.env.VITE_APP_MAPBOX_TOKEN as string


  const [filterText, setFilterText] = useState('')
  const [viewport, setViewport] = useState({
    latitude: 27.77101804911986,
    longitude: -82.66090611749074,
    zoom: 9.8,
  })
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
        <h1 className="has-text-centered is-size-1">Here are some places Dads have gone recently:</h1>
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
      <section className="map">
        <Map
          initialViewState={viewport}
          style={{ width: "100%", height: 200 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={token}
        />
        {/* <div style={{ position: 'absolute', left: 10 }}>
            <NavigationControl />
          </div> */}

      </section>




      <ul className="DaysOutList">
        {daysOut.map(function (dayOut) {
          return <SingleDayOutFromList key={dayOut.id} dayOut={dayOut} />
        })}
      </ul>

    </div>

  )
}
