import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Aluguels extends BaseSchema {
  protected tableName = 'aluguels'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.integer('usuario_id')
      table.foreign('usuario_id').references('usuarios.id').onDelete('CASCADE')
      table.integer('livro_id')
      table.foreign('livro_id').references('livros.id').onDelete('CASCADE')
      table.dateTime('inicio')
      table.dateTime('fim')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
