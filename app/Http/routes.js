'use strict'

const Route = use('Route')



//RUTAS DE BRENDA
Route.on('/').render('master')

Route.get('/registro','UsersController.viewRegistro')
Route.post('/registro/insert', 'UsersController.insert');

Route.get('/login','UsersController.viewLogin')
Route.post('/login','UsersController.login')

Route.get('/menu','UsersController.viewMenu').middleware('auth')


Route.get('/enviar/:correo', 'EmailsController.sendEmail'); //Enviar Correo














