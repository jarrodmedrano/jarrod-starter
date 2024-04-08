export interface ScreenProps {
  params: {
    slug: string
  }
  defaultLayout: number[]
  session: {
    user: {
      id: string
      email: string
      name: string
      image: string
      role: string
    }
    expires: string
  }
  children: React.ReactNode
}
