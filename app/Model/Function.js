'use strict'

const Lucid = use('Lucid')

class Function extends Lucid {
    static get validaInsersion(){
        return {
            fecha:'required',
            hora:'required',
            id_pelicula:'required',
            id_sala:'required',
            id_tipo_funcion:'required',
            costo_adicional:'required'
        }
    }
    
    static get validaActualizacion(){
        return {
            id:'required'
        }
    }
    
}

module.exports = Function
