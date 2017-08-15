'use strict'

const Schema = use('Schema')

class DetalleOrdenesTableSchema extends Schema {

  up () {
    this.create('detalle_ordenes', table => {
        table.increments()
        table.integer('ordenes_id')
        table.integer('menu_id')
        table.float('precio')
        table.integer('cantidad')
        table.float('total_platillo')
        table.varchar('comentarios',200)
        table.timestamps()
    })
  }

  down () {
    this.drop('detalle_ordenes');
  }

}

module.exports = DetalleOrdenesTableSchema
