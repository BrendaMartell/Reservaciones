'use strict'

const Ws = use('Ws')

class PedidosController {

  /*constructor (socket, request, presence) {
    this.socket = socket
    this.request = request
    presence.track(socket, socket.currentUser.id, {
        id: socket.currentUser.id
    })
  }*/

    constructor (socket, request) {
        this.socket = socket
        this.request = request
    }
    
    * onPedido(info){
        console.log(info);
        if(info.estado == "entrada"){
            this.socket.inRoom('PedidoAdministrador').emit('pedidosolicitud', info)
        }else{
            this.socket.exceptMe().emit('pedido_cte', info);
        }
    }

      onPedidosolicitud(mensaje){
          console.log("Pedidosolicitudes   " + mensaje.us);
          //this.socket.toEveryone().emit('pedidosolicitud', "Tiene nuevas solicitudes de pedido")
          this.socket.inRoom('PedidoAdministrador').emit('pedidosolicitud', {'msj': "Tiene nuevas solicitudes de pedido", 'us': mensaje.us})
          //this.socket.toEveryone().emit('solicitud', {'msj': mensaje, 'jugador2': us });
      }
      * joinRoom (room) {
      }

      * leaveRoom(room){
      }
  
}

module.exports = PedidosController
