'use strict'

const Lucid = use('Lucid')
const Hash = use('Hash')

class User extends Lucid {

    static boot () {
        super.boot()
        this.addHook('beforeCreate', function * (next) {
            this.password = yield Hash.make(this.password)
            yield next
        })
    }

    apiTokens () {
        return this.hasMany('App/Model/Token')
    }
    
    static get validacionesUsuario(){
        return {
            persona_id:'required',
            rol_id:'required'
        }
    }
    
    static get insert(){
        return {
            persona_id:'required',
            rol_id:'required',
            numero_aut:'required',
            password:'required',
            estado:'required'
        }
    }

}

module.exports = User
