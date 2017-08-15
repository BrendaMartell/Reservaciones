'use strict'

const Route = use('Route')



//RUTAS DE BRENDA
Route.on('/').render('login')
Route.on('/menu').render('master')
Route.on('/reg').render('registro')
Route.post('/reg_cte', 'UsersController.insert');


Route.get('/reg', function * (request, response) {
    response.sendView("reg",{persona:"",usuario:""});
});
Route.get('/logus/:num', function * (request, response) {
    const numero=request.params();
    yield response.sendView("login",{numero});
});
Route.on('/log/:num').render('login');
Route.post('/enviar', 'EmailsController.sendEmail');

















