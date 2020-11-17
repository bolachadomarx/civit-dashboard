export interface IncidentModel {
  _id: string
  title: string
  status: string
  date: string
  latitude: number
  longitude: number
  category: string
  description: string
  images: string[]
  __v: number
}

export interface CreateIncidentModel {
  title: string
  date: string
  latitude: number
  longitude: number
  category: string
  description: string
  images: string[]
}
