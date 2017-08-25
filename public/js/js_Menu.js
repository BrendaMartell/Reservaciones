$(document).ready(function(){
    var tab=document.getElementById('tbody');
    var Pnl_Registro=document.getElementById('Pnl_Registro');
    var Pnl_Tabla=document.getElementById('Pnl_Tabla');
    var id;
    $("#id").hide();
    $("#EnPantalla").text("Menu")
    var Movimiento ="";
    Carga_Datos("/all_menu");
    Deshabilita_Registro();
    
    
    
    $("#Btn_Registra").click(function(){
        $("#titulo_formulario").text("Registro Nuevo Producto en Menu");
        Habilita_Registro();
        $("#nombre_producto").focus();
        Movimiento="Alta";
        $('#formulario').attr('action','/menu/menu/in');
    });//final btin registra click
    
    $("#Btn_Cancela").click(function(){
        Deshabilita_Registro();
    });//final btin registra click
    
    $('#tbody').on('click', '.Btn_Editar', function(e) {
        e.preventDefault();
        $("#titulo_formulario").text("Edicion de Registro");
        $('#formulario').attr('action','/edit_menu');
        Movimiento="Editar"
        var id=$(this).attr("data-id");
        var valores="";
        var opmenu = [];
        opmenu.push(id);
        $(this).parents("tr").find("td").each(function(){
            opmenu.push($(this).html());
            valores+=$(this).html()+"\n";
        });
        Habilita_Registro();
        $("#id").val(id);
        console.log(opmenu);
        document.getElementById('Foto').src = "/imagenes/"+opmenu[2];
        $("#nombre-imagen").val(opmenu[2]);
        $("#nombre_producto").val(opmenu[3]);
        $("#descripcion").val(opmenu[4]);
        $("#precio").val(opmenu[5]);
        seleccionar(opmenu[6],"tipo_menu");
        $("#nombre_producto").focus();
    });
    
    function Habilita_Registro(){
        $("#Pnl_Registro").show();
        $("#Pnl_Tabla").hide();
    }
    
    function Deshabilita_Registro(){
        $("#Pnl_Registro").hide();
        $("#Pnl_Tabla").show();
    }
    
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
    
    function Carga_Datos(ruta){
        $.ajax({
             url:ruta,
             type:'post',
             data:"",
             datatype:'json'
         }).done(function(response){
            $.each(response,function(a,b){
                $("#id").val(response[a].id);
                tab.innerHTML +=
                '<tr  role="row" class="odd" id="'+ response[a].id +'">'+
                    
                '<td class="alias"><img class="img img-responsive" style="width:100px; Height:70px" src="/imagenes/' + response[a].imagen +'" alt="User Image"></td>'+
                '<td class="alias" style="width:0">'+ response[a].imagen +'</td>'+
                '<td class="alias">'+ response[a].nombre_producto +'</td>'+
                '<td class="alias">'+ response[a].descripcion +'</td>'+
                '<td class="alias">'+ response[a].precio +'</td>'+
                '<td class="alias">'+ response[a].tipo_menu +'</td>'+
                '<td class="Btn_Editar" data-id="'+ response[a].id +'"><button class="btn btn-primary" type="button"><i class="fa fa-edit"></i></button></td>'+
                '<td class="Btn_Baja"  data-id="'+ response[a].id +'"><button class="btn btn-danger" type="button"><i class="fa fa-trash"></i></button></td>'+
                '</tr>';
            });// final each
        });//final ajax
    }//final function carga Datos
});