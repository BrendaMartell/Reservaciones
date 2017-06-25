'use strict'
const Validator = use('Validator')
const Hash = use('Hash')
const User = use('App/Model/User')
const Persona = use('App/Model/Persona')

class UsersController {
    
    * viewRegistro(request,response){
        yield response.sendView('registro')
    }
    
    * Registro(request,response){
        const data = request.all()
        const validacion = yield Validator.validate(data,User.validaciones)
        if(validacion.fails()){
            yield response.send('No ingreso correctamente los valores')
        }else{
            const user = new User()
            user.name = data.name
            user.numero_aut = data.numero_aut
            user.password = yield Hash.make(data.password)
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
