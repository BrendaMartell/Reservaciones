'use strict'

const Funcion = use('App/Model/Function')
const Database = use('Database')
const Validator = use('Validator')

class FunctionsController {

    
    * imagenesPelicula(request,response){
        const imagenes = yield Database.table('movies').join('functions','movies.id','=','functions.id_pelicula').select('imagen','nombre','clasificacion')
        yield response.json(imagenes)
    }
    
    * insert(request,response){
        const data=request.all();
        const validacion = yield Validator.validate(data,Funcion.validaInsersion)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            const funcion=new Funcion();
            funcion.fecha=data.fecha;
            funcion.hora=data.hora;
            funcion.id_pelicula=data.id_pelicula;
            funcion.id_sala=data.id_sala;
            funcion.id_tipo_funcion=data.id_tipo_funcion;
            funcion.costo_adicional=data.costo_adicional;
            funcion.hora_termino=data.hora_termino;
            const insercion=yield funcion.save()
            if(insercion==true){
                yield response.redirect('/cat_fnes')
            }else{
                yield response.send('Hubo un error al registrar, intentelo de nuevo.')
            }
        }
    }
    
    * update(request,response){
        const data=request.all();
        console.log(data)
        const validacion = yield Validator.validate(data,Funcion.validaActualizacion)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            const funcion= yield Funcion.findBy('id', data.id)
            funcion.fecha=data.fecha;
            funcion.hora=data.hora;
            funcion.id_pelicula=data.id_pelicula;
            funcion.id_sala=data.id_sala;
            funcion.id_tipo_funcion=data.id_tipo_funcion;
            funcion.costo_adicional=data.costo_adicional;
            funcion.hora_termino=data.hora_termino;
            yield funcion.save()
            yield response.redirect('/cat_fnes')
        }
    }
    
    
    
     * all(request,response){
         
         
        const funciones = yield Database.from('functions')
        .innerJoin('movies', 'functions.id_pelicula','movies.id')
        .innerJoin('rooms', 'functions.id_sala','rooms.id')
        .innerJoin('type_functions', 'functions.id_tipo_funcion','type_functions.id')
        .where('functions.fecha','2017/05/02');
         console.log(funciones);
         
        yield response.json(funciones)
        
    }
}

module.exports = FunctionsController
