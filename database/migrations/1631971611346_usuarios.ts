import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Usuarios extends BaseSchema {
  protected tableName = 'usuarios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.string('apelido')
      table.unique(['apelido'])
      table.string('senha')
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
