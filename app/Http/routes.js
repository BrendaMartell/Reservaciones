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
Route.post('/datos_us','UsersController.DatosUsuario');

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
Route.get('/all_menu','MenuController.all').middleware('auth');
Route.get('/all_app','MenuController.all_app');
Route.get('/descarga_app/:Nombre','MenuController.descarga');
Route.post('/edit_menu','MenuController.update').middleware('auth');

Route.get('cat_pedido').render('cPedido').middleware('auth');
Route.get('procesa_pedido').render('procesa_pedidos').middleware('auth');
Route.get('completa_pedido').render('completa_pedido').middleware('auth');
Route.get('liquida_pedido').render('liquidar_pedido').middleware('auth');
Route.post('/nvo_pedido','OrdenesController.insertaOrden');
Route.post('/act_edo_pedido','OrdenesController.actualiza_orden').middleware('auth');
Route.post('/nvo_detalle','DetalleOrdenesController.insertaDetalle').middleware('auth');
Route.post('/nvo_detalleApp/:Id','DetalleOrdenesController.insertaDetalleApp');
Route.post('/all_pedidos','OrdenesController.allp').middleware('auth');
Route.post('/all_pedidos/:numero','OrdenesController.all').middleware('auth');
Route.post('/all_pedidos_estado/:estado','OrdenesController.all_pedidos_estado').middleware('auth');
Route.post('/edit_pedidos','OrdenesController.update').middleware('auth');
Route.post('/detalle_orden/:numero','DetalleOrdenesController.detalle').middleware('auth');


Route.get('cat_reservacion').render('cReservaciones').middleware('auth');
Route.post('/all_reservaciones','ReservacionesController.allr').middleware('auth');
Route.post('/all_reservaciones/:numero','ReservacionesController.all').middleware('auth');
Route.post('/nva_reservacion','ReservacionesController.insertaReservacion').middleware('auth');
Route.post('/edit_reservacion','ReservacionesController.actualiza_reservacion').middleware('auth');
Route.post('/all_reservaciones_estado/:estado','ReservacionesController.all_reservaciones_estado').middleware('auth');


Route.get('r_0001').render('rVentas').middleware('auth');
Route.post('/datos_r0001','DetalleOrdenesController.reporte').middleware('auth');
Route.get('r_0002').render('rPedidos').middleware('auth');
Route.post('/datos_r0002','OrdenesController.reporte').middleware('auth');
Route.get('r_0003').render('rReservaciones').middleware('auth');
Route.post('/datos_r0003/:rol','ReservacionesController.reporte').middleware('auth');
Route.get('r_0004').render('rAsistencias').middleware('auth');


Route.get('conf_reservacion').render('confirma_reservacion').middleware('auth');

Route.get('/menu','UsersController.viewMenu').middleware('auth');
Route.get('/enviar/:correo', 'EmailsController.sendEmail'); //Enviar Correo



Route.get('/logout','UsersController.logout').middleware('auth')


Route.post('/loginApp','UsersController.loginApp');











