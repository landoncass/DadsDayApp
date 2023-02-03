export type DayOutType = {
  id?: string | undefined
  location: string
  city: string
  description: string
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
  city: '',
  description: '',
}

export type ReviewType = {
  id: number | undefined
  summary: string
  body: string
  stars: number
  createdAt: Date
  dayOutId: number
}