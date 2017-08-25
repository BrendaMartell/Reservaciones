'use strict'

const Lucid = use('Lucid')

class Roles extends Lucid {
    static get validaciones(){
        return {
            nombre_rol:'required'
        }
    }
}

module.exports = Roles
