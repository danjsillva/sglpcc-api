'use strict'

const Database = use('Database')
const Licitacao = use('App/Models/Licitacao')
const Item = use('App/Models/Item')

class LicitacaoController {
  async getLicitacoes({ request, response, params }) {
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

  async getLicitacao({ request, response, params }) {
    let filtro = request.all()
    let licitacao = await Licitacao
      .query()
      .where('id', params.licitacoes_id)
      .with('unidade')
      .with('itens')
      .first()

    return licitacao
  }

  async getLicitacaoItens({ request, response, params }) {
    let filtro = request.all()
    let itens = await Item
      .query()
      .where(function () {
        if (params.licitacoes_id != 0) {
          this.where('licitacoes_id', params.licitacoes_id)
        }
      })
      .with('material')
      .with('servico')
      .with('fornecedor')
      .fetch()

    for (let item of itens.rows) {
      item.preco_avg = await Database
        .table('itens')
        .join('fornecedores', 'itens.fornecedores_id', 'fornecedores.id')
        .join('licitacoes', 'itens.licitacoes_id', 'licitacoes.id')
        .join('unidades', 'licitacoes.unidades_id', 'unidades.id')
        .join('orgaos', 'unidades.orgaos_id', 'orgaos.id')
        .where('materiais_id', item.materiais_id)
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
      .getAvg('preco') || 0
    }

    return itens
  }
}

module.exports = LicitacaoController
