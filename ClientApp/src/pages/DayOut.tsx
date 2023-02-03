import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { DayOutType, ReviewType } from '../types'
import { NewDayOut } from './NewDayOut'

async function loadOneDayOut(id: string | undefined) {
  const response = await fetch(`/api/daysout/${id}`)

  if (response.ok) {
    return response.json()
  } else {
    throw await response.json()
  }
}

async function submitNewReview(review: ReviewType){
  const response = await fetch(`/api/Reviews`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(review),
  })

  if (response.ok){
    return response.json()
  } else {
    throw await response.json()
  }
}

const NullDayOut: DayOutType = {
  location: '',
  date: '',
  description: '',
  user: '',
  reviews: [],
}

export function DayOut() {

  const { id } = useParams <{id: string}>()

  const [newReview, setNewReview] = useState<ReviewType>({
    id: undefined,
    body: '',
    stars: 5,
    summary: '',
    createdAt: new Date(),
    dayoutId: Number(id),
  })

  const {refetch: reloadDayOut ,data: dayout = NullDayOut} = 
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
      setNewReview({      ...newReview,      body: '',      stars: 5,      summary: '',    })
    },
  })

  

  return (
    <div className="componentPage">
      
        <section className="section is-large has-background-light m-auto">
  
        <h1 className="title">
          {dayout.location}
        </h1>
      
      <h2 className="subtitle">
      {dayout.date}
      
      <p>
        {dayout.description}
      </p>
      <p>
        {dayout.user}
      </p>
      <p>
        ({dayout.reviews.length})
      </p>
      <ul className="reviews">
        {dayout.reviews.map(review =>
          <li>
            <div className="author">
              Landon said:<em>{review.summary}</em>
            </div>
            <div className="body">
              <p>{review.body}</p>
            </div>
          
            <div className="meta">
            <span
              className="stars"
              style={{ '--rating': review.stars } as CSSStarsProperties}
              aria-label={`Star rating of this location is ${review.stars} out of 5.`}
            ></span>
            <time>{review.createdAt}</time>
          </div>
          </li>
          )}
      </ul> 
      </h2>
      <form onSubmit={function(event) {
        event.preventDefault()
createNewReview.mutate(newReview)
      }}>
        <p className="form-input">
          <label htmlFor="summary">Summary</label>
          <input type="text" 
          name="summary" 
          value = {newReview.summary}
          onChange={handleNewReviewTextFieldChange} />
          <span className="note">
            Enter a brief summary of your review. Example: {''}
            <strong>Had a great time with my kid. Will do it again</strong>
          </span>
        </p>
        <p className="form-input">
          <label htmlFor="body">Review</label>
          <textarea 
          name="body" 
          value={newReview.body}
          onChange={handleNewReviewTextFieldChange}></textarea>
        </p>
        <div className="rating">
          <input id="star-rating-1" type="radio" name="stars" value="1" checked={newReview.stars === 1} onChange = {() => handleStarRadioButton(1)} />
          <label htmlFor="star-rating-1">1 star</label>
          <input id="star-rating-2" type="radio" name="stars" value="2" checked={newReview.stars === 2} onChange = {() => handleStarRadioButton(2)} />
          <label htmlFor="star-rating-2">2 stars</label>
          <input id="star-rating-3" type="radio" name="stars" value="3" checked={newReview.stars === 3} onChange = {() => handleStarRadioButton(3)}/>
          <label htmlFor="star-rating-3">3 stars</label>
          <input id="star-rating-4" type="radio" name="stars" value="4" checked={newReview.stars === 4} onChange = {() => handleStarRadioButton(4)}/>
          <label htmlFor="star-rating-4">4 stars</label>
          <input id="star-rating-5" type="radio" name="stars" value="5" checked={newReview.stars === 5} onChange = {() => handleStarRadioButton(5)}/>
          <label htmlFor="star-rating-5">5 stars</label>
        </div>
        <button>Submit Review</button>
      </form>
      </section>
      </div>
  )
}