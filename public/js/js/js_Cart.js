$(document).ready(function(){
    var Contenedor_Cartelera=document.getElementById('Contenedor_Cartelera');
    var id;
    $("#id").hide();
    $("#EnPantalla").text("Funciones")
    var Movimiento ="";
    Carga_Datos();
    
    
<<<<<<< HEAD
    
=======
    function Carga_Datos(){
        var nombre_pelicula="";
        var html_code="";
        $.ajax({
             url:'all_fnes',
             type:'post',
             data:"",
             datatype:'json'
         }).done(function(response){
            $.each(response,function(a,b){
                $("#id").val(response[a].id);
                if(nombre_pelicula==response[a].nombre){
                    html_code+=
                        '  <a href="#" class="btn">' + response[a].hora + '</a>'
                }else{
                    if(nombre_pelicula != ""){ html_code+= '</div></div>'; }
                    html_code+=
                            '<div class="col-md-4 col-sm-6">' +
		        			   '<img src="/imagenes/' + response[a].imagen + '" class="img"  style="width:200px; height:300px"/>' +
		        			    '<p><h3>' + response[a].nombre + '</h3></p>' +
		        			    '<p>' + response[a].sinopsis + '</p>' +
                                '<p>Clasificacion: ' + response[a].clasificacion + '</p>' +
		        			   '<a href="/login/boletos/' + response[a].id + '" class="btn">' + response[a].hora + '</a>'
		        		
                }
                nombre_pelicula=response[a].nombre;
            });// final each
            if(nombre_pelicula != "" && html_code != ""){ html_code+= '</div></div>'; }
            Contenedor_Cartelera.innerHTML += html_code;
        });//final ajax
    }//final function carga Datos
>>>>>>> 7109d912c7d01c953ffca9b9443d652ac0a718fd
    
    
}); //final document