'use strict'

const Item = use('App/Models/Item')

class ItemController {
    async index({ request, response, params }) {
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

        return itens
    }
}

module.exports = ItemController
