'use strict'

const Database = use('Database')
const Place = use('App/Model/Place')

class PlacesController {

    * asientosFuncion(request,response){
        var funcion= yield request.params()
        console.log(funcion.funcion)
        const asientos = yield Database.from('places')
        .join('details_sales','details_sales.id','places.id_venta_detalle')
        .where('details_sales.id_funcion','=',funcion.funcion)
        console.log(asientos)
        response.json(asientos)
    }
}

module.exports = PlacesController
