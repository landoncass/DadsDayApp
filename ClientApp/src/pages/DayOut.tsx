import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { CSSStarsProperties, DayOutType, NewReviewType } from '../types'
import { NewDayOut } from './NewDayOut'
import format from 'date-fns/format'
import { authHeader, isLoggedIn } from '../auth'
import { Stars } from '../components/Stars'

async function loadOneDayOut(id: string | undefined) {
  const response = await fetch(`/api/daysout/${id}`)

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

async function submitNewReview(review: NewReviewType) {
  const response = await fetch(`/api/Reviews`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', Authorization: authHeader() },
    body: JSON.stringify(review),
  })

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

const NullDayOut: DayOutType = {
  location: '',
  city: '',
  description: '',

  reviews: [],
}

const dateFormat = `EEEE, MMMM do, yyyy 'at' h:mm aaa`

export function DayOut() {

  const { id } = useParams<{ id: string }>()

  const [newReview, setNewReview] = useState<NewReviewType>({
    id: undefined,
    body: '',
    stars: 5,
    summary: '',
    createdAt: new Date(),
    dayOutId: Number(id),
  })

  const { refetch: reloadDayOut, data: dayout = NullDayOut } =
    useQuery<DayOutType>(
      ['one-dayout', id],
      () => loadOneDayOut(id)
    )

  function handleNewReviewTextFieldChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const name = event.target.name
    const value = event.target.value

    setNewReview({ ...newReview, [name]: value })
  }

  function handleStarRadioButton(newStars: number) {
    setNewReview({ ...newReview, stars: newStars })
  }

  const createNewReview = useMutation(submitNewReview, {
    onSuccess: function () {
      reloadDayOut()
      setNewReview({ ...newReview, body: '', stars: 5, summary: '', })
    },
  })

  const totalStars = dayout.reviews.reduce(
    (starRatingSum, review) => starRatingSum + review.stars,
    0
  )

  const averageStars = totalStars / dayout.reviews.length || 0

  const averageStarsToOneDecimalPlace = Number(averageStars.toFixed(1))


  return (
    <div className="componentPage">

      <section className="section is-large has-background-light m-auto">

        <h1 className="title is-1">
          {dayout.location}
          <br></br>
          <Stars dayOut={dayout} /> ({dayout.reviews.length})
        </h1>
        <h2 className="title is-4">
          {dayout.city}
        </h2>
        <p className="title is-5">
          {dayout.description}
        </p>


        <ul className="reviews">
          {dayout.reviews.map(review =>
            <div className="box">
              <article className="media-left">
                <div className="media-content">
                  <div className="content">
                    <h4 className="title is-4">
                      {review.summary}
                    </h4>
                    <p className="subtitle is-4">{review.body}</p>
                    <div className="meta">
                      <span
                        className="stars"
                        style={{ '--rating': review.stars } as CSSStarsProperties}
                        aria-label={`Star rating of this location is ${review.stars} out of 5.`}
                      ></span></div>
                    <br></br>

                    <p className="subtitle is-5"><a href={`mailto: ${review.user.email}`}>Posted by {review.user.fullName}</a> <time>{review.createdAt ? format(new Date(review.createdAt), dateFormat) : null}</time></p>

                  </div>
                </div>

              </article>
            </div>
          )
          }
        </ul >

        {isLoggedIn() ? <>
          <div className="pageHeader">
            <h3>Enter your own review</h3>
          </div>
          <form onSubmit={function (event) {
            event.preventDefault()
            createNewReview.mutate(newReview)
          }}>
            <div className="field">
              <label className="label" htmlFor="summary">Summary</label>
              <input className="input"
                type="text"
                name="summary"
                placeholder="Enter a brief summary of your review"
                value={newReview.summary}
                onChange={handleNewReviewTextFieldChange} />
              <span className="note">
                Example: {''}
                <em>Had a great time with my kid. Will do it again</em>
              </span>
            </div>
            <div className="field">
              <label className="label" htmlFor="body">Your Review</label>
              <textarea
                className="textarea"
                name="body"
                value={newReview.body}
                placeholder="How did you and your child enjoy this place? What did you do there? Would you recommend it?"
                onChange={handleNewReviewTextFieldChange}></textarea>
            </div>
            <div className="rating">
              <input id="star-rating-1" type="radio" name="stars" value="1" checked={newReview.stars === 1} onChange={() => handleStarRadioButton(1)} />
              <label htmlFor="star-rating-1">1 star</label>
              <input id="star-rating-2" type="radio" name="stars" value="2" checked={newReview.stars === 2} onChange={() => handleStarRadioButton(2)} />
              <label htmlFor="star-rating-2">2 stars</label>
              <input id="star-rating-3" type="radio" name="stars" value="3" checked={newReview.stars === 3} onChange={() => handleStarRadioButton(3)} />
              <label htmlFor="star-rating-3">3 stars</label>
              <input id="star-rating-4" type="radio" name="stars" value="4" checked={newReview.stars === 4} onChange={() => handleStarRadioButton(4)} />
              <label htmlFor="star-rating-4">4 stars</label>
              <input id="star-rating-5" type="radio" name="stars" value="5" checked={newReview.stars === 5} onChange={() => handleStarRadioButton(5)} />
              <label htmlFor="star-rating-5">5 stars</label>
            </div>
            <br></br>
            <button>Submit Review</button>
          </form> </> : null}

      </section >
    </div >
  )
}