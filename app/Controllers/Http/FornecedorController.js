'use strict'

const Fornecedor = use('App/Models/Fornecedor')

class FornecedorController {
    async index({ request, response, params }) {
        let fornecedores = await Fornecedor
            .query()
            .where(function() {
                if (params.id != 0) {
                    this.where('id', params.id)
                }
                if (params.busca != 0) {
                    this.where('nome', 'like', `%${params.busca}%`)
                }
                if (params.uf != 0) {
                    this.where('uf', 'like', `%${params.uf}%`)
                }
            })
            .fetch()

        return fornecedores
    }
}

module.exports = FornecedorController
