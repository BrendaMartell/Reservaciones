'use strict'

const Schema = use('Schema')

class MenusTableSchema extends Schema {

  up () {
    this.create('menus', table => {
        table.increments()
        table.varchar('nombre_producto',60)
        table.varchar('descripcion',130)
        table.float('precio')
        table.varchar('tipo_menu',50)
        table.varchar('imagen',400)
        table.timestamps()
    })
  }

  down () {
    this.drop('menus');
  }

}

module.exports = MenusTableSchema
