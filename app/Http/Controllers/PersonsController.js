'use strict'
const database = use('Database')
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
    
    * DUser(request,response){
        const data = request.all()
        console.log(data)
        const Datos_Persona= yield database.from('users').innerJoin('people','users.id_persona','people.id').where('users.numero_aut',data.usuario);
        console.log(Datos_Persona);
        yield response.json(Datos_Persona);
    }
}

module.exports = PersonsController
