$(document).ready(function(){
    var tab=document.getElementById('tbody');
    var Pnl_Registro=document.getElementById('Pnl_Registro');
    var Pnl_Tabla=document.getElementById('Pnl_Tabla');
    $("#EnPantalla").text("Clientes")
    var Movimiento ="";
    Carga_Datos("/all_ctes");
    Deshabilita_Registro();
    
    function LimpiaCampos(){
        $("#id_persona").val("");
        $("#nombre").val("");
        $("#a_paterno").val("");
        $("#a_materno").val("");
        $("#direccion").val("");
        $("#telefono").val("");
        $("#email").val("");
        $("#password").val("");
    }
    
    $("#Btn_Registra").click(function(){
        $("#titulo_formulario").text("Registro de Nuevo Cliente");
        Habilita_Registro();
        $("#nombres").focus();
        $("#pwd").show();
        Movimiento="Alta";
        $('#formulario').attr('action','/menu/cte/in');
        LimpiaCampos();
    });//final btin registra click
    
    $("#Btn_Cancela").click(function(){
        Deshabilita_Registro();
    });//final btin registra click
    
    
    
    $('#tbody').on('click', '.Btn_Editar', function(e) {
        e.preventDefault();
        LimpiaCampos();
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
        console.log(empleado);
        Habilita_Registro();
        $("#id_persona").val(empleado[0]);
        $("#nombre").val(empleado[1]);
        $("#a_paterno").val(empleado[2]);
        $("#a_materno").val(empleado[3]);
        $("#direccion").val(empleado[4]);
        $("#telefono").val(empleado[5]);
        $("#email").val(empleado[6]);
        $("#password").val("********");
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
             data:"/all_ctes",
             datatype:'json'
         }).done(function(response){
            tab.innerHTML ="";
            $.each(response,function(a,b){
                console.log(response)
                tab.innerHTML +=
                '<tr  role="row" class="odd" id="'+ response[a].personas_id +'">'+
                '<td class="nombres">'+ response[a].nombre +'</td>'+
                '<td class="a_paterno">'+ response[a].a_paterno +'</td>'+
                '<td class="a_materno">'+ response[a].a_materno +'</td>'+
                '<td class="telefono">'+ response[a].direccion +'</td>'+
                '<td class="telefono">'+ response[a].telefono +'</td>'+
                '<td class="email">'+ response[a].email +'</td>'+
                '<td class="Btn_Editar"  id="'+ response[a].personas_id +'"><button class="btn btn-primary" type="button"><i class="fa fa-edit"></i></button></td>'+
                '</tr>';
            });// final each
        });//final ajax
    }//final function carga Datos
});