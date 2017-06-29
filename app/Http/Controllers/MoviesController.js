'use strict'

const Pelicula=use("App/Model/Movie")
const Validator=use("Validator")
const Helpers = use('Helpers')

class MoviesController {
    
    * insert(request,response){
        const data=request.all();
        const imagen=request.file('imagen');
        var nombre_archivo = "nodispobible.png"
        if(imagen.file.size != 0){
            nombre_archivo = imagen.file.name
        }
        
        yield imagen.move(Helpers.publicPath('imagenes'), nombre_archivo);
        if(!imagen.moved()){
           yield response.send("Error al subir")
        }else{
            const pelicula=new Pelicula();
            pelicula.nombre=data.nombre;
            pelicula.sinopsis=data.sinopsis;
            pelicula.duracion=data.duracion;
            pelicula.imagen=nombre_archivo;
            pelicula.clasificacion=data.clasificacion;
            pelicula.video=data.video;
            pelicula.estado="Cartelera";
            const validacion = yield Validator.validate(pelicula,Pelicula.validaInsert)
            if(validacion.fails()){
                yield response.send('No se ingresaron correctamente los datos')
            }else{
                const insercion=yield pelicula.save()
                if(insercion==true){
                    yield response.redirect('/cat_pelicula')
                }else{
                    yield response.send('Hubo un error al registrar, intentelo de nuevo.')
                }
            }
                
        }
        
    }
    
    
    * update(request,response){
        const data=request.all();
        const imagen=request.file('imagen');
        var nombre_archivo = data.nombre_imagen
        if(imagen.file.size != 0){
            nombre_archivo = imagen.file.name
        }
        if(nombre_archivo != data.nombre_imagen){
            yield imagen.move(Helpers.publicPath('imagenes'), nombre_archivo);
            if(!imagen.moved()){
               yield response.send("Error al subir")
            }
        }
        const validacion = yield Validator.validate(data,Pelicula.validaActualizacion)
        const pelicula=yield Pelicula.findBy('id', data.id);
        pelicula.nombre=data.nombre;
        pelicula.sinopsis=data.sinopsis;
        pelicula.duracion=data.duracion;
        pelicula.imagen=nombre_archivo;
        pelicula.clasificacion=data.clasificacion;
        pelicula.video=data.video;
        pelicula.estado="Cartelera";
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            yield pelicula.save()
            yield response.redirect('/cat_pelicula')
        }
        
        
        
    }
    
    * all(request,response){
        const pelicula=yield Pelicula.all();
        yield response.json(pelicula)
    }
    
    * enCartelera(request,response){
        const pelicula=yield Pelicula.query().where('estado','Cartelera');
        yield response.json(pelicula)
    }
    
}

module.exports = MoviesController
