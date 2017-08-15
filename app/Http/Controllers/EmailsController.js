'use strict'
var nodemailer = require('nodemailer');

class EmailsController {
    exports.sendEmail = function(req, res){
        // Definimos el transporter
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
            to: 'brendalauramartell@gmail.com',
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
    };
}

module.exports = EmailsController
