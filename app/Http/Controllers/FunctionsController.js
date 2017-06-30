'use strict'

const Funcion = use('App/Model/Functions')
const Pelicula = use('App/Model/Movie')
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
            const insercion=yield funcion.save();
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
         
         const data=request.all();
         const funciones = yield Database.from('functions')
        .innerJoin('movies', 'functions.id_pelicula','movies.id')
        .innerJoin('rooms', 'functions.id_sala','rooms.id')
        .innerJoin('type_functions', 'functions.id_tipo_funcion','type_functions.id')
        .where('functions.fecha',data.fecha)
         .select('functions.id','movies.imagen','movies.clasificacion','functions.hora','movies.nombre','movies.sinopsis');
         yield response.json(funciones)
        
    }
     * funcionEspesifica(request,response){
        var funcions= yield request.params()
        console.log(funcions)
        const funciones = yield Database.from('functions')
        .innerJoin('movies', 'functions.id_pelicula','movies.id')
        .innerJoin('rooms', 'functions.id_sala','rooms.id')
        .innerJoin('type_functions', 'functions.id_tipo_funcion','type_functions.id')
        .where('functions.id','=',funcions.funcion)
        .select('functions.id','movies.imagen','movies.clasificacion','functions.hora','movies.nombre','movies.sinopsis');
        yield response.sendView('compraBoletos',{funciones})
    }
    
    * Cantidades(request,response){
         const pelicula = yield Pelicula.query()
             .innerJoin('functions','functions.id_pelicula','movies.id')
             .innerJoin('details_sales','functions.id','details_sales.id_funcion')
            .select('nombre').sum('cantidad').groupBy('nombre').fetch();
		return  response.json(pelicula);
        
    }
}

module.exports = FunctionsController
