$(document).ready(function(){
    var tab=document.getElementById('tbody');
    var Pnl_Registro=document.getElementById('Pnl_Registro');
    var Pnl_Tabla=document.getElementById('Pnl_Tabla');
    var Contenedor_Funciones=document.getElementById('Contenedor_Funciones');
    var id;
    $("#id").hide();
    $("#EnPantalla").text("Funciones")
    var Movimiento ="";
    Carga_Datos();
    Deshabilita_Registro();
    
    $( "#id_tipo_funcion" ).change(function() {
        SalasDisponibles($('#id_tipo_funcion option:selected').text());
    });
    
    $("#Btn_Registra").click(function(){
        $("#titulo_formulario").text("Registra Funcion");
        Habilita_Registro();
        $("#fecha").focus();
        $('#formulario').attr('action','/nva_fnes');
    });//final btin registra click
    
    $("#Btn_Cancela").click(function(){
        Deshabilita_Registro();
    });//f
    
    function Habilita_Registro(){
        $("#Pnl_Registro").show();
        $("#Pnl_Tabla").hide();
    }
    
    function Deshabilita_Registro(){
        $("#Pnl_Registro").hide();
        $("#Pnl_Tabla").show();
    }
    
    $('#tbody').on('click', '.Btn_Editar', function(e) {
        e.preventDefault();
        $("#titulo_formulario").text("Edicion de Registro");
        $('#formulario').attr('action','/edit_fnes');
        Movimiento="Editar"
        var id=$(this).attr("data-id");
        var valores="";
        var funcion = [];
        funcion.push(id);
        $(this).parents("tr").find("td").each(function(){
            funcion.push($(this).html());
            valores+=$(this).html()+"\n";
        });
        Habilita_Registro();
        $("#id").val(id);
        $("#fecha").val(funcion[1]);
        $("#hora").val(funcion[2]);
        $("#hora_termino").val(funcion[3]);
        $("#id_pelicula").val(funcion[4]);
        seleccionar(funcion[4],"id_pelicula");
        SalasDisponibles($('#id_tipo_funcion option:selected').text());
        seleccionar(funcion[5],"id_sala");
        $("#capacidad").val(funcion[6]);
        seleccionar(funcion[7],"id_tipo_funcion");
        $("#costo_adicional").val(funcion[8]);
    });
    
    
    
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
                        '<div class="col-lg-1 col-md-1">'+
                            '<div class="box-footer box-comments">' +
                                '<div class="box-comment">' +
                                    '<div class="comment-text">' +
                                        '<a href="" class="hora"><span class="text-muted pull-right">17:55</span></a>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' 
                }else{
                    if(nombre_pelicula != ""){ html_code+= '</div></div>'; }
                    html_code+='<div class="box box-widget">' +
                            '<div class="box-header with-border">' +
                              '<div class="user-block">' +
                                '<img class="img-circle" src="/imagenes/' + response[a].imagen + '" alt="User Image">' +
                                '<span class="username">' +
                                    '<a href="#" id="nombre">' + response[a].nombre + '</a></span>' +
                              '</div>' +
                            '</div>'+
                            '<div class="row">' +
                                '<div class="col-lg-1 col-md-1">'+
                                    '<div class="box-footer box-comments">' +
                                      '<div class="box-comment">' +
                                        '<div class="comment-text">' +
                                            '<a href="" class="hora"><span class="text-muted pull-right">' + response[a].hora + '</span></a>' +
                                        '</div>' +
                                      '</div>' +
                                    '</div>' +
                                '</div>'; 
                }
                nombre_pelicula=response[a].nombre;
            });// final each
            if(nombre_pelicula != "" && html_code != ""){ html_code+= '</div></div>'; }
            Contenedor_Funciones.innerHTML += html_code;
        });//final ajax
    }//final function carga Datos
    
    
}); //final document