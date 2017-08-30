'use strict'

const Menu = use("App/Model/Menus")
const Validator=use("Validator")
const Helpers = use('Helpers')

class MenuController {
    * insert(request,response){
        const data=request.all();
        const imagen=request.file('imagen');
        var nombre_archivo = "nodispobible.png"
        console.log(data);
        if(imagen.file.size != 0){
            nombre_archivo = imagen.file.name
        }
        console.log(nombre_archivo)
        yield imagen.move(Helpers.publicPath('imagenes'), nombre_archivo);
        const validacion = yield Validator.validate(data,Menu.validaciones)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            console.log(data)
            const menu=new Menu();
            menu.nombre_producto=data.nombre_producto;
            menu.descripcion=data.descripcion;
            menu.precio=data.precio;
            menu.tipo_menu=data.tipo_menu;
            menu.imagen=nombre_archivo;
            const insercion=yield menu.save()
            if(insercion==true){
                yield response.redirect('/cat_menu')
            }else{
                yield response.send('Hubo un error al registrar, intentelo de nuevo.')
            }
        }
    }
    
    * update(request,response){
        const data=request.all();
        const imagen=request.file('imagen');
        var nombre_archivo = data.nombre_imagen
        if(imagen.file.size != 0){
            nombre_archivo = imagen.file.name
        }
        if(nombre_archivo != data.nombre_imagen){
            yield imagen.move(Helpers.publicPath('imagenes'), nombre_archivo);
            if(!imagen.moved()){
               yield response.send("Error al subir")
            }
        }
        const validacion = yield Validator.validate(data,Menu.validaciones)
        const menu=yield Menu.findBy('id', data.id);
        menu.nombre_producto=data.nombre_producto;
        menu.descripcion=data.descripcion;
        menu.precio=data.precio;
        menu.tipo_menu=data.tipo_menu;
        menu.imagen=nombre_archivo;
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            yield menu.save()
            yield response.redirect('/cat_menu')
        }
    }
    
    * descarga(request, response){
        const data=request.params();
        response.download(Helpers.publicPath("imagenes/"+data.Nombre));
    }
    
    * all_app(request,response){
        const menu=yield Menu.all();
        console.log(menu)
        yield response.json({menus:menu})
    }
    
    * all(request,response){
        const menu=yield Menu.all();
        console.log(menu)
        yield response.json(menu);
    }
}

module.exports = MenuController
