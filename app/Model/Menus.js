'use strict'

const Lucid = use('Lucid')

class Menus extends Lucid {
    static get validaciones(){
        return {
            nombre_producto:'required',
            descripcion:'required',
            precio:'required',
            tipo_menu:'required'
        }
    }
    
}

module.exports = Menus
