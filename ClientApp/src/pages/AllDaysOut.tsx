import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { DayOutType } from '../types'
import { SingleDayOutFromList } from '../components/SingleDayOutFromList'
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl'

export function AllDaysOut() {
  const token = import.meta.env.VITE_APP_MAPBOX_TOKEN as string


  const [filterText, setFilterText] = useState('')
  const [viewport, setViewport] = useState({
    latitude: 27.77101804911986,
    longitude: -82.66090611749074,
    zoom: 12,
  })
  const [selectedMapDayOut, setSelectedMapDayOut] =
    useState<DayOutType | null>(null)

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
        <h1 className="has-text-centered is-size-3">Where will you take your kid today?</h1>
        <h1 className="has-text-centered is-size-3"> Create your own Day Out or take a look at what other Dads have done below</h1>
        <br />

        <input
          className="input is-large input is-rounded"
          type="text"
          placeholder="Search for a Day Out"
          value={filterText}
          onChange={function (event) {
            setFilterText(event.target.value)
          }}
        />

      </div>
      <section className="map">
        <Map
          initialViewState={viewport}
          style={{ width: "100%", height: 300 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={token}
        >
          {
            selectedMapDayOut ? (
              <Popup
                latitude={selectedMapDayOut.latitude}
                longitude={selectedMapDayOut.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setSelectedMapDayOut(null)}
              >
                <div>
                  <p>{selectedMapDayOut.location}</p>
                  <p>{selectedMapDayOut.description}</p>
                </div>
              </Popup>
            ) : null
          }

          {daysOut.map((dayOut) => (

            <Marker key={dayOut.id}
              longitude={dayOut.longitude}
              latitude={dayOut.latitude}
              onClick={() => setSelectedMapDayOut(dayOut)}>
            </Marker>

          )
          )}
        </Map>
      </section >

      <ul className="DaysOutList" >
        {
          daysOut.map(function (dayOut) {
            return <SingleDayOutFromList key={dayOut.id} dayOut={dayOut} />
          })
        }
      </ul >

    </div >

  )
}
