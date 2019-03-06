'use strict'

const Licitacao = use('App/Models/Licitacao')

class LicitacaoController {
    async index({ request, response, params }) {
        let licitacoes = await Licitacao
            .query()
            .where(function () {
                if (params.id != 0) {
                    this.where('id', params.id)
                }
                if (params.busca != 0) {
                    this.where('identificador', 'like', `%${params.busca}%`)
                        .orWhere('responsavel', 'like', `%${params.busca}%`)
                        .orWhere('processo', 'like', `%${params.busca}%`)
                        .orWhere('objeto', 'like', `%${params.busca}%`)
                }
                if (params.unidades_id != 0) {
                    this.where('unidades_id', params.unidades_id)
                }
            })
            .withCount('itens')
            .fetch()

        return licitacoes
    }
}

module.exports = LicitacaoController
