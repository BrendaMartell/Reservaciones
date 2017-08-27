'use strict'
const Menu = use("App/Model/Menus")
const Orden = use("App/Model/Ordenes")
const Log = use("App/Model/Logs")
const Validator=use("Validator")
const Database = use('Database')

class OrdenController {
    * all(request,response){
        const numero=request.params();
        console.log(numero.numero);
        const orden = yield Database.from('ordenes')
        .where('personas_id', numero.numero)
        .orderBy('id','asc');
        console.log(orden);
        yield response.json(orden);
    }
    
     * allp(request,response){
        const ordenes = yield Database.select('ordenes.id', 'users.nombre','users.a_paterno','users.a_materno','ordenes.fecha','ordenes.hora','ordenes.estado','ordenes.personas_id')
        .from('ordenes')
        .innerJoin('users','users.id','ordenes.personas_id');
        console.log(ordenes);
        yield response.json(ordenes)
    }
    
    * actualiza_orden(request,response){
        const data = request.all();
        console.log(data);
        
        const orden=yield Orden.findBy('id', data.id);
        orden.estado=data.estado;
        
        const log=new Log();
        log.fecha=data.fecha;
        log.hora=data.hora;
        log.movimiento="pedido";
        log.tipo_movimiento="actualizacion";
        log.id_movimiento=orden.id;
        log.rol_persona=data.rol_personas_id;
        
        yield orden.save();
        yield log.save();
        response.json(orden);
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
        
        const log=new Log();
        log.fecha=data.fecha;
        log.hora=data.hora;
        log.movimiento="pedido";
        log.tipo_movimiento="insercion";
        log.id_movimiento=orden.id;
        log.rol_persona=3;
        yield log.save();
        response.json(orden);
    }
}

module.exports = OrdenController
