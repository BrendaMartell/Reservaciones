'use strict'
const Validator = use('Validator')
const Hash = use('Hash')
const User = use('App/Model/Users')
const RolPersona = use('App/Model/RolesPersonas')
const Mail = use('Mail')
const Database = use('Database')

class UsersController {
    * viewRegistro(request,response){
        yield response.sendView('registro')
    }
    * viewLogin(request,response){
        yield response.sendView('login')
    }
    * viewMenu(request,response){
        yield response.sendView('master')
    }
    
    * DatosCliente(request,response){
        
    }
    
    *DatosUsuario(request,response){
        const data = request.all()
        console.log("ATOS", data)
        var Tipo =  yield Database.table('users')
        .join('roles_personas','users.id','=','roles_personas.personas_id')
        .join('roles','roles_personas.roles_id','=','roles.id')
        .where('users.id',data.id);
        console.log(Tipo);
        yield response.SendView({nombre_rol:Tipo[0].nombre_rol})
    }
    
    * cambioContraseña(request, response) {
        var data = request.all()
        const loginMessage = {
            success: 'Logged-in Successfully!',
            error: 'Invalid Credentials'
        }
        const validacion = yield Validator.validate(data, User.validarContraseña)
        if(validacion.fails()){
            const error = 'No ingresaro correctamente la Contraseña'
            yield response.sendView('cPassword',{error})
        }else if(data.nContrasena != data.cContrasena){
            const error = 'Las Contraseñas no coinciden'
            yield response.sendView('cPassword',{error})
        }else{
            const user = yield User.findBy('id',request.currentUser.id)
            console.log(data)
            user.password =  yield Hash.make(data.nContrasena)
            user.activo = '1'
            yield user.save()
            yield response.redirect('/menu');
            
        }   
    }
    
    * login(request, response) {
        var data = request.all()
        const loginMessage = {
            success: 'Logged-in Successfully!',
            error: 'Invalid Credentials'
        }
        const validacion = yield Validator.validate(data, User.validaLogin)
        if(validacion.fails()){
            const error = 'No ingreso correctamente los datos'
            yield response.sendView('login',{error})
        }else{
            try{
                const authCheck = yield request.auth.attempt(data.correo, data.password);
            if(authCheck) {
                const user = yield User.findBy('email',data.correo)
                if( user.activo == "0"){
                    yield response.redirect('/cPassword');
                }else{
                    var Tipo =  yield Database.table('users').join('roles_personas','users.id','=','roles_personas.personas_id').join('roles','roles_personas.roles_id','=','roles.id').where('users.email',data.correo);
                     yield request.session.put('rol_usuario', Tipo[0].nombre_rol)
                    if(Tipo[0].nombre_rol == 'Empleado'){
                        return response.send('funciona');
                    }else{
                        yield response.redirect('/menu');
                    }
                    //yield response.sendView({error: loginMessage.error });
                }
            }
            }catch(e){
                const error = 'El usuario o Password no coincide'
                yield response.sendView('login',{error})
            }
        }
    }
    
    * loginApp(request, response) {
        var data = request.all()
        const validacion = yield Validator.validate(data, User.validaLogin)
        if(validacion.fails()){
            yield response.json({Error:True})
        }else{
            const authCheck = yield request.auth.attempt(data.correo, data.password);
            if(authCheck) {
                var Tipo =  yield Database.table('users').join('roles_personas','users.id','=','roles_personas.personas_id').join('roles','roles_personas.roles_id','=','roles.id').where('users.email',data.correo)
                yield response.json({id:Tipo[0].id,nombre:Tipo[0].nombre})
                }
            yield response.json({Error:True})
        }   
    }
    
    * insert(request,response){
        const data = request.all()
        //console.log(data)
        const validacion = yield Validator.validate(data, User.insertNvoRegistro)
        if(validacion.fails()){
            const error = 'No se ingresaron correctamente los datos'
            yield response.redirect('/registro')
        }else{
            try{
                const user = new User()
                user.nombre = data.nombre
                user.a_paterno = data.a_paterno
                user.a_materno = data.a_materno
                user.direccion= data.direccion
                user.telefono= data.telefono
                user.email= data.email
                const contrasena = Math.floor((Math.random() * 10000) + 1) + 10000;
                user.password = yield Hash.make(contrasena.toString())
                user.activo = '0'
                yield user.save()

                const id=user.id;
                const rol = new RolPersona();
                rol.personas_id=user.id
                rol.roles_id=1
                yield rol.save()
                //yield response.send(user);
                yield Mail.send('emails.welcome', user, (message) => {
                  message.to(user.email, user.nombre + " " + user.a_paterno + " " + user.a_materno)
                  message.from('pp5548080@gmail.com')
                  message.subject('Welcome to the Kitten\'s World')
                  message.html('<h2> Heya {{ firstname}} </h2><p>Este es Un correro de confirmacion. La siguiente es una contrasena provicional que debes cambiar para poder tener acceso al sistema.</p><p>Tu contrasena provicional es <b>'+contrasena+'</b><p><a href="http://192.168.1.75:3332/login">Cambiar Contrasena</a></p>')
                });
            yield response.redirect("/login")
            }catch(e){
                /*var error = '';
                console.log(e.detail)
                if(e.detail.includes('email')){
                    error = 'El correo ya existe. Tiene que escojer otro correo'    
                }*/
                yield response.redirect('/registro')
            }
        }
    }
    * insertCte(request,response){
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
            yield response.redirect('/cat_ctes')
        }
    }
    
     * update_persona(request,response){
        const data=request.all();
        const validacion = yield Validator.validate(data,User.validaActualizaUsuario)
        const us=yield User.findBy('id', data.id_persona);
        us.nombre=data.nombre;
        us.a_paterno=data.a_paterno;
        us.a_materno=data.a_materno;
        us.direccion=data.direccion;
        us.telefono=data.telefono;
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            yield us.save()
            yield response.redirect('/cat_ctes')
        } 
    }
    
     * update_empleado(request,response){
        const data=request.all();
        const validacion = yield Validator.validate(data,User.validaActualizaUsuario)
        const us=yield User.findBy('id', data.id_persona);
        us.nombre=data.nombre;
        us.a_paterno=data.a_paterno;
        us.a_materno=data.a_materno;
        us.direccion=data.direccion;
        us.telefono=data.telefono;
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            yield us.save()
            yield response.redirect('/cat_emp')
        } 
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
        .innerJoin('roles_personas','roles_personas.personas_id','users.id').where('roles_personas.roles_id',1);
        yield response.json(users)
    }
    
    * Empleados(request,response){
        const users = yield Database.from('users')
        .innerJoin('roles_personas','roles_personas.personas_id','users.id')
        .innerJoin('roles','roles.id','roles_personas.roles_id')
        .whereNot('roles_personas.roles_id', 1);
        yield response.json(users)
    }

    * logout(request, response) {
        yield request.auth.logout();
        return response.redirect('/');
    }
}

module.exports = UsersController
