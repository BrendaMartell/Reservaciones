'use strict'

const Schema = use('Schema')

class FunctionsTableSchema extends Schema {

  up () {
    this.create('functions', (table) => {
        table.increments()
        table.varchar('fecha',10)
        table.varchar('hora',8)
        table.integer('id_pelicula')
        table.integer('id_sala')
        table.integer('id_tipo_funcion')
        table.integer('costo_adicional')
        table.timestamps()
    })
  }

  down () {
    this.table('functions', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = FunctionsTableSchema
