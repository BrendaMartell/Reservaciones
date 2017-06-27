'use strict'

const Lucid = use('Lucid')

class Room extends Lucid {
    static get validacionesInsertar(){
        return {
            alias:'required',
            tipo:'required',
            capacidad:'required'
        }
    }
    static get validaActualizacion(){
        return {
            id:'required'
        }
    }
    static get validacionesEliminar(){
        return {
            id:'required'
        }
    }
    
}

module.exports = Room
