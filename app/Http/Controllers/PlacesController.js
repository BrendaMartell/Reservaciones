'use strict'

const DataBase = use('Database')
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
}

module.exports = PlacesController
