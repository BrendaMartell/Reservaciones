'use strict'
const Validator = use('Validator')
const Hash = use('Hash')
const User = use('App/Model/User')
const Persona = use('App/Model/Person')

class UsersController {
    
    * viewRegistro(request,response){
        yield response.sendView('registro')
    }
    
    * Registro(request,response){
        const user = new User()
        user.id_persona = 1
        user.id_rol = 1
        user.numero_aut = "0000123456"
        user.password = yield Hash.make("1234")
        user.estado="A"
        yield user.save()
        yield response.redirect('/log')
    }
    
    * insert(request,response){
        const data = request.all()
        const validacion = yield Validator.validate(data,User.validaInsert)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos)
        }else{
            const user = new User()
            user.id_persona = data.id_persona
            user.id_rol = data.id_rol
            user.numero_aut = data.numero_aut
            user.password = yield Hash.make(data.password)
            user.estado= data.estado
            yield user.save()
            yield response.redirect('/')
        }
    }
    
    *TodosUsuarios(request,response){
        const users = yield User.all()
        yield response.json(users)
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
            console.log(request)
            return response.redirect('/WSocket');
        }
        yield response.sendView('/', { error: loginMessage.error });
    }
    
    * logout(request, response) {
        yield request.auth.logout();
        return response.redirect('/');
    }
}

module.exports = UsersController