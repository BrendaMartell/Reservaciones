'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('users', table => {
      table.increments()
      table.varchar('nombre', 30)
      table.varchar('a_paterno', 30)
      table.varchar('a_materno', 30)
      table.varchar('direccion', 150)
      table.varchar('colonia', 150)
      table.varchar('telefono', 15)
      table.varchar('email', 254).notNullable().unique()
      table.varchar('password', 200)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema
