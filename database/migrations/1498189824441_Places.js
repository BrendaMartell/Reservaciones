'use strict'

const Schema = use('Schema')

class PlacesTableSchema extends Schema {

  up () {
    this.create('places', (table) => {
        table.increments()
        table.varchar('localidad',2)
        table.integer('id_venta_detalle')
        table.timestamps()
    })
  }

  down () {
    this.table('places', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = PlacesTableSchema
