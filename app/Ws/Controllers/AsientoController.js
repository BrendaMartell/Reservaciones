'use strict'

const Ws = use('Ws')

class AsientoController {

  constructor (socket, request) {
    this.socket = socket
    this.request = request
  }
  onMessage(message){
      console.log(message)
      this.socket.inRoom('Sala' + message.sala).emit('message', message)
      
  }
  * joinRoom (room) {
    // throw error to deny a socket from joining room
      console.log(room)
  }
  * leaveRoom(room){
      // throw error to deny a socket from joining room
      console.log(room)
  }
  
}

module.exports = AsientoController
