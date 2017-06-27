'use strict'

const Lucid = use('Lucid')

class TypeTicket extends Lucid {
    static get validacionesInsertar(){
        return {
            costo:'required',
            descripcion:'required'
        }
    }
    static get validaActualizacion(){
        return {
            id:'required'
        }
    }
}

module.exports = TypeTicket
