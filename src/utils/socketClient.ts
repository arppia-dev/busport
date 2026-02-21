import { io, Socket } from 'socket.io-client'

export const socket: Socket = io(
  process.env.WEBSOCKET_URL || 'http://localhost:1337',
  {
    transports: ['websocket'],
    autoConnect: true
  }
)
