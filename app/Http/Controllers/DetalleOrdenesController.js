'use strict'
const Detalle = use("App/Model/DetalleOrdenes")
const Validator=use("Validator")

class DetalleOrdenesController {
    * insertaDetalle(request, response){
        const data = request.all();
        console.log(data);
        for(var i = 0; i < data.detalle.length;i++){
            
            const detalle=new Detalle();
            detalle.ordenes_id=data.ordenes_id;
            detalle.menu_id=data.detalle[i].menu_id;
            detalle.precio=data.detalle[i].precio;
            detalle.cantidad=data.detalle[i].cantidad;
            detalle.total_platillo=data.detalle[i].total_platillo;
            detalle.comentarios="";
            yield detalle.save();
        }
        response.send("RegistroRealizado");
    }
}

module.exports = DetalleOrdenesController
