'use strict'

const Schema = use('Schema')

class SalesTableSchema extends Schema {

  up () {
    this.create('sales', (table) => {
        table.increments()
        table.varchar('fecha',10)
        table.varchar('hora',8)
        table.integer('cantidad')
        table.float('total_venta')
        table.integer('id_empleado')
        table.timestamps()
    })
  }

  down () {
    this.table('sales', (table) => {
      // opposite ofs up goes here
    })
  }

}

module.exports = SalesTableSchema
