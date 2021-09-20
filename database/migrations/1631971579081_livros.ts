import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Livros extends BaseSchema {
  protected tableName = 'livros'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.string('titulo')
      table.string('autor')
      table.text('descricao')
      table.string('isbn')
      table.unique(['isbn'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
