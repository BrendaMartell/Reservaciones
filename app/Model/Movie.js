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
    
    set get validaActualizacion(){
        return {
            nombre:'required',
            duracion:'required',
            sinopsis:'required',
            imagen:'required',
            video:'required',
            clasificacion:'required'
        }
    }
}

module.exports = Movie
