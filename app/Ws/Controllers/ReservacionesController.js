'use strict'

class ReservacionesController {

  constructor (socket, request) {
    this.socket = socket
    this.request = request
  }
    
  
    
    * onReservacion(info){
        console.log("ENTRA ONRESERVACION "+ info);
        if(info.estado == "entrada"){
            this.socket.inRoom('ReservacionAdministrador').emit('reservacionsolicitud', info)
        }else{
            this.socket.exceptMe().emit('reservacion_cte', info);
        }
    }

}

module.exports = ReservacionesController
