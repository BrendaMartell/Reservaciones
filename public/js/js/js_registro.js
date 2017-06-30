$(document).ready(function(){
    var tab=document.getElementById('tbody');
    var Pnl_Registro=document.getElementById('Pnl_Registro');
    var Pnl_Tabla=document.getElementById('Pnl_Tabla');
    $("#EnPantalla").text("Clientes")
    var Movimiento ="";
    console.log('{{user}}');
    $("#nombres").val('{{persona.nombres}}');
    $("#apellidos").val('{{persona.apellidos}}');
    $("#email").val('{{persona.email}}');
    $("#numero_aut").val('{{user.numero_aut}}');
    
    
    
});
