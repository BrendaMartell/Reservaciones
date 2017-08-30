'use strict'
const Detalle = use("App/Model/DetalleOrdenes")
const Menu = use("App/Model/Menus")
const Validator=use("Validator")
const Database = use('Database')

class DetalleOrdenesController {
    
    * insertaDetalle(request, response){
        const data = request.all();
       // console.log(data);
        try{
           
            for(var i = 0; i < data.detalle.length;i++){
                const detalle=new Detalle();
                detalle.ordenes_id=data.ordenes_id;
                detalle.menu_id=data.detalle[i].menu_id;
                detalle.precio=data.detalle[i].precio;
                detalle.cantidad=data.detalle[i].cantidad;
                detalle.total_platillo=data.detalle[i].total_platillo;
                detalle.comentarios="";
               //console.log(detalle);
                yield detalle.save();
            }
        } catch(e) {
            console.log("EROR:  "+e);
		}
        response.send("RegistroRealizado");
    }
    
    * insertaDetalleApp(request, response){
        const data = request.all();
        console.log(data)
        const id = request.params("Id");
        console.log(id);
        try{
           
            for(var i = 0; i < data.detalle.length;i++){
                const detalle=new Detalle();
                detalle.ordenes_id=id;
                detalle.menu_id=data.detalle[i].identificador;
                detalle.precio=data.detalle[i].Precio;
                detalle.cantidad=data.detalle[i].Cantidad;
                detalle.total_platillo=data.detalle[i].Total;
                detalle.comentarios="";
               //console.log(detalle);
                yield detalle.save();
            }
        } catch(e) {
            console.log("EROR:  "+e);
		}
        response.send("RegistroRealizado");
    }
    
    
    * detalle(request,response){
        const numero=request.params();
        console.log(numero.numero);
        const detalleorden = yield Database.from('ordenes')
        .innerJoin('detalle_ordenes','ordenes.id','detalle_ordenes.ordenes_id')
        .innerJoin('menus', 'menus.id', 'detalle_ordenes.menu_id')
        .where('detalle_ordenes.ordenes_id', numero.numero);
        console.log(detalleorden);
        yield response.json(detalleorden);
    }
    * reporte(request,response){
        const detalle = yield Menu.query()
        .innerJoin('detalle_ordenes','detalle_ordenes.menu_id','menus.id')
        .select('menus.nombre_producto')
        .sum('detalle_ordenes.cantidad as total_cantidad')
        .sum('detalle_ordenes.total_platillo as total_platillo')
        .groupBy('menus.nombre_producto')
        .orderBy('menus.nombre_producto').fetch();
        console.log(detalle);
        return  response.json(detalle);    
    }
}

module.exports = DetalleOrdenesController
