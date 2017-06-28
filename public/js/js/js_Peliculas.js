$(document).ready(function(){
    var tab=document.getElementById('tbody');
    var Pnl_Registro=document.getElementById('Pnl_Registro');
    var Pnl_Tabla=document.getElementById('Pnl_Tabla');
    var id;
    $("#id").hide();
    $("#EnPantalla").text("Peliculas")
    var Movimiento ="";
    Carga_Datos("/all_pelicula");
    Deshabilita_Registro();
    
    
    
    $("#Btn_Registra").click(function(){
        $("#titulo_formulario").text("Registro Nueva Pelicula");
        Habilita_Registro();
        $("#alias").focus();
        Movimiento="Alta";
        $('#formulario').attr('action','/nvo_pelicula');
    });//final btin registra click
    
    $("#Btn_Cancela").click(function(){
        Deshabilita_Registro();
    });//final btin registra click
    
    $('#tbody').on('click', '.Btn_Editar', function(e) {
        e.preventDefault();
        $("#titulo_formulario").text("Edicion de Registro");
        $('#formulario').attr('action','/edit_pelicula');
        Movimiento="Editar"
        var id=$(this).attr("data-id");
        var valores="";
        var pelicula = [];
        pelicula.push(id);
        $(this).parents("tr").find("td").each(function(){
            pelicula.push($(this).html());
            valores+=$(this).html()+"\n";
        });
        Habilita_Registro();
        $("#id").val(id);
        document.getElementById('Foto').src = "/imagenes/"+pelicula[2];
        $("#nombre-imagen").val(pelicula[2]);
        $("#nombre").val(pelicula[3]);
        $("#sinopsis").val(pelicula[4]);
        $("#duracion").val(pelicula[5]);
        $("#clasificacion").val(pelicula[6]);
        $("#video").val(pelicula[7]);
        $("#nombre").focus();
    });
    
    function Habilita_Registro(){
        $("#Pnl_Registro").show();
        $("#Pnl_Tabla").hide();
    }
    
    function Deshabilita_Registro(){
        $("#Pnl_Registro").hide();
        $("#Pnl_Tabla").show();
    }
    
    function Carga_Datos(ruta){
        $.ajax({
             url:ruta,
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
                    
                '<td class="alias"><img class="img img-responsive" src="/imagenes/' + response[a].imagen +'" alt="User Image"></td>'+
                '<td class="alias" style="width:0">'+ response[a].imagen +'</td>'+
                '<td class="alias">'+ response[a].nombre +'</td>'+
                '<td class="alias">'+ response[a].sinopsis +'</td>'+
                '<td class="alias">'+ response[a].duracion +'</td>'+
                '<td class="alias">'+ response[a].clasificacion +'</td>'+
                '<td class="alias">'+ response[a].video +'</td>'+
                '<td class="Btn_Editar" data-id="'+ response[a].id +'"><button class="btn btn-primary" type="button"><i class="fa fa-edit"></i></button></td>'+
                '<td class="Btn_Baja"  data-id="'+ response[a].id +'"><button class="btn btn-danger" type="button"><i class="fa fa-trash"></i></button></td>'+
                '</tr>';
            });// final each
        });//final ajax
    }//final function carga Datos
});
