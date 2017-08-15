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
       	const usuario = request.input('numero_aut');
        const password = request.input('password');
        console.log(usuario,password)
        const loginMessage = {
            success: 'Logged-in Successfully!',
            error: 'Invalid Credentials'
        }
        const authCheck = yield request.auth.attempt(usuario, password);
        if (authCheck) {
            var Tipo =  yield Database.table('users').join('roles','users.id_rol','=','roles.id').where({numero_aut:usuario})
            if(Tipo[0].descripcion == 'Empleado'){
                return response.redirect('/I');
            }else{
                return response.redirect('/')
            }
            
        }
        yield response.sendView('/log', { error: loginMessage.error });
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
            console.log(id);
            const rol = new RolPersona();
            rol.personas_id=user.id
            rol.roles_id=1
            yield rol.save()
            /*yield request
            .withAll() 
            .andWith({errors: "Para iniciar se envio una contrasena provicional que debe actualizar para poder ingresar"}) 
            .flash()*/
            yield response.redirect('/').withAll() 
            .andWith({errors: "Para iniciar se envio una contrasena provicional que debe actualizar para poder ingresar"}) 
            .flash()
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
