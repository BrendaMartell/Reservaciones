'use strict'

const Schema = use('Schema')

class DetailsSalesTableSchema extends Schema {

  up () {
    this.create('details_sales', (table) => {
        table.increments()
        table.integer('id_tipo_boleto')
        table.integer('cantidad')
        table.float('total')
        table.integer('id_venta')
        table.integer('id_funcion')
        table.timestamps()
    })
  }

  down () {
    this.table('details_sales', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = DetailsSalesTableSchema
