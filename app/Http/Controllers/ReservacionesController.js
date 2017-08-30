'use strict'

const Reservacion = use("App/Model/Reservaciones")
const Log = use("App/Model/Logs")
const Validator=use("Validator")
const Database = use('Database')

class ReservacionController {
    * all(request,response){
        const numero=request.params();
        const reservaciones = yield Database.from('reservaciones')
        .where('users_id', numero.numero)
        .orderBy('id','asc');
        yield response.json(reservaciones);
    }
    
     * allr(request,response){
        const reservaciones = yield Database.select('reservaciones.id', 'users.nombre','users.a_paterno','users.a_materno','reservaciones.fecha','reservaciones.hora','reservaciones.estado','reservaciones.users_id','reservaciones.cantidad_personas')
        .from('reservaciones')
        .innerJoin('users','users.id','reservaciones.users_id');
        yield response.json(reservaciones)
    }
    
    * all_reservaciones_estado(request,response){
        const estado=request.params();
        const reservaciones = yield Database.select('reservaciones.id', 'users.nombre','users.a_paterno','users.a_materno','reservaciones.fecha','reservaciones.hora','reservaciones.estado','reservaciones.users_id','reservaciones.cantidad_personas')
        .from('reservaciones')
        .innerJoin('users','users.id','reservaciones.users_id')
        .whereIn('reservaciones.estado', ['APROBADA','PENDIENTE']);
        yield response.json(reservaciones);
    }
    
    * actualiza_reservacion(request,response){
        const data = request.all();
        console.log(data);
        const reservacion=yield Reservacion.findBy('id', data.id);
        console.log(reservacion);
        reservacion.estado=data.estado;
        
        const log=new Log();
        log.fecha=data.fecha;
        log.hora=data.hora;
        log.movimiento="reservacion";
        log.tipo_movimiento="actualizacion";
        log.id_movimiento=reservacion.id;
        log.rol_persona=data.rol_persona_id;
        
        yield reservacion.save();
        yield log.save();
        response.json(reservacion);
    }
    
    * insertaReservacion(request, response){
        const data = request.all();
        console.log(data);
        const reservacion=new Reservacion();
        reservacion.users_id=data.cliente;
        reservacion.hora=data.hora_registro;
        reservacion.fecha=data.fecha_registro;
        reservacion.estado=data.estado;
        reservacion.cantidad_personas=data.cantidad;
        yield reservacion.save();
        
        const log=new Log();
        log.fecha=data.fecha;
        log.hora=data.hora;
        log.movimiento="reservacion";
        log.tipo_movimiento="insercion";
        log.id_movimiento=reservacion.id;
        log.rol_persona=3;
        yield log.save();
        response.json(reservacion);
    }
    
    * reporte(request,response){
        const rol=request.params();
        const reservaciones = yield Reservacion.query()
        .innerJoin('logs', 'logs.id_movimiento', 'reservaciones.id')
        .select('reservaciones.estado')
        .count('reservaciones.estado')
        .where('reservaciones.estado','CANCELADA')
        .andWhere('logs.rol_persona',rol.rol)
        .andWhere('logs.tipo_movimiento','actualizacion')
        .groupBy('reservaciones.estado')
        .fetch();
        console.log(reservaciones);
        return  response.json(reservaciones);  
    }
}

module.exports = ReservacionController
