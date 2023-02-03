export type DayOutType = {
  id?: string | undefined
  location: string
  date: string
  description: string
  user?: string
  reviews: ReviewType[]
}

export type APIError = {
  errors: Record<string, string[]>
  status: number
  title: string
  traceId: string
  type: string
}

const NullDayOut: DayOutType = {
  location: '',
  date: '',
  description: '',
  user: ''
}

export type ReviewType = {
  id: number | undefined
  summary: string
  body: string
  stars: number
  createdAt: Date
  dayOutId: number
}