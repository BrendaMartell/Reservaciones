'use strict'

const Funcion = use('App/Model/Function')
const Database = use('Database')

class FuncionsController {

    
    * imagenesPelicula(request,response){
        const imagenes = yield Database.table('movies').join('functions','movies.id','=','functions.id_pelicula').select('imagen')
        yield response.json(imagenes)
    }
}

module.exports = FuncionsController
