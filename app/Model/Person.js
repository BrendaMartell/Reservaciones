'use strict'

const Lucid = use('Lucid')

class Person extends Lucid {
    static get validaInsert(){
        return {
            nombres:'required',
            apellidos:'required',
            email:'required'
        }
    }
    
    
    static get validaActualizacion(){
        return {
            nombres:'required',
            apellidos:'required',
            email:'required',
            status:'required'
        }
    }
    
    static get validacionesUsuario(){
        return {
            persona_id:'required',
            rol_id:'required'
        }
    }
    
    
}

module.exports = Person
