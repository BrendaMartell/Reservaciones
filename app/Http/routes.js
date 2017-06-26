'use strict'

const Route = use('Route')
//RUTAS DE BRENDA
Route.on('/log').render('login')
Route.get('/registra_Rol', 'RolesController.Registro');
Route.get('/registra_Persona', 'PersonsController.Registro');
Route.get('/registra_Usuario', 'UsersController.Registro');



Route.post('/login', 'UsersController.login');
Route.get('/logout', 'UsersController.logout');
Route.on('/I').render('master')

Route.post('DUser','PersonsController.DUser');
