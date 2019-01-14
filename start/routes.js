'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('/sync/licitacoes', 'SyncDataController.licitacoes')
Route.get('/sync/itens', 'SyncDataController.itens')

Route.get('/licitacoes/:unidade/:data_min/:data_max', 'LicitacaoController.index')
Route.get('/licitacoes/:numero', 'LicitacaoController.show')
Route.get('/orgaos', 'OrgaoController.index')
Route.get('/unidades/:orgao', 'UnidadeController.index')
Route.get('/itens/:material/:servico', 'ItemController.index')