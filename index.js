import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'
import app from './src/app.js'
import { socketJoinRoom } from './src/socket/socket.js'

dotenv.config()

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
  },
})
app.set('io', io)

io.on('connection', (socket) => {
  console.log('Socket IO connected:', socket.id)
})

socketJoinRoom(io)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
