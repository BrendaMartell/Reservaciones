'use strict'

const Schema = use('Schema')

class MoviesTableSchema extends Schema {

    up () {
        this.create('movies', (table) => {
            table.increments()
            table.varchar('nombre',100).unique()
            table.integer('duracion')
            table.varchar('sinopsis',600)
            table.varchar('imagen', 150)
            table.varchar('video',500)
            table.varchar('clasificacion',5)
            table.timestamps()
        })
    }


    down () {
        this.table('movies', (table) => {
            // opposite of up goes here
        })
    }

}

module.exports = MoviesTableSchema
