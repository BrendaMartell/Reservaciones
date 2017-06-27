'use strict'

const Rol = use("App/Model/Role")
const Validator=use("Validator")

class RolesController {
    * Registro(request,response){
        const rol = new Rol()
        rol.descripcion = "Cliente"
        yield rol.save()
        yield response.redirect('/log')
    }
    
    * insert(request,response){
        const data=request.all();
        const validacion = yield Validator.validate(data,Rol.validaInsert)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            const rol=new Rol();
            rol.descripcion=data.descripcion;
            const insercion=yield rol.save()
            if(insercion==true){
                yield response.redirect('/cat_roles')
            }else{
                yield response.send('Hubo un error al registrar, intentelo de nuevo.')
            }
        }
    }
    
    * update(request,response){
        const data=request.all();
        console.log(data)
        const validacion = yield Validator.validate(data,Rol.validaActualizacion)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            const rol= yield Rol.findBy('id', data.id)
            rol.descripcion = data.descripcion
            yield rol.save()
            yield response.redirect('/cat_roles')
        }
    }
    
    * all(request,response){
        const roles=yield Rol.all();
        console.log(roles)
        yield response.json(roles)
    }
    
    
}

module.exports = RolesController
