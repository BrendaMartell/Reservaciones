'use strict'

const Route = use('Route')

Route.on('/').render('inicio')
Route.on('/cartelera').render('cartelera')
Route.on('/nosotros').render('nosotros')
Route.on('/galeria').render('galeria')
Route.get('/Login/Boletos/:funcion','FunctionsController.funcionEspesifica')
Route.post('/Login/Boletos/:funcion','PlacesController.asientosFuncion')
Route.post('/Login/insertarAsiento','PlacesController.Insertar')
Route.post('/Login/eliminarAsiento','PlacesController.Eliminar')

Route.get('/insertAdmin','UsersController.insertAdmin')
Route.get('/insertClient','UsersController.insertClient')
Route.get('/cargarImagen','FuncionsController.imagenesPelicula')


//RUTAS DE BRENDA
Route.on('/log').render('login')
Route.on('/reg').render('registro')
Route.get('/registra_Rol', 'RolesController.Registro');
Route.get('/registra_Persona', 'PersonsController.Registro');
Route.get('/registra_Usuario', 'UsersController.Registro');

Route.post('/login', 'UsersController.login');
Route.get('/logout', 'UsersController.logout').middleware('auth');
Route.on('/I').render('master').middleware('auth');
Route.post('DUser','PersonsController.DUser');

//Routes_Catalogos
Route.get('cat_ctes').render('cClientes').middleware('auth');
Route.get('cat_emp').render('cEmpleados').middleware('auth');
Route.get('cat_salas').render('cSalas').middleware('auth');
Route.get('cat_tfns').render('cTipoFuncion').middleware('auth');
Route.get('cat_pelicula').render('cPeliculas').middleware('auth');
Route.get('cat_tfns').render('cTipoFuncion').middleware('auth');
Route.get('cat_tboleto').render('cTipoBoleto').middleware('auth');
Route.get('cat_roles').render('cRoles').middleware('auth');
Route.get('cat_fnes').render('cFunciones').middleware('auth');
Route.get('cat_cartelera').render('cCartelera').middleware('auth');


Route.post('nvo_cte', 'PersonsController.insert');
Route.post('edit_cte', 'PersonsController.update');
Route.post('all_ctes', 'UsersController.Clientes');
Route.post('filt_ctes', 'PersonsController.filt_ctes');

Route.post('nvo_emp', 'PersonsController.insertEmp');
Route.post('edit_emp', 'PersonsController.updateEmp');
Route.post('all_emps', 'UsersController.Empleados');
Route.post('filt_emp', 'PersonsController.filt_emps');

Route.post('nvo_sala', 'RoomsController.insert');
Route.post('edit_sala', 'RoomsController.update');
Route.post('all_salas', 'RoomsController.all');
Route.post('filt_sala', 'RoomsController.filt_sala');

Route.post('nvo_tpofnes', 'TypeFunctionsController.insert');
Route.post('edit_tpofnes', 'TypeFunctionsController.update');
Route.post('all_tpofnes', 'TypeFunctionsController.all');
Route.post('filt_tpofnes', 'TypeFunctionsController.filt_tpofnes');

Route.post('nvo_tpoboleto', 'TypeTicketsController.insert');
Route.post('edit_tpoboleto', 'TypeTicketsController.update');
Route.post('all_tpoboleto', 'TypeTicketsController.all');
Route.post('filt_tpoboleto', 'TypeTicketsController.filt_tpoboleto');

Route.post('nvo_roles', 'RolesController.insert');
Route.post('edit_roles', 'RolesController.update');
Route.post('all_roles', 'RolesController.all');
Route.post('filt_roles', 'RolesController.filt_roles');


Route.post('nvo_pelicula', 'MoviesController.insert');
Route.post('edit_pelicula', 'MoviesController.update');
Route.post('all_pelicula', 'MoviesController.all');
Route.post('filt_pelicula', 'MoviesController.filt_roles');

Route.post('nva_fnes', 'FunctionsController.insert');
Route.post('edit_fnes', 'FunctionsController.update');
Route.post('all_fnes', 'FunctionsController.all');
Route.post('filt_fnes', 'FunctionsController.filt_fnes');




Route.post('SalasDisp', 'RoomsController.disponibles');
Route.post('EnCartelera', 'MoviesController.enCartelera');
Route.post('TpsFuncion', 'TypeFunctionsController.Tipos');

















