'use strict'

const Ws = use('Ws')

class AsientoController {

  constructor (socket, request) {
    this.socket = socket
    this.request = request
  }
  onMessage(message){
      var info = message.split('/')
      var room = info[0]
      var mensage = info[1] 
      this.socket.inRoom('Sala' + info[0]).emit('message', mensage)
      
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
