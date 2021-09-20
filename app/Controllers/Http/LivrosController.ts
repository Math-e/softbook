import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluguel from 'App/Models/Aluguel'
import Livro from 'App/Models/Livro'


export default class LivrosController {
  public async index({ view, session, response }: HttpContextContract) {

    if (!session.get('usuario')){
      return response.redirect('/')
    }

    let livros = await Livro.all()

    return view.render('lista',{
      sessao: session.get('usuario'),
      livros: livros
      })
  }

  public async create({ }: HttpContextContract) {
  }

  public async store({ request, response, session }: HttpContextContract) {
    if(!session.get('usuario'))
      return response.redirect('/')
    const data = request.only(['titulo', 'autor', 'descricao', 'isbn'])
    const livro = await Livro.create(data)
    console.log(`/livros/${livro.id}`)
    return response.redirect('/livros/' + livro.id)
  }

  public async show({ params, session, response, view }: HttpContextContract) {

    if (!session.get('usuario'))
      return response.redirect('/')
    
    const livro = await Livro.findOrFail(params.id)
    let aluguel = await Aluguel.findBy('livro_id', livro.id)
    let hora = new Date().toISOString()
    return view.render('livro', {
      livro: livro, 
      aluguel: aluguel, 
      hora: hora.slice(0,19),
      sessao: session.get('usuario')})
  }

  public async edit({ }: HttpContextContract) {
  }

  public async update({ request, params }: HttpContextContract) {
    const livro = await Livro.findOrFail(params.id)
    const data = request.only(['titulo', 'autor', 'descricao', 'isbn'])

    livro.merge(data)
    await livro.save()

    return livro
  }

  public async destroy({ params, session, response }: HttpContextContract) {
    if (!session.get('usuario'))
      return response.redirect('/')

    const livro = await Livro.findOrFail(params.id)

    await livro.delete()

    return response.redirect('/livros')
  }
}
