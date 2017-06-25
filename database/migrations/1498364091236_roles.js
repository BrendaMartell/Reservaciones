'use strict'

const Schema = use('Schema')

class RolesTableSchema extends Schema {

  up () {
    this.create('roles', (table) => {
        table.increments()
        table.varchar('descripcion',50).notNullable()
        table.timestamps()
    })
  }

  down () {
    this.table('roles', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = RolesTableSchema
