'use strict'

const Lucid = use('Lucid')

class Role extends Lucid {
    static get validaInsert(){
        return {
            descripcion:'required'
        }
    }
    static get validaActualizacion(){
        return {
            id:'required'
        }
    }
}

module.exports = Role
