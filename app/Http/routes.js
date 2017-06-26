'use strict'

const Route = use('Route')

Route.on('/').render('inicio')
Route.on('/cartelera').render('cartelera')
Route.on('/nosotros').render('nosotros')
Route.on('/galeria').render('galeria')





//RUTAS DE BRENDA
Route.on('/log').render('login')
Route.get('/registra_Rol', 'RolesController.Registro');
Route.get('/registra_Persona', 'PersonsController.Registro');
Route.get('/registra_Usuario', 'UsersController.Registro');
Route.post('/login', 'UsersController.login');
Route.get('/logout', 'UsersController.logout');
Route.on('/I').render('master')
Route.post('DUser','PersonsController.DUser');

//Routes_Catalogos
Route.get('cat_ctes').render('cClientes');
Route.get('cat_emp').render('cEmpleados');
Route.get('cat_salas').render('cSalas');
Route.get('cat_fns').render('cFunciones');
Route.get('cat_pelicula').render('cPeliculas');
Route.get('cat_tfns').render('cTipoFuncion');
Route.get('cat_tboleto').render('cTipoBoleto');


Route.post('nvo_cte', 'PersonsController.insert');
Route.post('edit_cte', 'PersonsController.update');
Route.post('all_ctes', 'UsersController.Clientes');
