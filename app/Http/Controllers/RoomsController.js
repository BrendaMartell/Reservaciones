'use strict'

const Sala=use("App/Model/Room");
const Database=use("Database");
const Validator=use("Validator");


class RoomsController {
    * insert(request,response){
        const data=request.all();
        const validacion = yield Validator.validate(data,Sala.validacionesInsertar)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            const sala=new Sala();
            sala.alias=data.alias;
            sala.tipo=data.tipo;
            sala.capacidad=data.capacidad;
            const insercion=yield sala.save()
            if(insercion==true){
                yield response.redirect('/cat_salas')
            }else{
                yield response.send('Hubo un error al registrar, intentelo de nuevo.')
            }
        }
    }
    
    * update(request,response){
        const data=request.all();
        console.log(data)
        const validacion = yield Validator.validate(data,Sala.validaActualizacion)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            const sala= yield Sala.findBy('id', data.id)
            sala.alias = data.alias
            sala.tipo = data.tipo
            sala.capacidad = data.capacidad
            yield sala.save()
            yield response.redirect('/cat_salas')
        }
    }
    
    * all(request,response){
        const salas=yield Sala.all();
        yield response.json(salas)
    }
    
    * disponibles(request,response){
        const data=request.all();
        console.log(data);
        const fecha="2017/05/30";
        const subquery = Database
        .from('functions')
        .where({'fecha': fecha})
        .select('id_sala')
        console.log(subquery);
        
        console.log(subquery)
        const salas = yield Database
        .from('rooms')
        .where('tipo',data.tipo)
        .whereNotIn('id', subquery)
        
        console.log(salas)
        yield response.json(salas)
    }
}

module.exports = RoomsController
