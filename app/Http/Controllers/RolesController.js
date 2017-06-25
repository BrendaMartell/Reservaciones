'use strict'

const Rol = use("App/Model/Role")

class RolesController {
    * Registro(request,response){
        const rol = new Rol()
        rol.descripcion = "Cliente"
        yield rol.save()
        yield response.redirect('/log')
    }
    
    * Insert(request,response){
        try{
            const data = request.all()
            const validacion = yield Validator.validate(data,Rol.insert)
            if(validacion.fails()){
                yield response.send('No se ingresaron los datos correctamente')
            }else{
                const rol = new Rol()
                rol.id_user = data.descripcion
                const r = yield rol.save()
                yield response.send("Registro Exitoso");
            }
        }catch(e){
            yield response.send("Hubo un error "+ e);
        }        
    }
    
}

module.exports = RolesController
