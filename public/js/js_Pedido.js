$(document).ready(function(){
    const io = ws('');
	const cliente = io.channel('Pedidos').connect(function(error, connected){});
    
    var tab=document.getElementById('tbody_menu');
    var tab_orden=document.getElementById('tbody_orden');
    var Pnl_Registro=document.getElementById('Pnl_Registro');
    var Pnl_Tabla=document.getElementById('Pnl_Tabla');
    $("#EnPantalla").text("Nuevo Pedido")
    var Movimiento ="";
    Carga_Datos("/all_pedidos");
    Deshabilita_Registro();
    
     function Llena_Menu(){
        $.ajax({
             url:"/all_menu",
             type:'post',
             data:"",
             datatype:'json'
         }).done(function(response){
            $.each(response,function(a,b){
                $("#id").val(response[a].id);
                tab.innerHTML +=
                '<tr  role="row" class="odd" id="'+ response[a].id +'" attr="'+ response[a].id +'">'+
                '<td class="alias" style="width: 180px;">'+ response[a].nombre_producto +'</td>'+
                '<td class="alias" style="width: 50px; text-align: right;">'+ response[a].precio +'</td>'+
               // '<td class="alias" style="width: 90px;"><input style="width: 60px;" type="number" class="Cantidad'+ response[a].id +' form-control"/></td>'+
                '<td class="Btn_Agregar" data-id="'+ response[a].id +'"><button class="btn btn-primary" type="button"><i class="glyphicon glyphicon-plus" style="width: 20px;"></i></button></td>'+
                '</tr>';
            });// final each
        });//final ajax
    }//final function carga Datos
    
    $("#Btn_Registra").click(function(){
        $("#titulo_formulario").text("Registro de Nuevo Pedido");
        Habilita_Registro();
        Llena_Menu();
        Movimiento="Alta";
        //$('#formulario').attr('action','/nvo_pedido');
    });//final btin registra click
    
    $("#Btn_Cancela").click(function(){
        Deshabilita_Registro();
    });//final btin registra click
    
    function Hora(){
        var Digital=new Date();
        var hours=Digital.getHours();
        var minutes=Digital.getMinutes();
        var seconds=Digital.getSeconds();
        var dn="AM";
        if (hours>12){
        dn="PM";
        hours=hours-12;
        }
        if (hours==0)
        hours=12;
        if (minutes<=9)
        minutes="0"+minutes;
        if (seconds<=9)
        seconds="0"+seconds;
        return hours + ":" + minutes;
    }
    
    function Fecha(){
        var Mes = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", 
        "Octubre", "Noviembre", "Diciembre");
        var Hoy = new Date();
        var Anio = Hoy.getFullYear();
        var FechaHoy=Anio + "/" + Mes[Hoy.getMonth()] + "/" + Hoy.getDate();
        return FechaHoy;
    }
    
    $("#Btn_Guardar").click(function(e){
        e.preventDefault();
        var Detalle_orden = {
            'detalle': [],
            'ordenes_id': ""
        };
        var Orden ={
            'hora':Hora(),
            'fecha':Fecha(),
            'estado':"SOLICITUD",
            'personas_id': '{{ currentUser.id }}',
            'rol_personas_id': 5
        };
        
        for (var i = 0; i < tab_orden.rows.length; i++){
            columnas = tab_orden.rows[i].getElementsByTagName('td');
            var id=columnas.name;
            Detalle_orden.detalle.push(
            {
                "menu_id": "id", 
                "precio": parseFloat(columnas[1].innerHTML), 
                "cantidad": parseInt(columnas[2].innerHTML), 
                "total_platillo": parseFloat(columnas[3].innerHTML)
            });
        }
        
        console.log(Orden);
        console.log(Movimiento);
        if (Movimiento=="Alta"){
             $.ajax({
                 url:"/nvo_pedido",
                 type:'post',
                 data:Orden,
                 datatype:'json'
             }).done(function(response){
                $.each(response,function(a,b){
                    console.log(response[a].id); 
                });// final each
            });//final ajax
        }  //final iff alta
    })
    
    $('#tbody').on('click', '.Btn_Editar', function(e) {
        e.preventDefault();
        $("#titulo_formulario").text("Edicion de Pedido");
        $('#formulario').attr('action','/edit_pedido');
        //Movimiento="Editar"
        var id=$(this).attr("id");
        var valores="";
        var pedido = [];
        pedido.push(id);
        $(this).parents("tr").find("td").each(function(){
            pedido.push($(this).html());
            valores+=$(this).html()+"\n";
        });
        console.log(pedido);
        Habilita_Registro();
      /*  $("#id_persona").val(empleado[0]);
        $("#nombre").val(empleado[1]);
        $("#a_paterno").val(empleado[2]);
        $("#a_materno").val(empleado[3]);
        $("#direccion").val(empleado[4]);
        $("#telefono").val(empleado[5]);
        $("#email").val(empleado[6]);
        $("#password").val("********");
        $(".pwd").hide()*/
    });
    
      $('#tbody_menu').on('click', '.Btn_Agregar', function(e) {
        e.preventDefault();
        var id=$(this).attr("data-id");
        var valores="";
        var pedido = [];
        pedido.push(id);
          var cont =0;
        $(this).parents("tr").find("td").each(function(e){
            cont+=1;
            pedido.push($(this).html());
            valores+=$(this).html()+"\n";
        });
          
        var cantidad=1;
        var total=1*parseFloat(pedido[2]);
        var totaltotal=0;
        var total_platillo=0;
        var existe=false;
          
        for (var i = 0; i < tab_orden.rows.length; i++){
            columnas = tab_orden.rows[i].getElementsByTagName('td');
            if (columnas[0].innerHTML == pedido[1]){
                existe=true;
                cantidad=parseInt(columnas[2].innerHTML)+1;
                total=parseInt(cantidad)*pedido[2];
                columnas[2].innerHTML=cantidad;
                columnas[3].innerHTML=total;
            }
            totaltotal+=parseFloat(columnas[3].innerHTML);
        }
        
        Habilita_Registro();
        if(existe==false){
        totaltotal+=1*parseFloat(pedido[2]);
            tab_orden.innerHTML +=
            '<tr  role="row" class="odd" name="' + pedido[0] + '" id="'+ pedido[0] +'" data-identificador="' + pedido[0] + '">'+
            '<td class="alias" style="width: 180px;">'+ pedido[1] +'</td>'+
            '<td class="alias" style="width: 50px; text-align: right;">'+ pedido[2]+'</td>'+
            '<td class="alias" style="width: 50px; text-align: right;">'+ cantidad +'</td>'+
            '<td class="alias" style="width: 50px; text-align: right;">'+ total +'</td>'+
            '<td class="Btn_Agregar" data-id="'+ pedido[0] + '"><button class="btn btn-primary" type="button"><i class="fa fa-trash" style="width: 20px;"></i></button></td>'+
            '</tr>';
        }
        $("#Total").html("Total:          " + totaltotal.toString());
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
             data:"/all_pedidos",
             datatype:'json'
         }).done(function(response){
            $.each(response,function(a,b){
                console.log(response)
                tab.innerHTML +=
                '<tr  role="row" class="odd" id="'+ response[a].id +'">'+
                '<td class="fecha">'+ response[a].fecha +'</td>'+
                '<td class="hora">'+ response[a].hora +'</td>'+
                '<td class="estado">'+ response[a].estado +'</td>'+
                '<td class="Btn_Editar"  id="'+ response[a].id +'"><button class="btn btn-primary" type="button"><i class="fa fa-edit"></i></button></td>'+
                '</tr>';
            });// final each
        });//final ajax
    }//final function carga Datos
});