'use strict'

const Schema = use('Schema')

class OrdenesTableSchema extends Schema {

  up () {
    this.create('ordenes', table => {
        table.increments()
        table.integer('personas_id')
        table.integer('rol_personas_id')
        table.varchar('hora', 5)
        table.varchar('fecha',10)
        table.varchar('estado',15)
        table.timestamps()
    })
  }

  down () {
    this.drop('ordenes');
  }

}

module.exports = OrdenesTableSchema
