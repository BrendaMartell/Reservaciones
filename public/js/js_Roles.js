$(document).ready(function(){
    var tab=document.getElementById('tbody');
    var Pnl_Registro=document.getElementById('Pnl_Registro');
    var Pnl_Tabla=document.getElementById('Pnl_Tabla');
    $("#EnPantalla").text("Roles")
    var Movimiento ="";
    Carga_Datos("/all_roles");
    Deshabilita_Registro();
    
    
    
    $("#Btn_Registra").click(function(){
        $("#titulo_formulario").text("Registro de Nuevo Pedido");
        Habilita_Registro();
        Movimiento="Alta";
        LLena_Menu();
        
        $('#formulario').attr('action','/menu/roles/in');
    });//final btin registra click
    
    $("#Btn_Cancela").click(function(){
        Deshabilita_Registro();
    });//final btin registra click
    
    
    
    $('#tbody').on('click', '.Btn_Editar', function(e) {
        e.preventDefault();
        $("#titulo_formulario").text("Edicion de Registro");
        $('#formulario').attr('action','/edit_rol');
        Movimiento="Editar"
        var id=$(this).attr("id");
        var valores="";
        var rol = [];
        rol.push(id);
        $(this).parents("tr").find("td").each(function(){
            rol.push($(this).html());
            valores+=$(this).html()+"\n";
        });
        console.log(rol);
        Habilita_Registro();
        $("#id").val(rol[0]);
        $("#nombre_rol").val(rol[1]);
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
             data:"/all_roles",
             datatype:'json'
         }).done(function(response){
            $.each(response,function(a,b){
                console.log(response)
                tab.innerHTML +=
                '<tr  role="row" class="odd" id="'+ response[a].id +'">'+
                '<td class="nombre_rol">'+ response[a].nombre_rol +'</td>'+
                '<td class="Btn_Editar"  id="'+ response[a].id +'"><button class="btn btn-primary" type="button"><i class="fa fa-edit"></i></button></td>'+
                '</tr>';
            });// final each
        });//final ajax
    }//final function carga Datos
});