/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'


Route.get('/', async ({ view, session, response }) => {
  if (session.get('usuario'))
    return response.redirect('/livros')
  else
    return view.render('home', {sessao: session.get('usuario')})
})


//Route.resource('/livros', 'LivrosController').apiOnly()
Route.put('/livros', 'LivrosController.store')
Route.get('/livros', 'LivrosController.index')
Route.get('/livros/:id', 'LivrosController.show' )
Route.get('/novolivro', async({view, session, response})=> {
  if (!session.get('usuario'))
    return response.redirect('/')
  else
    return view.render('novo-livro', {sessao: session.get('usuario')})
})

Route.delete('/livros/:id', 'LivrosController.destroy')

Route.put('aluguel', 'AluguelsController.store')




Route.post('/login', 'UsuariosController.login')
Route.get('/logout', 'UsuariosController.logout')

//Route.put('/registro', 'UsuariosController.store')