'use strict'

const Database = use('Database')
const Place = use('App/Model/Place')

class PlacesController {

    *  Insertar(request,response){
        const Asiento = request.all()
        const place = new Place()
        place.localidad = Asiento.Asiento
        place.id_venta_detalle = Asiento.Venta
        yield place.save()
    }
    *  Eliminar(request,response){
        const Asiento = request.all()
        const id = yield DataBase.table('places').where({localidad:Asiento.Asiento,id_venta_detalle:Asiento.Venta}).select('id')
        const place = yield Place.find(id[0].id)
        yield place.delete()
    }
    * asientosFuncion(request,response){
        var funcion= yield request.params()
        console.log(funcion.funcion)
        const asientos = yield Database.from('places')
        .join('details_sales','details_sales.id','places.id_venta_detalle')
        .where('details_sales.id_funcion','=',funcion.funcion)
        response.json(asientos)
    }
}

module.exports = PlacesController
