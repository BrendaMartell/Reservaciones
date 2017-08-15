'use strict'

const Schema = use('Schema')

class RolesPersonasTableSchema extends Schema {

  up () {
    this.create('roles_personas', table => {
        table.increments()
        table.integer('personas_id')
        table.integer('roles_id')
        table.timestamps()
    })
  }

  down () {
    this.drop('roles_personas');
  }

}

module.exports = RolesPersonasTableSchema
