'use strict'

const Database = use('Database')
const Material = use('App/Models/Material')

class MaterialController {
  async index({ request, response, params }) {
    let materiais = await Material
      .query()
      .where(function () {
        if (params.id != 0) {
          this.where('id', params.id)
        }
        if (params.busca != 0) {
          this.where('descricao', 'like', `%${params.busca}%`)
        }
      })
      .fetch()

    return materiais
  }

  async getMaterialDetalhes({ request, response, params }) {
    let filtro = request.all()
    let itens = await Database
      .table('itens')
      .join('fornecedores', 'itens.fornecedores_id', 'fornecedores.id')
      .join('licitacoes', 'itens.licitacoes_id', 'licitacoes.id')
      .join('unidades', 'licitacoes.unidades_id', 'unidades.id')
      .join('orgaos', 'unidades.orgaos_id', 'orgaos.id')
      .where('materiais_id', params.materiais_id)
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
      .pluck('preco')

    let material = await Material
      .query()
      .where('id', params.materiais_id)
      .first()

    material.total_quantidade = await itens.length
    material.total_preco = await itens.reduce((a, b) => a + b, 0)
    material.preco_avg = await itens.reduce((a, b) => a + b, 0) / itens.length
    material.preco_min = await Math.min(...itens)
    material.preco_max = await Math.max(...itens)

    return material
  }
}

module.exports = MaterialController
