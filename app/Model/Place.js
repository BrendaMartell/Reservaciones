'use strict'

const Lucid = use('Lucid')

class Place extends Lucid {
    static get validacionesInsertar(){
        return {
            id_venta_detalle:'required',
            localidad:'required'
        }
    }
    static get validacionesCancela_Asiento(){
        return {
            id_venta_detalle:'required'
        }
    }
    static get validacionesEliminar(){
        return {
            id:'required',
            name:'required'
        }
    }
    
    static get validacionesAsientoVenta(){
        return {
            localidad:'required',
            id_venta_detalle:'required'
        }
    }
}

module.exports = Place