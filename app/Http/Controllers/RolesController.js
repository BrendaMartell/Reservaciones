'use strict'

const Rol = use("App/Model/Role")

class RolesController {
    * Registro(request,response){
        const rol = new Rol()
        rol.descripcion = "Cliente"
        yield rol.save()
        yield response.redirect('/')
    }
}

module.exports = RolesController
