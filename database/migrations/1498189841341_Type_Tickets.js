'use strict'

const Schema = use('Schema')

class TypeTicketsTableSchema extends Schema {

  up () {
    this.create('type_tickets', (table) => {
        table.increments()
        table.float('costo')
        table.varchar('descripcion',30)
        table.timestamps()
    })
  }

  down () {
    this.table('type_tickets', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = TypeTicketsTableSchema
