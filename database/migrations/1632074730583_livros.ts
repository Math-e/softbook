import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Livros extends BaseSchema {
  protected tableName = 'livros'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.unique(['isbn'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
