'use strict'

const Lucid = use('Lucid')

class Role extends Lucid {
    static get insert(){
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

module.exports = Role
