'use strict'

const Ws = use('Ws')

class PedidosController {

  constructor (socket, request, presence) {
    this.socket = socket
    this.request = request
    presence.track(socket, socket.currentUser.id, {
        id: socket.currentUser.id
    })
  }
    
  onPedidosolicitud(mensaje){
      console.log("Pedidosolicitudes   " + mensaje.us);
      //this.socket.toEveryone().emit('pedidosolicitud', "Tiene nuevas solicitudes de pedido")
      this.socket.inRoom('PedidoAdministrador').emit('pedidosolicitud', {'msj': "Tiene nuevas solicitudes de pedido", 'us': mensaje.us})
      //this.socket.toEveryone().emit('solicitud', {'msj': mensaje, 'jugador2': us });
  }
  * joinRoom (room) {
      console.log(room)
  }
    
  * leaveRoom(room){
      console.log(room)
  }
  
}

module.exports = PedidosController
