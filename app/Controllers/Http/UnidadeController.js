'use strict'

const Unidade = use('App/Models/Unidade')

class UnidadeController {
    async index({ request, response, params }) {
        let unidades = await Unidade.query()
            .with('orgao')
            .fetch()

        return unidades
    }
}

module.exports = UnidadeController
