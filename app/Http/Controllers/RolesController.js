'use strict'

const Rol = use("App/Model/Roles")
const Validator=use("Validator")

class RolesController {
    * insert(request,response){
        const data=request.all();
        const validacion = yield Validator.validate(data,Rol.validaciones)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            console.log(data)
            const rol=new Rol();
            rol.nombre_rol=data.nombre_rol;
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
        const validacion = yield Validator.validate(data,Rol.validaciones)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            const rol= yield Rol.findBy('id', data.id)
            rol.nombre_rol = data.nombre_rol
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
