import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { CSSStarsProperties, DayOutType, NewReviewType } from '../types'
import { NewDayOut } from './NewDayOut'
import format from 'date-fns/format'
import { authHeader, getUser, getUserId, isLoggedIn } from '../auth'
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
  event.preventDefault()
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
  address: '',
  description: '',

  reviews: [],
}

const dateFormat = `EEEE, MMMM do, yyyy 'at' h:mm aaa`

export function DayOut() {

  let navigate = useNavigate()
  const user = getUser()

  async function handleDeleteReview(event, reviewId) {
    event.preventDefault()

    await fetch(`/api/Reviews/${reviewId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json', Authorization: authHeader() },
    })
    console.log("post delete")
    const response = await fetch(`/api/DaysOut/${id}`)

    if (response.ok) {
      reloadDayOut()
    }
  }

  async function handleDelete(event) {
    const response = await fetch(`/api/daysout/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: authHeader(),
      },
    })


    if (response.status === 200 || response.status === 204) {
      navigate('/')
    }
  }

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

  const deleteDayOut = useMutation(handleDelete, {
    onSuccess: function () {
      navigate('/')
    },
    onError: function () {
      console.log('Oops')
    }
  })

  const deleteDayOutReview = useMutation(handleDelete, {
    onSuccess: function () {
      navigate('/')
    },
    onError: function () {
      console.log('Oops')
    }
  })

  return (
    <div className="componentPage">

      <section className="section is-small has-background-light m-auto">
        {
          dayout.photoURL ? (
            <img alt="DayOut Photo" width="50%" src={dayout.photoURL} />
          ) : null
        }
        <h1 className="title is-1">
          {dayout.location}
          <br></br>
          <Stars dayOut={dayout} /> ({dayout.reviews.length})
        </h1>
        <h2 className="title is-4">
          {dayout.address}
        </h2>
        <p className="title is-5">
          {dayout.description}
        </p>
        <p>{
          dayout.userId === getUserId() ? (
            <button onClick={handleDelete}>Delete DayOut</button>
          ) : null
        }</p>
        <br></br>

        <h2 className="title is-2">Reviews</h2>
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
                      ></span>
                    </div>
                    <br></br>

                    <p className="subtitle is-5"><a href={`mailto: ${review.user.email}`}>Posted by {review.user.fullName}</a> <time>{review.createdAt ? format(new Date(review.createdAt), dateFormat) : null}</time></p>
                    {
                      review.user.id === getUserId() ? (
                        <div>
                          <button
                            className="small"
                            onClick={function (event) {
                              handleDeleteReview(event, review.id)
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      ) : null
                    }
                  </div>
                </div>

              </article>
            </div>
          )
          }
        </ul >

        {isLoggedIn() ? <>
          <br></br>
          <h3 className="title is-2">Enter your own review</h3>

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