$(document).ready(function(){
    var tab=document.getElementById('tbody');
    var Pnl_Registro=document.getElementById('Pnl_Registro');
    var Pnl_Tabla=document.getElementById('Pnl_Tabla');
    var id;
    $("#id").hide();
    $("#EnPantalla").text("Funciones")
    var Movimiento ="";
    Carga_Datos();
    Deshabilita_Registro();
    PeliculasCartelera();
    TiposFuncion();
    SalasDisponibles($('#id_tipo_funcion option:selected').text());
    
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
    
    
    function seleccionar(texto,componente) {
       var combo = document.getElementById( componente );
       var cantidad = combo.length;
        console.log(componente + " " + cantidad +" "+texto);
       for (i = 0; i < cantidad; i++) {
          if (combo.options[i].text == texto) {
              combo.options[i].selected = true;
              break;
          }   
       }
    }
    
    function SalasDisponibles(tipofuncion){
        $.ajax({
            url:'/SalasDisp',
            data:{  tipo:tipofuncion },
            type:'post'
        }).done(function(response){
            $.each(response,function(a,b){
                console.log(response[a]);
                $('#id_sala').append('<option value="' + response[a].id+'">' + response[a].alias+ ": " + response[a].tipo + '</option>');
                $("#capacidad").val(response[a].capacidad);
            })
        });
    }
    
    
    function PeliculasCartelera(){
        $.ajax({
            url:'/EnCartelera',
            data:"",
            type:'post'
        }).done(function(response){
            $.each(response,function(a,b){
                console.log(response[a]);
            
                $('#id_pelicula').append('<option value="' + response[a].id+'">'+response[a].nombre + '</option>');
                document.getElementById('imagen_pelicula').src = "/imagenes/" + response[a].imagen;
                $("#duracion").val(response[a].duracion);
            })
        });
    }
    
    function TiposFuncion(){
        $.ajax({
            url:'/all_tpofnes',
            data:"",
            type:'post'
        }).done(function(response){
            $.each(response,function(a,b){
                console.log(response[a]);
            
                $('#id_tipo_funcion').append('<option value="' + response[a].id+'">'+response[a].descripcion + '</option>');
            })
        });
    }
    
    function Carga_Datos(){
        $.ajax({
             url:'all_fnes',
             type:'post',
             data:"",
             datatype:'json'
         }).done(function(response){
            $.each(response,function(a,b){
                /*var estado="";
                var color;
                if(response[a].estado =="A"){
                   estado="Activo"
                    color="";
                }else{
                    estado="Inactivo"
                    color=' style="background:lightcoral "';
                }*/
                $("#id").val(response[a].id);
                tab.innerHTML +=
                '<tr  role="row" class="odd" id="'+ response[a].id +'">'+
                '<td class="fecha">'+ response[a].fecha +'</td>'+
                '<td class="hora">'+ response[a].hora +'</td>'+
                '<td class="hora_termino">'+ response[a].hora_termino +'</td>'+
               // '<td class="id_pelcula" style="width:0px">'+ response[a].id_pelicula +'</td>'+
                '<td class="nombre">'+ response[a].nombre +'</td>'+
               // '<td class="idsala" style="width:0px">'+ response[a].id_sala +'</td>'+
                '<td class="aliasala">'+ response[a].alias + ": " + response[a].tipo +'</td>'+
              //  '<td class="tipofuncion" style="width:0px">'+ response[a].id_tipo_funcion +'</td>'+
                '<td class="capacidad">'+ response[a].capacidad +'</td>'+
                '<td class="descripciontipofuncon">'+ response[a].tipo +'</td>'+
                '<td class="costoadicional">'+ response[a].costo_adicional +'</td>'+
                '<td class="Btn_Editar" data-id="'+ response[a].id +'"><button class="btn btn-primary" type="button"><i class="fa fa-edit"></i></button></td>'+
                '</tr>';
            });// final each
        });//final ajax
    }//final function carga Datos
    
    
}); //final document