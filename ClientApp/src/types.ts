import { CSSProperties } from 'react'

export interface CSSStarsProperties extends CSSProperties {
  '--rating': number;
}


export type DayOutType = {
  id?: string | undefined
  location: string
  address: string
  description: string
  latitude: number
  longitude: number
  photoURL: string                    
  reviews: ReviewType[]
  user?: LoggedInUser
}

export type UploadResponse = {
  url: string
}

export type APIError = {
  errors: Record<string, string[]>
  status: number
  title: string
  traceId: string
  type: string
}


export type ReviewType = {
  id: number 
  summary: string
  body: string
  stars: number
  createdAt: Date
  dayOutId: number
  user?: LoggedInUser
}



export type NewReviewType = {
  id: number | undefined
  summary: string
  body: string
  stars: number
  createdAt: Date
  dayOutId: number
}

export type NewUserType = {
  fullName: string
  email: string
  password: string
}

export type LoginUserType = {
  email: string
  password: string
}

export type LoggedInUser = {
  id: number
  fullName: string
  email: string
}

export type LoginSuccess = {
  token: string
  user: LoggedInUser
}