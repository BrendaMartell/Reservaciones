'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('users', table => {
      table.increments()
      table.integer('id_persona').notNullable()
      table.integer('id_rol').notNullable()
      table.varchar('numero_aut',10).notNullable()
      table.varchar('password', 200).notNullable()
      table.varchar('estado', 200).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema
