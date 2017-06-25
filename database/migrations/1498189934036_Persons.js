'use strict'

const Schema = use('Schema')

class PersonsTableSchema extends Schema {

  up () {
    this.create('people', (table) => {
        table.increments()
        table.varchar('nombres',30)
        table.varchar('apellidos',30)
        table.varchar('email',120)
        table.varchar('status',10)
        table.timestamps()
    })
  }

  down () {
    this.table('people', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = PersonsTableSchema
