'use strict'

const Schema = use('Schema')

class RolesTableSchema extends Schema {

  up () {
    this.create('roles', table => {
        table.increments()
        table.varchar('nombre_rol',20).unique()
        table.varchar('baja',1)
        table.timestamps()
    });
  }

  down () {
    this.drop('roles');
  }

}

module.exports = RolesTableSchema
