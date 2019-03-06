'use strict'

const Servico = use('App/Models/Servico')

class ServicoController {
    async index({ request, response, params }) {
        let servicos = await Servico
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

        return servicos
    }
}

module.exports = ServicoController
