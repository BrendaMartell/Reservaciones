'use strict'

const Schema = use('Schema')

class MenuTableSchema extends Schema {

  up () {
    this.create('menu', table => {
        table.increments()
        table.varchar('nombre_producto',60)
        table.varchar('descripcion',130)
        table.float('precio')
        table.varchar('tipo_menu',50)
        table.timestamps()
    })
  }

  down () {
    this.drop('menu');
  }

}

module.exports = MenuTableSchema
