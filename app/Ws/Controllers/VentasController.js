'use strict'

class VentasController {

   constructor (socket, request) {
    this.socket = socket
    this.request = request
  }
  onMessage(message){
      console.log(message)
      this.socket.emit("message",message)
  }
  

}

module.exports = VentasController
