'use strict'

const Material = use('App/Models/Material')

class MaterialController {
    async index({ request, response, params }) {
        let materiais = await Material
            .query()
            .where(function() {
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
}

module.exports = MaterialController
