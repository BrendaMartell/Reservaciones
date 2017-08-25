'use strict'

const Route = use('Route')



//RUTAS DE BRENDA
Route.on('/').render('login')
Route.on('/CC1').render('CambiaContrasena1')
Route.on('/CC2').render('CambiaContrasena2')
Route.on('/login').render('login')

Route.get('/registro','UsersController.viewRegistro');
Route.post('/registro/insert', 'UsersController.insert');

Route.get('/login','UsersController.viewLogin');
Route.post('/login','UsersController.login');

Route.get('cat_emp').render('cEmpleados').middleware('auth');
Route.post('/menu/emp/in','UsersController.insertEmp').middleware('auth');
Route.post('/all_emp','UsersController.Empleados').middleware('auth');
Route.post('/edit_emp','UsersController.update_empleado').middleware('auth');


Route.get('cat_ctes').render('cClientes').middleware('auth');
Route.post('/menu/cte/in','UsersController.insertCte').middleware('auth');
Route.post('/all_ctes','UsersController.Clientes').middleware('auth');
Route.post('/edit_cte','UsersController.update_persona').middleware('auth');


Route.get('cat_roles').render('cRoles').middleware('auth');
Route.post('/all_roles','RolesController.all').middleware('auth');
Route.post('/menu/roles/in','RolesController.insert').middleware('auth');
Route.post('/edit_rol','RolesController.update').middleware('auth');


Route.get('cat_menu').render('cMenu').middleware('auth');
Route.post('/menu/menu/in','MenuController.insert').middleware('auth');
Route.post('/all_menu','MenuController.all').middleware('auth');
Route.post('/edit_menu','MenuController.update').middleware('auth');

Route.get('cat_pedido').render('cPedido').middleware('auth');
Route.post('/nvo_pedido','OrdenesController.insertaOrden').middleware('auth');
Route.post('/nvo_detalle','DetalleOrdenesController.insertaDetalle').middleware('auth');
Route.post('/all_pedidos','OrdenesController.all').middleware('auth');
Route.post('/all_pedidos/:numero','OrdenesController.all').middleware('auth');
Route.post('/edit_pedidos','OrdenesController.update').middleware('auth');



Route.get('/menu','UsersController.viewMenu').middleware('auth');
Route.get('/enviar/:correo', 'EmailsController.sendEmail'); //Enviar Correo



Route.get('/logout','UsersController.logout').middleware('auth')














