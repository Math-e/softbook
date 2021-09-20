import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Aluguel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column( )
  public usuario_id: number

  @column( )
  public livro_id: number

  @column.dateTime({ autoCreate: true })
  public inicio: DateTime

  @column()
  public fim: DateTime

}
