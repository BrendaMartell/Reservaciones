$(document).ready(function(){
    var tab=document.getElementById('tbody');
    var Pnl_Registro=document.getElementById('Pnl_Registro');
    var Pnl_Tabla=document.getElementById('Pnl_Tabla');
    var id;
    $("#id").hide();
    $("#EnPantalla").text("Tipos de Boleto")
    var Movimiento ="";
    Carga_Datos("/all_tpoboleto");
    Deshabilita_Registro();
    
    
    
    $("#Btn_Registra").click(function(){
        $("#titulo_formulario").text("Registro Nuevo Tipo de Boleto");
        Habilita_Registro();
        $("#descripcion").focus();
        Movimiento="Alta";
        $('#formulario').attr('action','/nvo_tpoboleto');
    });//final btin registra click
    
    $("#Btn_Cancela").click(function(){
        Deshabilita_Registro();
    });//final btin registra click
    
    
    
    $('#tbody').on('click', '.Btn_Editar', function(e) {
        e.preventDefault();
        $("#titulo_formulario").text("Edicion de Registro");
        $('#formulario').attr('action','/edit_tpoboleto');
        Movimiento="Editar"
        var id=$(this).attr("data-id");
        var valores="";
        var tpofuncion = [];
        tpofuncion.push(id);
        $(this).parents("tr").find("td").each(function(){
            tpofuncion.push($(this).html());
            valores+=$(this).html()+"\n";
        });
        Habilita_Registro();
        $("#id").val(id);
        $("#descripcion").val(tpofuncion[1]);
        $("#costo").val(tpofuncion[2]);
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
                '<td class="descripcion">'+ response[a].descripcion +'</td>'+
                '<td class="costo">'+ response[a].costo +'</td>'+
                '<td class="Btn_Editar" data-id="'+ response[a].id +'"><button class="btn btn-primary" type="button"><i class="fa fa-edit"></i></button></td>'+
                '<td class="Btn_Baja"  data-id="'+ response[a].id +'"><button class="btn btn-danger" type="button"><i class="fa fa-trash"></i></button></td>'+
                '</tr>';
            });// final each
        });//final ajax
    }//final function carga Datos
});
