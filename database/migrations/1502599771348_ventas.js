'use strict'

const Schema = use('Schema')

class VentasTableSchema extends Schema {

  up () {
    this.create('ventas', table => {
        table.increments()
        table.integer('ordenes_id')
        table.integer('personas_id')
        table.integer('rol_personas_id')
        table.float('total')
        table.varchar('hora', 5)
        table.varchar('fecha',10)
        table.timestamps()
    })
  }

  down () {
    this.drop('ventas');
  }

}

module.exports = VentasTableSchema
