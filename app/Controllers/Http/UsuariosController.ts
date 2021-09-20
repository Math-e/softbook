import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import Hash from '@ioc:Adonis/Core/Hash'
import Session from '@ioc:Adonis/Addons/Session'



export default class UsuariosController {
  public async index({ }: HttpContextContract) {
    const usuarios = await Usuario.all()

    return usuarios
  }

  public async create({ }: HttpContextContract) {
  }

  public async store({ request }: HttpContextContract) {
    try{
    const data = request.only(['apelido', 'senha'])

    const usuario = await Usuario.create(data)

    async ({ session }) => {
      Session.create
      session.put('usuario', usuario)
    }

    async ({ view }) => {
      return view.render('home')
    }

    }
    catch(e){
      if (e.errno == 19)
        return {
          status: 401,
          message: "Usuário com este apelido já existe"
        }
    }
  }
  

  public async show({ params }: HttpContextContract) {
    const usuario = await Usuario.findOrFail(params.id)

    return usuario
  }

  public async login({ request, response, session }: HttpContextContract) {

    const data = request.only(['apelido', 'senha'])
    const usuario = await Usuario.findByOrFail('apelido', data.apelido)

    if (await Hash.verify(usuario.senha, data.senha)){
      await session.put('usuario', usuario)


    response.redirect().toPath('/')

  }
    else
      return null
  }

  public async logout({response, session}: HttpContextContract){
    session.clear()
    response.redirect().toPath('/')
  }


  public async edit({ }: HttpContextContract) {
  }

  public async update({ request, params }: HttpContextContract) {
    const usuario = await Usuario.findOrFail(params.id)
    const data = request.only(['apelido', 'senha'])

    usuario.merge(data)
    await usuario.save()

    return usuario
  }

  public async destroy({ params }: HttpContextContract) {
    const usuario = await Usuario.findOrFail(params.id)

    await usuario.delete()

  }
}
