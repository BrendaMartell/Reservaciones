$(document).ready(function(){
    var tab=document.getElementById('tbody');
    var Pnl_Registro=document.getElementById('Pnl_Registro');
    var Pnl_Tabla=document.getElementById('Pnl_Tabla');
    Carga_Datos();
    Deshabilita_Registro();
    
    $("#Btn_Registra").click(function(){
        Habilita_Registro();
        $("#nombres").focus();
    });//final btin registra click
    
    $("#Btn_Cancela").click(function(){
        Deshabilita_Registro();
    });//final btin registra click
    
    $('#tbody').on('click', '.odd', function(e) {
        e.preventDefault();
        var id=$(this).attr("id");
        var valores="";
        var empleado = [];
        empleado.push(id);
        $(this).find("td").each(function(){
            empleado.push($(this).html());
            valores+=$(this).html()+"\n";
        });
        Habilita_Registro();
        $("#nombres").val(empleado[1]);
        $("#apellidos").val(empleado[2]);
        $("#numero_aut").val(empleado[3]);
        $("#email").val(empleado[4]);
        $("#password").val("*******");
        alert(valores);
    });
    
    function Habilita_Registro(){
        $("#Pnl_Registro").show();
        $("#Pnl_Tabla").hide();
    }
    
    function Deshabilita_Registro(){
        $("#Pnl_Registro").hide();
        $("#Pnl_Tabla").show();
    }
    
    function Carga_Datos(){
        $.ajax({
             url:'/all_ctes',
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
                '</tr>';
            });// final each
        });//final ajax
    }//final function carga Datos
});
