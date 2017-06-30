'use strict'

const Lucid = use('Lucid')

class DetailsSale extends Lucid {
    static get validaInsersion(){
        return {
            id_tipo_boleto:'required',
            id_venta:'required',
            id_funcion:'required',
            cantidad:'required'
        }
    }
    
    static get validaEliminacion(){
        return {
            id_venta:'required'
        }
    }
}

module.exports = DetailsSale
