import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string | number
      name?: string
      lastname?: string
      email?: string
      username?: string
      confirmed?: boolean
      blocked?: boolean
      token?: string
    } & DefaultSession['user']
  }
}
