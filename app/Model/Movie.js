'use strict'

const Lucid = use('Lucid')

class Movie extends Lucid {
    static get validaInsersion(){
        return {
            nombre:'required',
            duracion:'required',
            sinopsis:'required',
            imagen:'required',
            video:'required',
            clasificacion:'required'
        }
    }
    
    static get validaActualizacion(){
        return {
            id:'required'
        }
    }
}

module.exports = Movie
