'use strict'
const Validator = use('Validator')
const Hash = use('Hash')
const User = use('App/Model/Users')
const RolPersona = use('App/Model/RolesPersonas')
const Database = use('Database')

class UsersController {
* viewRegistro(request,response){
        yield response.sendView('registro')
    }
    
    * Registro(request,response){
        const user = new User()
        user.id_persona = 1
        user.id_rol = 1
        user.numero_aut = "0000234567"
        user.password = yield Hash.make("1234")
        yield user.save()
        yield response.redirect('/log')
    }
    
    
    * login(request, response) {
        var data = request.all()
        const loginMessage = {
            success: 'Logged-in Successfully!',
            error: 'Invalid Credentials'
        }
        const validacion = yield Validator.validate(data, User.validaLogin)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            const authCheck = yield request.auth.attempt(data.correo, data.password);
            if(authCheck) {
                var Tipo =  yield Database.table('users').join('roles_personas','users.id','=','roles_personas.personas_id').join('roles','roles_personas.roles_id','=','roles.id').where('users.email',data.correo)
                if(Tipo[0].nombre_rol == 'Empleado'){
                    return response.send('funciona');
                }else{
                    return response.redirect('/menu');
                }
                //yield response.sendView({error: loginMessage.error });
            }   
        }
    }
    
    * insert(request,response){
        const data = request.all()
        console.log(data)
        const validacion = yield Validator.validate(data, User.insertNvoRegistro)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            const user = new User()
            user.nombre = data.nombre
            user.a_paterno = data.a_paterno
            user.a_materno = data.a_materno
            user.direccion= data.direccion
            user.telefono= data.telefono
            user.email= data.email
            user.password = yield Hash.make("abc1234")
            yield user.save()
            
            const id=user.id;
            const rol = new RolPersona();
            rol.personas_id=user.id
            rol.roles_id=1
            yield rol.save()
            //yield response.send(user);
            yield response.redirect("/enviar/"+user.email)
        }
    }
    * insertAdmin(request,response){
            const user = new User()
            user.id_persona = 1
            user.id_rol = 1
            user.numero_aut = '12345'
            user.password = yield Hash.make('12345')
            user.estado= 'Activo'
            yield user.save()
    }
    * insertClient(request,response){
            const user = new User()
            user.id_persona = 2
            user.id_rol = 2
            user.numero_aut = '1234567'
            user.password = yield Hash.make('1234567')
            user.estado= 'Activo'
            yield user.save()
    }
    
    * Clientes(request,response){
        const users = yield Database.from('users')
        .innerJoin('people','people.id','users.id_persona').where('users.id_rol',1);
        yield response.json(users)
    }
    
    * Empleados(request,response){
        const users = yield Database.from('users')
        .innerJoin('people','people.id','users.id_persona').where('users.id_rol',2);
        yield response.json(users)
    }

    * logout(request, response) {
        yield request.auth.logout();
        return response.redirect('/');
    }
}

module.exports = UsersController
