export type DayOutType = {
  id?: number
  location: string
  date: string
  description: string
  user: string
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