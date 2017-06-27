'use strict'

const Tipo_Funcion=use("App/Model/TypeFunction")
const Validator=use("Validator")

class TypeFunctionsController {
    * insert(request,response){
        const data=request.all();
        const validacion = yield Validator.validate(data,Tipo_Funcion.validacionesInsertar)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            const tipo=new Tipo_Funcion();
            tipo.descripcion=data.descripcion;
            const insercion=yield tipo.save()
            if(insercion==true){
                yield response.redirect('/cat_fns')
            }else{
                yield response.send('Hubo un error al registrar, intentelo de nuevo.')
            }
        }
    }
    
    * update(request,response){
        const data=request.all();
        console.log(data)
        const validacion = yield Validator.validate(data,Tipo_Funcion.validaActualizacion)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            const tipo= yield Tipo_Funcion.findBy('id', data.id)
            tipo.descripcion = data.descripcion
            yield tipo.save()
            yield response.redirect('/cat_fns')
        }
    }
    
    * all(request,response){
        const tipos_funcion=yield Tipo_Funcion.all();
        console.log(tipos_funcion)
        yield response.json(tipos_funcion)
    }
}

module.exports = TypeFunctionsController
