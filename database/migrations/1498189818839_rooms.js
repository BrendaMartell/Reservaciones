'use strict'

const Schema = use('Schema')

class RoomsTableSchema extends Schema {

  up () {
    this.create('rooms', (table) => {
        table.increments()
        table.string('alias', 50)
        table.string('tipo',20)
        table.integer('capacidad')
        table.timestamps()
    })
  }

  down () {
    this.table('rooms', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = RoomsTableSchema
