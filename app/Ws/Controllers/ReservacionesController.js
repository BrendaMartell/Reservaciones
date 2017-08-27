'use strict'

class ReservacionesController {

  constructor (socket, request) {
    this.socket = socket
    this.request = request
  }
    
  onReservacion(info){
      if(info.Estado = "Entrada"){
          this.socket.inRoom('ReservacionAdministrador').emit('Reservacion', info)
      }else{
          this.socket.emit('Reservacion', info)
      }
  }

}

module.exports = ReservacionesController
