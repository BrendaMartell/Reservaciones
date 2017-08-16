'use strict'
var nodemailer = use('Mail');

class EmailsController {
    * sendEmail (request, response){
        // Definimos el transporter
        var correo = request.param('correo')
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'brendalauramartell@gmail.com',
                pass: '092526bl'
            }
        });//final transporter

        // Definimos el email
        var mailOptions = {
            from: 'Remitente',
            to: correo,
            subject: 'Contrasenia Provicional',
            text: 'Contenido del email'
        };//final mailOptions
        
        // Enviamos el email
        transporter.sendMail(mailOptions, function(error, info){
            if (error){
                console.log(error);
                res.send(500, err.message);
            } else {
                console.log("Email Enviado");
                res.status(200).jsonp(req.body);
            }
        });//final sendMail
        var mensaje = 'Se acaba de enviar un correo de confirmacion a su correo.'
        response.redirect('/mensaje',{mensaje:mensaje})
    }
}

module.exports = EmailsController
