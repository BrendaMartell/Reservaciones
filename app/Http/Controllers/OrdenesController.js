'use strict'
const Menu = use("App/Model/Menus")
const Orden = use("App/Model/Ordenes")
const Validator=use("Validator")
const Database = use('Database')

class OrdenController {
    * all(request,response){
        const numero=request.params();
        console.log(numero.numero);
        const orden = yield Database.from('ordenes')
        .where('personas_id', numero.numero);
        yield response.json(orden)
        
     /*   const orden=yield Orden.all().where('personas_id', numero);
        console.log(orden)
        yield response.json(orden) */
    }
    
    * insertaOrden(request, response){
        const data = request.all();
        console.log(data);
        
        const orden=new Orden();
        orden.personas_id=data.personas_id;
        orden.rol_personas_id=3;
        orden.hora=data.hora;
        orden.fecha=data.fecha;
        orden.estado=data.estado;
        yield orden.save();
        console.log("Pedido Registrado:    " + orden);
        response.json(orden);
    }
}

module.exports = OrdenController
