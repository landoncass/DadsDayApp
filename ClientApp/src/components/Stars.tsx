import React from 'react'
import { CSSStarsProperties, DayOutType } from '../types'

export function Stars({ dayOut }: { dayOut: DayOutType }) {
  const totalStars = dayOut.reviews.reduce(
    (starRatingSum, review) => starRatingSum + review.stars,
    0
  )

  const averageStars =
    dayOut.reviews.length === 0 ? 0 : totalStars / dayOut.reviews.length

  const averageStarsToOneDecimalPlace = Number(averageStars.toFixed(1))

  return (
    <span
      className="stars"
      style={
        { '--rating': averageStarsToOneDecimalPlace } as CSSStarsProperties
      }
      aria-label={`Star rating of this location is ${averageStarsToOneDecimalPlace} out of 5.`}
    ></span>
  )
}