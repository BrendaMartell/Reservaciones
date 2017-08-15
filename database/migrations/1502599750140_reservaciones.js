'use strict'

const Schema = use('Schema')

class ReservacionesTableSchema extends Schema {

  up () {
    this.create('reservaciones', table => {
        table.increments()
        table.integer('users_id')
        table.integer('cantidad_personas')
        table.varchar('fecha',10)
        table.varchar('hora', 5)
        table.varchar('estado',15)
        table.timestamps()
    })
  }

  down () {
    this.drop('reservaciones');
  }

}

module.exports = ReservacionesTableSchema
