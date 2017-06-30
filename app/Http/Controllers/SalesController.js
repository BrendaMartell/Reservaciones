'use strict'

const Sale = use('App/Model/Sale')
const Place = use('App/Model/Place')
const Detail = use('App/Model/DetailsSale')

class SalesController {
 
    * realizarVenta(request,response){
        var Fecha = new Date()
        var Mes = Fecha.getMonth() + 1
        var Ano = Fecha.getFullYear()
        var Hora = Fecha.getHours()
        var Minuto = Fecha.getMinutes()
        
        const info = request.all()
        const sale = new Sale()
        sale.fecha = Ano + '/' + Mes + '/' + Fecha.getDate()
        sale.hora = Hora + ':' + Minuto
        sale.cantidad = info.asientos.length
        yield sale.save()
        
        const details = new Detail()
        details.id_venta = sale.id
        details.id_funcion = info.funcion
        yield details.save()
        
        for(var i = 0; i < info.asientos.length; i++ ){
            var localidad = info.asientos[i].asientoActual.split('-')
            const place = new Place()
            place.localidad = localidad[1]
            place.id_venta_detalle = details.id
            yield place.save()
       }
        yield response.json('Registrado')
    }
}

module.exports = SalesController

