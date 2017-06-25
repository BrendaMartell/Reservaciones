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
>>>>>>> 903a29d534166df521b9b7f5b0bd3c400da54ca6
