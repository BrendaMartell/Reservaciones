'use strict'

const Schema = use('Schema')

class LogsTableSchema extends Schema {

  up () {
    this.create('logs', table => {
        table.increments()
        table.varchar('movimiento',15)
        table.varchar('fecha',10)
        table.varchar('hora',5)
        table.varchar('tipo_movimiento', 15)
        table.integer('rol_persona')
        table.integer('id_movimiento')
        table.timestamps()
    })
  }

  down () {
    this.drop('logs');
  }

}

module.exports = LogsTableSchema
