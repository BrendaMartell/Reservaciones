'use strict'

const Pelicula=use("App/Model/Movie")
const Validator=use("Validator")

class MoviesController {
    
    * insert(request,response){
        const data=request.all();
        const validacion = yield Validator.validate(data,Pelicula.validaInsert)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            const pelicula=new Pelicula();
            pelicula.nombre=data.nombre;
            pelicula.sinopsis=data.sinopsis;
            pelicula.duracion=data.duracion;
            pelicula.imagen=data.imagen;
            pelicula.clasificacion=data.clasificacion;
            pelicula.video=data.video;
            const insercion=yield pelicula.save()
            if(insercion==true){
                yield response.redirect('/cat_pelicula')
            }else{
                yield response.send('Hubo un error al registrar, intentelo de nuevo.')
            }
        }
    }
    
    * update(request,response){
        const data=request.all();
        console.log(data)
        const validacion = yield Validator.validate(data,Pelicula.validaActualizacion)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            const pelicula= yield Pelicula.findBy('id', data.id)
            pelicula.nombre=data.nombre;
            pelicula.sinopsis=data.sinopsis;
            pelicula.duracion=data.duracion;
            pelicula.imagen=data.imagen;
            pelicula.clasificacion=data.clasificacion;
            pelicula.video=data.video;
            yield pelicula.save()
            yield response.redirect('/cat_pelicula')
        }
    }
    
    * all(request,response){
        const pelicula=yield Pelicula.all();
        console.log(pelicula)
        yield response.json(pelicula)
    }
}

module.exports = MoviesController
