'use strict'

const Route = use('Route')

Route.on('/').render('inicio')
Route.on('/cartelera').render('cartelera')
Route.on('/nosotros').render('nosotros')
Route.on('/galeria').render('galeria')
Route.post('/Login/insertarAsiento','PlacesController.Insertar')
Route.post('/Login/eliminarAsiento','PlacesController.Eliminar')
//RUTAS DE BRENDA
Route.on('/log').render('login')
Route.get('/registra_Rol', 'RolesController.Registro');
Route.get('/registra_Persona', 'PersonsController.Registro');
Route.get('/registra_Usuario', 'UsersController.Registro');
