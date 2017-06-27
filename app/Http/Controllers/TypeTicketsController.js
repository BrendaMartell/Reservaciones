'use strict'

const Tipo_Boleto=use("App/Model/TypeTicket")
const Validator=use("Validator")

class TypeTicketsController {
    * insert(request,response){
        const data=request.all();
        const validacion = yield Validator.validate(data,Tipo_Boleto.validacionesInsertar)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            const tipo=new Tipo_Boleto();
            tipo.descripcion=data.descripcion;
            tipo.costo=data.costo;
            const insercion=yield tipo.save()
            if(insercion==true){
                yield response.redirect('/cat_tboleto')
            }else{
                yield response.send('Hubo un error al registrar, intentelo de nuevo.')
            }
        }
    }
    
    * update(request,response){
        const data=request.all();
        console.log(data)
        const validacion = yield Validator.validate(data,Tipo_Boleto.validaActualizacion)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            const tipo= yield Tipo_Boleto.findBy('id', data.id)
            tipo.descripcion = data.descripcion
            tipo.costo = data.costo
            yield tipo.save()
            yield response.redirect('/cat_tboleto')
        }
    }
    
    * all(request,response){
        const tipos_boletos=yield Tipo_Boleto.all();
        console.log(tipos_boletos)
        yield response.json(tipos_boletos)
    }
}

module.exports = TypeTicketsController
