'use strict'

const Lucid = use('Lucid')

class Funcion extends Lucid {
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
    
    set get validaActualizacion(){
        return {
            id:'required',
            fecha:'required',
            hora:'required',
            id_sala:'required',
            id_tipo_funcion:'requiered',
            id_pelicula:'required',
            costo_adicional:'required'
        }
    }
    
}

module.exports = Funcion
