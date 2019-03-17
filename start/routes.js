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
  return {
    greeting: 'Hello world in JSON'
  }
})

Route.post('licitacoes', 'LicitacaoController.getLicitacoes')
Route.post('licitacoes/:licitacoes_id', 'LicitacaoController.getLicitacao')
Route.post('licitacoes/itens/:licitacoes_id', 'LicitacaoController.getLicitacaoItens')


Route.post('materiais/detalhes/:materiais_id', 'MaterialController.getMaterialDetalhes')
Route.get('materiais/:id/:busca', 'MaterialController.index')
Route.get('servicos/:id/:busca', 'ServicoController.index')


Route.get('fornecedores/:id/:busca/:uf', 'FornecedorController.index')
Route.get('orgaos/:id/:busca/:uf', 'OrgaoController.index')
Route.get('unidades/:id/:busca/:orgaos_id', 'UnidadeController.index')
