'use strict'

const Database = use('Database')
const Licitacao = use('App/Models/Licitacao')
const Item = use('App/Models/Item')

class LicitacaoController {
  async index({ request, response, params }) {
    let filtro = request.all()
    let licitacoes = await Licitacao.query()
      .distinct('licitacoes.*')
      .select('licitacoes.*')
      .join('itens', 'itens.licitacoes_id', 'licitacoes.id')
      .join('fornecedores', 'itens.fornecedores_id', 'fornecedores.id')
      .join('unidades', 'licitacoes.unidades_id', 'unidades.id')
      .join('orgaos', 'unidades.orgaos_id', 'orgaos.id')
      .where(function () {
        // filtro data da licitacao
        if (filtro.licitacao.data[0] != 0 && filtro.licitacao.data[1] != 0) {
          this.whereBetween('licitacoes.data', filtro.licitacao.data)
        }

        // filtro unidade da licitacao (id, uf)
        if (filtro.unidade.id.length > 0) {
          this.whereIn('unidades.id', filtro.unidade.id)
        }
        if (filtro.unidade.uf.length > 0) {
          this.whereIn('orgaos.uf', filtro.unidade.uf)
        }

        // filtro fornecedor do item (id, uf)
        if (filtro.fornecedor.id.length > 0) {
          this.whereIn('fornecedores.id', filtro.fornecedor.id)
        }
        if (filtro.fornecedor.uf.length > 0) {
          this.whereIn('fornecedores.uf', filtro.fornecedor.uf)
        }
      })
      .with('unidade')
      .with('itens')
      .fetch()

    return licitacoes
  }
}

module.exports = LicitacaoController
