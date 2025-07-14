export function joinRoom(io) {
  io.on('connection', (socket) => {
    socket.on('joinRoom', (room) => {
      socket.join(room)
      console.log(`${socket.id} joined room ${room}`)
    })
  })
}
