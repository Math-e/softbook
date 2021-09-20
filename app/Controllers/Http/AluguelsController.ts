import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluguel from 'App/Models/Aluguel'

export default class AluguelsController {
  public async index({ }: HttpContextContract) {
    const aluguels = await Aluguel.all()

    return aluguels
  }

  public async create({ }: HttpContextContract) {
  }

  public async store({ request, session, response }: HttpContextContract) {
    if (!session.get('usuario'))
      response.redirect('/')

    let data = request.only(['livro_id', 'usuario_id', 'fim'])
    //const user = session.get('usuario')
    //data.usuario_id = user.id

    await Aluguel.create(data)

    return response.redirect('/livros/' + data.livro_id)
  }

  public async show({ params }: HttpContextContract) {
    const aluguel = await Aluguel.findOrFail(params.id)

    return aluguel
  }

  public async edit({ }: HttpContextContract) {
  }

  public async update({ request, params }: HttpContextContract) {
    const aluguel = await Aluguel.findOrFail(params.id)
    const data = request.only(['aluguel_id', 'inicio', 'fim'])

    aluguel.merge(data)
    await aluguel.save()

    return aluguel
  }

  public async destroy({ params }: HttpContextContract) {
    const aluguel = await Aluguel.findOrFail(params.id)

    await aluguel.delete()

  }
}