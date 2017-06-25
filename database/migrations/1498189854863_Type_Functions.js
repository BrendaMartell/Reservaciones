'use strict'

const Schema = use('Schema')

class TypeFunctionsTableSchema extends Schema {

  up () {
    this.create('type_functions', (table) => {
        table.increments()
        table.varchar('descripcion',30)
        table.timestamps()
    })
  }

  down () {
    this.table('type_functions', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = TypeFunctionsTableSchema
