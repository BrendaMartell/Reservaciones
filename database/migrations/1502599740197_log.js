'use strict'

const Schema = use('Schema')

class LogTableSchema extends Schema {

  up () {
    this.create('log', table => {
        table.increments()
        table.varchar('movimiento',15)
        table.varchar('fecha',10)
        table.varchar('hora',5)
        table.varchar('tipo_movimiento', 15)
        table.integer('rol_persona')
        table.timestamps()
    })
  }

  down () {
    this.drop('log');
  }

}

module.exports = LogTableSchema
