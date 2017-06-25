'use strict'
const Persona=use('App/Model/Person');
class PersonsController {
    * Registro(request,response){
        const persona = new Persona()
        persona.nombres = "Brenda Laura"
        persona.apellidos = "Martell Medina"
        persona.email = "brendalauramartell@gmail.com"
        persona.status = "Activo"
        yield persona.save()
        yield response.redirect('/log')
    }
}

module.exports = PersonsController
