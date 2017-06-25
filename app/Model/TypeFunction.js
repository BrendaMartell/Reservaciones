'use strict'

const Lucid = use('Lucid')

class TypeFunction extends Lucid {
    static get validacionesInsertar(){
        return {
            descripcion:'required'
        }
    }
    static get validaActualizacion(){
        return {
            id:'required',
            descripcion:'requiered'
        }
    }
}

module.exports = TypeFunction
