'use strict'

const Lucid = use('Lucid')

class Users extends Lucid {
 
    static get validacionesUsuario(){
        return {
            nombre:'required',
            a_paterno:'required',
            a_materno:'required',
            direccion:'required',
            colonia:'required',
            telefono:'required',
            email:'required',
            password:'required'
        }
    }
    
    static get insertNvoRegistro(){
        return {
            nombre:'required',
            a_paterno:'required',
            a_materno:'required',
            direccion:'required',
            telefono:'required',
            email:'required'
        }
    }
    
    static get validaActualizaPassword(){
        return {
            email:'required',
            password:'required',
            password_provicional:'required'
        }
    }
    
    static get validaActualizaUsuario(){
        return {
            nombre:'required',
            a_paterno:'required',
            a_materno:'required',
            direccion:'required',
            colonia:'required',
            telefono:'required',
            email:'required'
        }
    }
    
    static get validaLogin(){
        return {
            correo:'required',
            password:'required'
        }
    }
}



module.exports = Users
