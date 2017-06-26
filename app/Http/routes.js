'use strict'

const Route = use('Route')
<<<<<<< HEAD

Route.on('/').render('inicio')
Route.on('/cartelera').render('cartelera')
Route.on('/nosotros').render('nosotros')
Route.on('/galeria').render('galeria')
=======
//RUTAS DE BRENDA
Route.on('/log').render('login')
Route.get('/registra_Rol', 'RolesController.Registro');
Route.get('/registra_Persona', 'PersonsController.Registro');
Route.get('/registra_Usuario', 'UsersController.Registro');
<<<<<<< HEAD



Route.post('/login', 'UsersController.login');
Route.get('/logout', 'UsersController.logout');
Route.on('/I').render('master')

Route.post('DUser','PersonsController.DUser');
=======
>>>>>>> 903a29d534166df521b9b7f5b0bd3c400da54ca6
>>>>>>> ea72c0cfee6eef88e1615f1694866f488c09572f
