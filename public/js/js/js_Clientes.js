$(document).ready(function(){
    var tab=document.getElementById('tbody');
    var Pnl_Registro=document.getElementById('Pnl_Registro');
    var Pnl_Tabla=document.getElementById('Pnl_Tabla');
    $("#EnPantalla").text("Clientes")
    var Movimiento ="";
    Carga_Datos("/all_ctes");
    Deshabilita_Registro();
    
    
    
    $("#Btn_Registra").click(function(){
        $("#titulo_formulario").text("Registro de Nuevo Cliente");
        Habilita_Registro();
        $("#nombres").focus();
        $("#pwd").show();
        Movimiento="Alta";
        $('#formulario').attr('action','/nvo_cte');
    });//final btin registra click
    
    $("#Btn_Cancela").click(function(){
        Deshabilita_Registro();
    });//final btin registra click
    
    
    
    $('#tbody').on('click', '.Btn_Editar', function(e) {
        e.preventDefault();
        $("#titulo_formulario").text("Edicion de Registro");
        $('#formulario').attr('action','/edit_cte');
        Movimiento="Editar"
        var id=$(this).attr("id");
        var valores="";
        var empleado = [];
        empleado.push(id);
        $(this).parents("tr").find("td").each(function(){
            empleado.push($(this).html());
            valores+=$(this).html()+"\n";
        });
        Habilita_Registro();
        $("#id_persona").val(empleado[0]);
        $("#nombres").val(empleado[1]);
        $("#apellidos").val(empleado[2]);
        $("#numero_aut").val(empleado[3]);
        $("#email").val(empleado[4]);
        $("#password").val("*******");
        $(".pwd").hide()
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
                tab.innerHTML +=
                '<tr  role="row" class="odd" id="'+ response[a].id_persona +'">'+
                '<td class="nombres">'+ response[a].nombres +'</td>'+
                '<td class="apellidos">'+ response[a].apellidos +'</td>'+
                '<td class="numero">'+ response[a].numero_aut +'</td>'+
                '<td class="email">'+ response[a].email +'</td>'+
                '<td class="Btn_Editar"  id="'+ response[a].id_persona +'"><button class="btn btn-primary" type="button"><i class="fa fa-edit"></i></button></td>'+
                '</tr>';
            });// final each
        });//final ajax
    }//final function carga Datos
});
